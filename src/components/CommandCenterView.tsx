import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  Zap, 
  Target, 
  TrendingUp, 
  Map as MapIcon,
  Activity,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';

interface CommandCenterProps {
  locationName: string;
}

export const CommandCenterView: React.FC<CommandCenterProps> = ({ locationName }) => {
  const baseLocation = locationName.split(',')[0].trim();
  
  const hotspots = [
    { name: `${baseLocation} Cluster`, type: 'Residential/Mixed', temp: 42.4, risk: 92, status: 'Critical' },
    { name: `${baseLocation} Industrial`, type: 'Manufacturing', temp: 45.1, risk: 88, status: 'Critical' },
    { name: `${baseLocation} Tech Park`, type: 'Commercial', temp: 38.2, risk: 64, status: 'Elevated' },
    { name: `${baseLocation} Central`, type: 'Residential', temp: 36.8, risk: 45, status: 'Moderate' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
            <span className="text-error font-label uppercase tracking-[0.2rem] text-[0.7rem] font-black">Live Threat Assessment</span>
          </div>
          <h2 className="text-4xl font-headline font-extrabold text-white tracking-tight">Command Center</h2>
          <p className="text-on-surface-variant text-sm mt-1 font-bold uppercase tracking-widest">{locationName}</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-error text-on-error px-6 py-3 rounded-full text-[0.7rem] font-black uppercase tracking-widest shadow-lg shadow-error/20 hover:opacity-90 transition-opacity">
            Initiate Emergency Cooling
          </button>
        </div>
      </section>

      {/* Top Row: Hotspot Intelligence & ROI */}
      <section className="grid grid-cols-12 gap-8">
        {/* Hotspot Intelligence */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container p-8 rounded-xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-headline font-bold text-white tracking-tight uppercase">Hotspot Intelligence</h3>
            <button className="text-on-surface-variant hover:text-white transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          
          <div className="space-y-6">
            {hotspots.map((hotspot, i) => (
              <motion.div 
                key={hotspot.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 p-4 rounded-xl hover:bg-surface-variant/20 transition-all border border-transparent hover:border-outline-variant/10"
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-headline font-black text-xs",
                  hotspot.status === 'Critical' ? "bg-error/10 text-error" : "bg-orange-500/10 text-orange-500"
                )}>
                  {hotspot.risk}%
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">{hotspot.name}</h4>
                    <span className="text-lg font-headline font-bold text-white">{hotspot.temp}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[0.65rem] text-on-surface-variant uppercase tracking-widest">{hotspot.type}</span>
                    <div className="w-32 bg-surface-container-highest h-1 rounded-full overflow-hidden">
                      <div className={cn(
                        "h-full",
                        hotspot.status === 'Critical' ? "bg-error" : "bg-orange-500"
                      )} style={{ width: `${hotspot.risk}%` }}></div>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <ArrowUpRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ROI Dashboard */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container p-8 rounded-xl flex flex-col">
          <h3 className="text-xl font-headline font-bold text-white tracking-tight uppercase mb-10">Intervention ROI</h3>
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Zap size={32} />
              </div>
              <div>
                <div className="text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest mb-1">Energy Cost Saved</div>
                <div className="text-3xl font-headline font-black text-white">₹2.4M <span className="text-sm font-normal text-tertiary">/ MONTH</span></div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                <TrendingUp size={32} />
              </div>
              <div>
                <div className="text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest mb-1">Health Impact Score</div>
                <div className="text-3xl font-headline font-black text-white">+18.4% <span className="text-sm font-normal text-on-surface-variant">IMPROVEMENT</span></div>
              </div>
            </div>

            <div className="mt-auto p-6 bg-surface-container-high rounded-xl border border-outline-variant/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest">Budget Utilization</span>
                <span className="text-[0.7rem] font-bold text-white">64%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mb-4">
                <div className="bg-primary w-[64%] h-full"></div>
              </div>
              <p className="text-[0.65rem] text-on-surface-variant leading-relaxed">
                Current spending is optimized for high-impact sectors. ₹12.4L remaining in Q1 Cooling Fund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Row: Strategy & Deployment */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-container p-8 rounded-xl border-t-4 border-primary">
          <div className="flex items-center gap-4 mb-6">
            <Target className="text-primary" size={24} />
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Targeted Cooling</h4>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
            AI-driven deployment of mobile cooling units to high-density residential clusters during peak thermal windows.
          </p>
          <div className="flex items-center justify-between text-[0.65rem] font-bold uppercase text-primary">
            <span>Efficiency: 84%</span>
            <button className="hover:underline">Configure</button>
          </div>
        </div>

        <div className="bg-surface-container p-8 rounded-xl border-t-4 border-tertiary">
          <div className="flex items-center gap-4 mb-6">
            <MapIcon className="text-tertiary" size={24} />
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Canopy Expansion</h4>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
            Long-term reforestation strategy focusing on heat-corridors. 12,000 saplings scheduled for monsoon deployment.
          </p>
          <div className="flex items-center justify-between text-[0.65rem] font-bold uppercase text-tertiary">
            <span>Progress: 42%</span>
            <button className="hover:underline">View Map</button>
          </div>
        </div>

        <div className="bg-surface-container p-8 rounded-xl border-t-4 border-secondary">
          <div className="flex items-center gap-4 mb-6">
            <Activity className="text-secondary" size={24} />
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Network Health</h4>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
            Real-time monitoring of 4,200 thermal sensors across the city grid. 99.8% uptime maintained.
          </p>
          <div className="flex items-center justify-between text-[0.65rem] font-bold uppercase text-secondary">
            <span>Sensors: 4,192 Active</span>
            <button className="hover:underline">Diagnostics</button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper for cn
import { cn } from '../lib/utils';
