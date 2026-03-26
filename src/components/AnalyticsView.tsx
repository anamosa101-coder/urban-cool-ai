import React from 'react';
import { motion } from 'motion/react';
import { 
  Thermometer, 
  Flame, 
  Trees, 
  AlertTriangle, 
  TrendingDown, 
  PlusCircle,
  Filter,
  ArrowRight,
  CheckCircle2,
  Clock,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const lineData = [
  { time: '00:00', site: 20, benchmark: 22 },
  { time: '04:00', site: 18, benchmark: 21 },
  { time: '08:00', site: 19, benchmark: 20 },
  { time: '12:00', site: 24, benchmark: 22 },
  { time: '16:00', site: 30, benchmark: 26 },
  { time: '20:00', site: 28, benchmark: 25 },
  { time: '23:59', site: 22, benchmark: 23 },
];

const pieData = [
  { name: 'Concrete Saturation', value: 45, color: '#ffb4ab' },
  { name: 'Traffic Flux', value: 32, color: '#7bd0ff' },
  { name: 'Wind Stagnation', value: 23, color: '#F97316' },
];

export const AnalyticsView: React.FC<{ locationName: string }> = ({ locationName }) => {
  const baseLocation = locationName.split(',')[0].trim();
  
  const zoneData = [
    { label: 'Commercial', efficiency: 40 },
    { label: 'Residential', efficiency: 75 },
    { label: 'Parks', efficiency: 25 },
    { label: 'Waterfront', efficiency: 66 },
    { label: 'Industrial', efficiency: 83 },
  ].map(item => ({ ...item, label: `${baseLocation} ${item.label}` }));

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="flex justify-between items-end">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-primary font-label uppercase tracking-[0.2rem] text-[0.7rem] mb-2">Technical Deep-Dive</p>
          <h2 className="text-4xl font-headline font-extrabold text-white tracking-tight">Environmental Analytics</h2>
        </motion.div>
        <div className="flex gap-4">
          <div className="bg-surface-container px-6 py-2 rounded-xl flex items-center gap-3">
            <span className="text-[0.6rem] font-label text-on-surface-variant uppercase tracking-widest">Temporal Resolution</span>
            <span className="text-sm font-bold text-white">24H REAL-TIME</span>
          </div>
        </div>
      </section>

      {/* Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg Temperature', value: '28.4', unit: '°C', trend: 'down', trendText: '-1.2° FROM PREVIOUS WEEK', icon: <Thermometer className="text-primary" />, color: 'primary' },
          { label: 'Hottest Zone', value: '39.1', unit: '°C PEAK', sub: 'Industrial Hub A', trend: 'critical', trendText: 'CRITICAL HEAT LOAD DETECTED', icon: <Flame className="text-error" />, color: 'error' },
          { label: 'Green Cover %', value: '42.8', unit: '%', trend: 'up', trendText: '+4.1% REFORESTATION IMPACT', icon: <Trees className="text-tertiary" />, color: 'tertiary' },
          { label: 'High-risk Zones', value: '07', unit: 'Active Sectors', trend: 'warning', trendText: '3 PENDING INTERVENTION', icon: <AlertTriangle className="text-orange-500" />, color: 'orange-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-container p-6 rounded-xl relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
              <div className="opacity-50">{stat.icon}</div>
            </div>
            <div className="flex flex-col">
              {stat.sub && <span className="text-lg font-headline font-bold text-white tracking-tight uppercase mb-1">{stat.sub}</span>}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-headline font-bold text-white tracking-tighter">{stat.value}</span>
                <span className="text-xl font-headline text-on-surface-variant">{stat.unit}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {stat.trend === 'down' && <TrendingDown size={14} className="text-tertiary" />}
              {stat.trend === 'up' && <PlusCircle size={14} className="text-tertiary" />}
              <span className={cn(
                "text-[0.65rem] font-bold uppercase tracking-wider",
                stat.trend === 'critical' ? "text-error" : stat.trend === 'warning' ? "text-orange-500" : "text-tertiary"
              )}>
                {stat.trendText}
              </span>
            </div>
            <div className={cn(
              "absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-transparent",
              stat.color === 'primary' && "via-primary/20",
              stat.color === 'error' && "via-error/40",
              stat.color === 'tertiary' && "via-tertiary/20",
              stat.color === 'orange-500' && "via-orange-500/20"
            )}></div>
          </motion.div>
        ))}
      </section>

      {/* Main Charts Section */}
      <section className="grid grid-cols-12 gap-8">
        {/* Time-based Heat Trend */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container p-8 rounded-xl min-h-[400px]">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-xl font-headline font-bold text-white tracking-tight">Temporal Heat Velocity</h3>
              <p className="text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest mt-1">24-Hour Comparison • Internal vs External Surfaces</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-[0.6rem] font-label uppercase text-on-surface-variant">Primary Site</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-surface-variant border border-outline"></span>
                <span className="text-[0.6rem] font-label uppercase text-on-surface-variant">Benchmark</span>
              </div>
            </div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#45464d" opacity={0.2} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#c6c6cd', fontSize: 10 }} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171f33', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="site" 
                  stroke="#7bd0ff" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#7bd0ff' }} 
                  activeDot={{ r: 6, stroke: '#7bd0ff', strokeWidth: 2, fill: '#0b1326' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#45464d" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heat Drivers */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container p-8 rounded-xl flex flex-col">
          <h3 className="text-xl font-headline font-bold text-white tracking-tight mb-8">Heat Drivers</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="block text-2xl font-headline font-bold text-white">40.2%</span>
              <span className="text-[0.6rem] font-label text-on-surface-variant uppercase tracking-widest">Albedo Loss</span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {pieData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-[0.7rem]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-on-surface-variant font-label uppercase">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone Comparison */}
      <section className="bg-surface-container p-8 rounded-xl overflow-hidden">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-xl font-headline font-bold text-white tracking-tight">Zone Inter-Comparison</h3>
            <p className="text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest mt-1">Relative cooling efficiency by sector infrastructure type</p>
          </div>
          <button className="bg-surface-variant px-4 py-2 rounded-lg text-[0.65rem] font-bold text-white uppercase flex items-center gap-2 hover:bg-surface-bright transition-colors">
            <Filter size={14} />
            Toggle Metrics
          </button>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zoneData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#45464d" opacity={0.1} />
              <XAxis 
                dataKey="label" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#c6c6cd', fontSize: 10 }} 
                interval={0}
              />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                cursor={{ fill: 'rgba(123, 208, 255, 0.05)' }}
                contentStyle={{ backgroundColor: '#171f33', border: 'none', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Bar 
                dataKey="efficiency" 
                fill="#7bd0ff" 
                radius={[4, 4, 0, 0]} 
                barSize={40}
                background={{ fill: '#45464d', opacity: 0.2, radius: [4, 4, 0, 0] }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Insights & Alerts */}
      <section className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-primary glass-panel">
            <h4 className="text-sm font-label text-primary uppercase tracking-[0.15rem] mb-4">Intervention Intelligence</h4>
            <p className="text-on-surface text-sm leading-relaxed mb-6 font-light">
              Deploying white-roof coatings in {baseLocation} has resulted in a <span className="text-tertiary font-bold">4.2°C surface temperature reduction</span>. This intervention currently displays an ROI of 1:4.8 when calculated against reduced cooling energy demands across surrounding residential clusters.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface/50 p-4 rounded-lg">
                <span className="text-[0.6rem] font-label text-on-surface-variant uppercase block mb-1">Impact Radius</span>
                <span className="text-xl font-headline font-bold text-white">450m</span>
              </div>
              <div className="bg-surface/50 p-4 rounded-lg">
                <span className="text-[0.6rem] font-label text-on-surface-variant uppercase block mb-1">Energy Saving</span>
                <span className="text-xl font-headline font-bold text-tertiary">14.2%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-container p-6 rounded-xl flex items-center gap-6">
            <img 
              alt="Satellite thermal view" 
              className="w-24 h-24 rounded-lg object-cover grayscale brightness-75 border border-outline-variant/20" 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=200&auto=format&fit=crop" 
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest block mb-1">Satellite Reference</span>
              <h5 className="text-lg font-headline font-bold text-white mb-2 leading-tight">Heat Drift Pattern Detected</h5>
              <button className="text-primary text-[0.65rem] font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all">
                Analyze Vector <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 bg-surface-container p-8 rounded-xl overflow-x-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-headline font-bold text-white tracking-tight uppercase">Historical Alerts</h3>
            <span className="text-[0.6rem] font-label text-on-surface-variant uppercase px-3 py-1 bg-surface-container-high rounded-full">Archive: Last 30 Days</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/10">
                <th className="pb-4 text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest">Incident ID</th>
                <th className="pb-4 text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest">Trigger Type</th>
                <th className="pb-4 text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest">Severity</th>
                <th className="pb-4 text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest">Timestamp</th>
                <th className="pb-4 text-[0.65rem] font-label text-on-surface-variant uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="text-[0.75rem]">
              {[
                { id: '#TH-9021', trigger: 'Critical Heat Spike', severity: 'Critical', time: '2023.10.24 | 14:12', status: 'Resolved', icon: <CheckCircle2 size={12} /> },
                { id: '#TH-9024', trigger: 'Albedo Drop', severity: 'Moderate', time: '2023.10.25 | 09:45', status: 'Active', icon: <Clock size={12} /> },
                { id: '#TH-9027', trigger: 'Sensor Latency', severity: 'Low', time: '2023.10.25 | 11:30', status: 'Scheduled', icon: <RefreshCw size={12} /> },
                { id: '#TH-9031', trigger: 'Canopy Loss', severity: 'Critical', time: '2023.10.26 | 02:05', status: 'Deploying', icon: <Clock size={12} /> },
              ].map((alert) => (
                <tr key={alert.id} className="group hover:bg-surface-variant/30 transition-colors">
                  <td className="py-4 font-mono text-white">{alert.id}</td>
                  <td className="py-4 text-on-surface-variant">{alert.trigger}</td>
                  <td className="py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[0.6rem] font-bold uppercase",
                      alert.severity === 'Critical' ? "bg-error/10 text-error" : alert.severity === 'Moderate' ? "bg-orange-500/10 text-orange-500" : "bg-surface-variant text-on-surface-variant"
                    )}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="py-4 text-on-surface-variant">{alert.time}</td>
                  <td className="py-4">
                    <span className={cn(
                      "flex items-center gap-1 uppercase text-[0.6rem] font-bold",
                      alert.status === 'Resolved' ? "text-tertiary" : "text-primary"
                    )}>
                      {alert.icon} {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
