import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Thermometer, 
  MapPin as MapPinIcon, 
  FlaskConical, 
  Trees, 
  Palette, 
  Droplets, 
  Cloud as CloudIcon,
  PlusCircle,
  Plus,
  Minus,
  Crosshair,
  Search,
  Loader2,
  TrendingDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const RedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map view updates
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 14);
  }, [center, map]);
  return null;
};

// Component to handle map events
const MapEvents: React.FC<{ onMapClick: (lat: number, lng: number) => void }> = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

interface DashboardViewProps {
  center: [number, number];
  setCenter: (center: [number, number]) => void;
  locationName: string;
  setLocationName: (name: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  center, 
  setCenter, 
  locationName, 
  setLocationName 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [coolingScore, setCoolingScore] = useState(32);
  const [temperature, setTemperature] = useState(42.4);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<{ lat: number, lng: number, problem: string } | null>(null);
  const [hotspots, setHotspots] = useState<{ lat: number, lng: number, radius: number, severity: 'high' | 'medium' }[]>([]);

  // Simulation States
  const [simGreenery, setSimGreenery] = useState(12);
  const [simTraffic, setSimTraffic] = useState(25);
  const [simRoof, setSimRoof] = useState(45);

  const simulatedImpact = ((simGreenery * 0.1) + (simTraffic * 0.05) + (simRoof * 0.08)).toFixed(1);

  // Update hotspots when center changes
  useEffect(() => {
    const newHotspots = [
      { lat: center[0] + 0.002, lng: center[1] + 0.003, radius: 600, severity: 'high' as const },
      { lat: center[0] - 0.004, lng: center[1] - 0.002, radius: 800, severity: 'medium' as const },
      { lat: center[0] + 0.006, lng: center[1] - 0.005, radius: 1000, severity: 'high' as const },
    ];
    setHotspots(newHotspots);
  }, [center]);

  // Debounced search for suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 2 && !isSearching) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ', India')}&limit=5`
          );
          const data = await response.json();
          setSuggestions(data);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Suggestions fetch failed:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const selectLocation = (loc: any) => {
    const { lat, lon, display_name } = loc;
    const newCenter: [number, number] = [parseFloat(lat), parseFloat(lon)];
    setCenter(newCenter);
    setLocationName(display_name.split(',')[0].toUpperCase() + (display_name.split(',')[1] ? ', ' + display_name.split(',')[1].toUpperCase() : ''));
    
    // Simulate a new cooling score and temp for the location
    const randomScore = Math.floor(Math.random() * 60) + 20;
    const randomTemp = (Math.random() * 15 + 30).toFixed(1);
    setCoolingScore(randomScore);
    setTemperature(parseFloat(randomTemp));
    setSearchQuery('');
    setShowSuggestions(false);
    setSelectedSpot(null);
    
    // Reset simulation
    setSimGreenery(12);
    setSimTraffic(25);
    setSimRoof(45);
  };

  const handleMapClick = (lat: number, lng: number) => {
    const problems = [
      "Extreme Albedo Deficit: Dark asphalt absorbing 92% of solar radiation.",
      "Ventilation Blockage: High-rise wall effect preventing nocturnal cooling.",
      "Anthropogenic Heat: Massive AC waste heat concentration in this corridor.",
      "Zero Canopy Zone: 0% shade coverage detected in 500m radius.",
      "Impervious Surface Peak: 98% concrete coverage preventing evaporation."
    ];
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    setSelectedSpot({ lat, lng, problem: randomProblem });
    
    // Update local stats for the "pressed" area
    const spotScore = Math.floor(Math.random() * 30) + 15; // Usually worse if they click a "problem"
    const spotTemp = (Math.random() * 10 + 38).toFixed(1);
    setCoolingScore(spotScore);
    setTemperature(parseFloat(spotTemp));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      selectLocation(suggestions[0]);
    }
  };

  return (
    <div className="relative h-[calc(100vh-180px)] w-full overflow-hidden bg-[#0b1326] rounded-2xl border border-outline-variant/10 shadow-2xl">
      {/* Background Map Visualization */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,19,38,0.4)_100%)]"></div>
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#7bd0ff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        <MapContainer 
          center={center} 
          zoom={14} 
          scrollWheelZoom={true} 
          className="w-full h-full"
          zoomControl={false}
          ref={(map) => {
            if (map) (window as any).leafletMap = map;
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          <MapUpdater center={center} />
          <MapEvents onMapClick={handleMapClick} />

          {/* Thermal Hotspots (Dynamic Problem Areas) */}
          {hotspots.map((spot, idx) => (
            <Circle 
              key={idx}
              center={[spot.lat, spot.lng]} 
              radius={spot.radius} 
              pathOptions={{ 
                color: spot.severity === 'high' ? '#ff4d4d' : '#ff8c00', 
                fillColor: spot.severity === 'high' ? '#ff4d4d' : '#ff8c00', 
                fillOpacity: 0.3, 
                weight: 1 
              }} 
            >
              <Popup>
                <div className="text-[0.6rem] font-bold text-error uppercase tracking-widest">
                  {spot.severity === 'high' ? 'Severe Heat Island' : 'Elevated Thermal Zone'}
                </div>
              </Popup>
            </Circle>
          ))}

          {selectedSpot && (
            <>
              <Circle 
                center={[selectedSpot.lat, selectedSpot.lng]} 
                radius={300} 
                pathOptions={{ color: '#ff0000', fillColor: '#ff0000', fillOpacity: 0.6, weight: 2 }} 
              />
              <Marker position={[selectedSpot.lat, selectedSpot.lng]} icon={RedIcon}>
                <Popup permanent>
                  <div className="text-[0.6rem] font-black text-error uppercase tracking-widest leading-tight">
                    CRITICAL HOTSPOT DETECTED
                  </div>
                </Popup>
              </Marker>
            </>
          )}

          <Marker position={center}>
            <Popup>
              <div className="text-xs font-bold uppercase tracking-widest">{locationName.split(',')[0]}: {temperature}°C</div>
            </Popup>
          </Marker>
        </MapContainer>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-error/5 to-surface-container-lowest/40 pointer-events-none z-[1001]"></div>
      </div>

      {/* Top Search Bar */}
      <div className="absolute top-8 left-8 z-[1002] w-96 pointer-events-auto">
        <div className="relative group">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
              placeholder="Search location in India..."
              className="w-full bg-surface-container/80 backdrop-blur-xl border border-outline-variant/30 rounded-full py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-all shadow-2xl"
            />
          </form>
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
            {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-surface-container/95 backdrop-blur-2xl border border-outline-variant/30 rounded-2xl overflow-hidden shadow-2xl z-[1003]"
              >
                {suggestions.map((loc, i) => (
                  <button
                    key={i}
                    onClick={() => selectLocation(loc)}
                    className="w-full text-left px-6 py-4 hover:bg-primary/10 transition-colors border-b border-outline-variant/10 last:border-0 group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-primary transition-colors truncate">
                      {loc.display_name.split(',')[0]}
                    </div>
                    <div className="text-[0.6rem] text-on-surface-variant truncate">
                      {loc.display_name.split(',').slice(1).join(',')}
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Custom Map Controls */}
      <div className="absolute top-8 left-8 z-[1005] flex flex-col gap-2">
        <button 
          onClick={() => {
            const map = (window as any).leafletMap;
            if (map) map.zoomIn();
          }}
          className="w-10 h-10 glass-panel border border-outline-variant/30 rounded-lg flex items-center justify-center text-white hover:bg-primary/20 transition-colors pointer-events-auto"
        >
          <Plus size={20} />
        </button>
        <button 
          onClick={() => {
            const map = (window as any).leafletMap;
            if (map) map.zoomOut();
          }}
          className="w-10 h-10 glass-panel border border-outline-variant/30 rounded-lg flex items-center justify-center text-white hover:bg-primary/20 transition-colors pointer-events-auto"
        >
          <Minus size={20} />
        </button>
        <button 
          onClick={() => setCenter([12.9716, 77.5946])}
          className="w-10 h-10 glass-panel border border-outline-variant/30 rounded-lg flex items-center justify-center text-white hover:bg-primary/20 transition-colors pointer-events-auto mt-2"
        >
          <Crosshair size={20} />
        </button>
      </div>

      {/* Floating UI Panels */}
      <div className="absolute inset-0 p-8 flex justify-end gap-6 pointer-events-none z-[1002]">
        {/* Left Side Overlay */}
        <div className="flex-1 flex flex-col justify-end pointer-events-none pb-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-xl w-72 pointer-events-auto border border-outline-variant/15 shadow-2xl z-[1003]"
          >
            <div className="text-[0.6rem] font-black uppercase tracking-[0.1rem] text-on-surface-variant mb-4">Heat Intensity Legend</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] text-on-surface-variant">Severe (&gt;42°C)</span>
                <div className="w-12 h-2 rounded-full bg-error"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] text-on-surface-variant">Elevated (38°C)</span>
                <div className="w-12 h-2 rounded-full bg-orange-500"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] text-on-surface-variant">Regulated (32°C)</span>
                <div className="w-12 h-2 rounded-full bg-tertiary"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Control Sidebar */}
        <div className="w-[500px] h-full flex flex-col gap-6 pointer-events-auto overflow-y-auto pr-4 no-scrollbar pb-12">
          {/* 1. Hyperlocal Cooling Score Card */}
          <section className={cn(
            "glass-panel p-8 rounded-2xl border relative overflow-hidden group transition-all duration-500",
            coolingScore < 40 ? "border-error/30 bg-error/5 shadow-2xl shadow-error/10" : "border-primary/30 bg-primary/5 shadow-2xl shadow-primary/10"
          )}>
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <Thermometer size={160} className={coolingScore < 40 ? "text-error" : "text-primary"} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="font-headline font-black text-on-surface uppercase tracking-[0.1em] text-[0.7rem] mb-2">Hyperlocal Cooling Score</h2>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    <MapPinIcon size={16} className="text-primary shrink-0" /> 
                    <span className="truncate">{locationName}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[0.7rem] font-black tracking-widest uppercase",
                    coolingScore < 40 ? "bg-error text-on-error" : "bg-primary text-on-primary"
                  )}>
                    {coolingScore < 40 ? 'Critical' : 'Stable'}
                  </div>
                  <div className="flex items-center gap-1 text-[0.65rem] font-bold text-on-surface-variant uppercase">
                    <TrendingDown size={12} className="text-error" />
                    <span>-2.4% Trend</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 mb-10">
                <div className="relative shrink-0">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      className="text-surface-container-highest"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={439.8}
                      initial={{ strokeDashoffset: 439.8 }}
                      animate={{ strokeDashoffset: 439.8 - (439.8 * coolingScore) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                      className={cn(
                        "transition-all shadow-glow",
                        coolingScore < 40 ? "text-error" : "text-primary"
                      )}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-headline font-black text-white">{coolingScore}</span>
                    <span className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest">Index</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-6">
                  <div>
                    <div className="text-[0.65rem] font-black text-on-surface-variant uppercase tracking-widest mb-1">Local Temperature</div>
                    <div className="text-4xl font-headline font-black text-white">{temperature}°C</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">
                      <span>Cooling Gap</span>
                      <span>{100 - coolingScore}%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${coolingScore}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={cn("h-full", coolingScore < 40 ? "bg-error" : "bg-primary")} 
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-surface-container/40 rounded-xl border border-outline-variant/10">
                <div className="text-center">
                  <div className="text-[0.6rem] font-black text-on-surface-variant uppercase mb-1">Albedo</div>
                  <div className="text-sm font-bold text-white">0.24</div>
                </div>
                <div className="text-center border-x border-outline-variant/10">
                  <div className="text-[0.6rem] font-black text-on-surface-variant uppercase mb-1">Veg. Index</div>
                  <div className="text-sm font-bold text-white">0.18</div>
                </div>
                <div className="text-center">
                  <div className="text-[0.6rem] font-black text-on-surface-variant uppercase mb-1">Ventilation</div>
                  <div className="text-sm font-bold text-white">Low</div>
                </div>
              </div>
              
              <p className="text-[0.75rem] text-on-surface leading-relaxed italic border-l-2 border-primary/30 pl-4 mb-6">
                {coolingScore < 40 
                  ? "Extreme thermal stress detected. Immediate intervention required to prevent health risks." 
                  : "Thermal conditions are within acceptable limits. Continue monitoring for seasonal shifts."}
              </p>

              {coolingScore < 40 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const el = document.getElementById('micro-actions');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-error text-on-error rounded-xl font-black text-[0.7rem] uppercase tracking-[0.2em] shadow-lg shadow-error/20 flex items-center justify-center gap-2"
                >
                  <PlusCircle size={16} />
                  Deploy Immediate Mitigation
                </motion.button>
              )}
            </div>
          </section>

          {/* 2. What-if Simulation Panel */}
          <section className="glass-panel p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline font-bold text-on-surface uppercase tracking-widest text-xs">What-if Simulation</h2>
              <FlaskConical className="text-primary w-5 h-5" />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[0.65rem] mb-2 uppercase tracking-widest text-on-surface-variant">
                  <span>Greenery Coverage</span>
                  <span className="text-primary font-bold">+{simGreenery}%</span>
                </div>
                <input 
                  className="w-full custom-range" 
                  type="range" 
                  min="0" max="50"
                  value={simGreenery}
                  onChange={(e) => setSimGreenery(parseInt(e.target.value))}
                />
              </div>
              <div>
                <div className="flex justify-between text-[0.65rem] mb-2 uppercase tracking-widest text-on-surface-variant">
                  <span>Traffic Volume</span>
                  <span className="text-primary font-bold">-{simTraffic}%</span>
                </div>
                <input 
                  className="w-full custom-range" 
                  type="range" 
                  min="0" max="50"
                  value={simTraffic}
                  onChange={(e) => setSimTraffic(parseInt(e.target.value))}
                />
              </div>
              <div>
                <div className="flex justify-between text-[0.65rem] mb-2 uppercase tracking-widest text-on-surface-variant">
                  <span>Cool Roof Adoption</span>
                  <span className="text-primary font-bold">{simRoof}%</span>
                </div>
                <input 
                  className="w-full custom-range" 
                  type="range" 
                  min="0" max="100"
                  value={simRoof}
                  onChange={(e) => setSimRoof(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-between">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-primary">Simulated Impact</span>
              <span className="text-xl font-headline font-extrabold text-primary">-{simulatedImpact}°C</span>
            </div>
          </section>

          {/* 3. AI Root Cause Analysis */}
          <section className="glass-panel p-6 rounded-xl border border-outline-variant/15 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan"></div>
            <h2 className="font-headline font-bold text-on-surface uppercase tracking-widest text-xs mb-4">AI Root Cause Analysis</h2>
            <div className="space-y-4">
              {selectedSpot ? (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-error/10 border border-error/20"
                >
                  <span className="w-8 h-8 rounded-full flex items-center justify-center bg-error text-on-error font-black text-xs">!</span>
                  <div>
                    <div className="text-[0.7rem] font-black text-error uppercase tracking-widest">Spot-Specific Criticality</div>
                    <div className="text-[0.65rem] text-white mt-1 font-bold leading-relaxed">{selectedSpot.problem}</div>
                    <div className="text-[0.55rem] text-on-surface-variant mt-2 uppercase tracking-tighter">Coordinates: {selectedSpot.lat.toFixed(4)}, {selectedSpot.lng.toFixed(4)}</div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-surface-variant/30 transition-colors opacity-60">
                  <div className="text-[0.6rem] text-on-surface-variant italic">Press any area on the map to analyze specific thermal bottlenecks.</div>
                </div>
              )}
              
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-surface-variant/30 transition-colors">
                <span className="w-6 h-6 rounded flex items-center justify-center bg-error/10 text-error font-bold text-[0.65rem]">01</span>
                <div>
                  <div className="text-[0.7rem] font-bold text-on-surface uppercase">Low Tree Canopy Density</div>
                  <div className="text-[0.6rem] text-on-surface-variant mt-1 leading-relaxed">
                    {coolingScore < 40 
                      ? "Critical lack of natural shading in this sector. Surface temperatures are 6.2°C higher than municipal standards."
                      : "Shading is adequate but could be improved in residential pockets to reach optimal cooling targets."}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-surface-variant/30 transition-colors">
                <span className="w-6 h-6 rounded flex items-center justify-center bg-orange-500/10 text-orange-500 font-bold text-[0.65rem]">02</span>
                <div>
                  <div className="text-[0.7rem] font-bold text-on-surface uppercase">Thermal Mass Retention</div>
                  <div className="text-[0.6rem] text-on-surface-variant mt-1 leading-relaxed">
                    Infrastructure in {locationName.split(',')[0]} retains heat 30% longer than average due to high-density concrete usage.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Micro-Actions Cards */}
          <section id="micro-actions">
            <h2 className="font-headline font-bold text-on-surface uppercase tracking-widest text-xs mb-4 px-2">Recommended Micro-Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Plant 500 Saplings', drop: '-1.2°C Drop', cost: '₹4.5L', icon: <Trees size={18} />, color: 'tertiary' },
                { label: 'Cool Roof Incentive', drop: '-2.1°C Drop', cost: '₹12L', icon: <Palette size={18} />, color: 'primary' },
                { label: 'Deploy Mist Units', drop: '-4.5°C Drop', cost: '₹8.2L', icon: <Droplets size={18} />, color: 'secondary' },
              ].map((action) => (
                <div key={action.label} className="glass-panel p-4 rounded-xl border border-outline-variant/15 flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    action.color === 'tertiary' && "bg-tertiary/10 text-tertiary",
                    action.color === 'primary' && "bg-primary/10 text-primary",
                    action.color === 'secondary' && "bg-secondary/10 text-secondary"
                  )}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[0.7rem] font-bold text-on-surface uppercase">{action.label}</div>
                    <div className="flex gap-4 mt-1">
                      <span className="text-[0.6rem] text-tertiary font-bold">{action.drop}</span>
                      <span className="text-[0.6rem] text-on-surface-variant">Cost: {action.cost}</span>
                    </div>
                  </div>
                  <PlusCircle size={20} className="text-primary" />
                </div>
              ))}
            </div>
          </section>
          {/* 5. System Status Feed */}
          <section className="glass-panel p-4 rounded-xl border border-outline-variant/15 bg-surface/40">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></div>
              <span className="text-[0.6rem] font-black text-on-surface-variant uppercase tracking-widest">Live System Feed</span>
            </div>
            <div className="space-y-2 font-mono text-[0.55rem] text-on-surface-variant/80">
              <div className="flex gap-2">
                <span className="text-primary">[10:14:33]</span>
                <span>Satellite thermal sync complete.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">[10:14:28]</span>
                <span>Processing albedo variance in {locationName.split(',')[0]}...</span>
              </div>
              <div className="flex gap-2">
                <span className="text-tertiary">[10:14:15]</span>
                <span>Ground sensor network: STABLE</span>
              </div>
            </div>
          </section>
          <div className="h-8"></div>
        </div>
      </div>

      {/* Floating Stats Overlay (Bottom Left) */}
      <div className="absolute bottom-8 left-8 flex flex-col sm:flex-row gap-4 pointer-events-none z-[1004]">
        <div className="glass-panel px-6 py-4 rounded-xl border border-outline-variant/15 flex items-center gap-4 pointer-events-auto shadow-2xl">
          <div>
            <div className="text-[0.55rem] uppercase font-black tracking-widest text-on-surface-variant">City Mean Temp</div>
            <div className="text-2xl font-headline font-extrabold text-on-surface">34.2°C</div>
          </div>
          <div className="w-[1px] h-8 bg-outline-variant/30"></div>
          <div>
            <div className="text-[0.55rem] uppercase font-black tracking-widest text-on-surface-variant">Active Alerts</div>
            <div className="text-2xl font-headline font-extrabold text-error">07</div>
          </div>
        </div>
        <div className="glass-panel px-6 py-4 rounded-xl border border-outline-variant/15 pointer-events-auto flex items-center gap-3">
          <CloudIcon className="text-primary" size={20} />
          <span className="text-xs font-bold text-on-surface uppercase">31% HUMIDITY</span>
        </div>
      </div>
    </div>
  );
};
