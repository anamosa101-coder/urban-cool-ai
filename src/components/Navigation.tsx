import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BarChart3, 
  ShieldAlert, 
  FileText, 
  Settings, 
  HelpCircle, 
  Search, 
  Bell, 
  UserCircle,
  AlertTriangle,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'command', label: 'Command Center', icon: <ShieldAlert size={20} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={20} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 flex flex-col border-r border-outline-variant/15 bg-surface/60 backdrop-blur-xl shadow-2xl shadow-surface-container-lowest/40 font-headline tracking-tight">
      <div className="p-6">
        <div className="text-xl font-bold text-primary tracking-widest uppercase mb-1">Thermal Sentinel</div>
        <div className="text-[0.65rem] text-on-surface-variant tracking-widest uppercase opacity-70">City Administrator</div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg",
              activeTab === item.id 
                ? "text-primary font-bold border-r-2 border-primary bg-surface-container/50" 
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
            )}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-outline-variant/15">
        <button 
          onClick={() => setShowAlertPopup(true)}
          className="w-full bg-gradient-to-br from-primary to-on-primary-container text-on-primary py-3 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <AlertTriangle size={14} />
          Emergency Protocol
        </button>
      </div>

      <AnimatePresence>
        {showAlertPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-surface-container border border-outline-variant/30 p-8 rounded-2xl shadow-2xl max-w-sm w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-error"></div>
              <button 
                onClick={() => setShowAlertPopup(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Bell size={32} className="animate-pulse" />
                </div>
                <h3 className="text-xl font-headline font-black text-white uppercase tracking-widest">Protocol Initialized</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  The emergency monitoring system is now active. The dashboard will automatically display real-time alerts if any critical thermal anomalies are detected.
                </p>
                <button 
                  onClick={() => setShowAlertPopup(false)}
                  className="mt-4 px-8 py-3 bg-primary text-on-primary rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Acknowledge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="p-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-all text-xs">
          <Settings size={16} />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-all text-xs">
          <HelpCircle size={16} />
          <span>Support</span>
        </button>
      </div>
    </aside>
  );
};

export const TopBar: React.FC<{ title: string; locationName: string }> = ({ title, locationName }) => {
  const baseLocation = locationName.split(',')[0].trim();
  return (
    <header className="fixed top-0 right-0 left-64 z-30 flex justify-between items-center px-8 h-16 bg-surface/80 backdrop-blur-md transition-all border-b border-outline-variant/10">
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-black text-primary uppercase tracking-tighter">{title}</h1>
        <div className="hidden lg:flex items-center gap-6 text-[0.6875rem] font-headline uppercase tracking-[0.05rem]">
          <span className="text-primary font-bold">Selected Area: {baseLocation}</span>
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Status: Optimal
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer">
            <Bell size={20} className="text-on-surface-variant hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </div>
          
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-[0.65rem] font-bold text-white uppercase tracking-wider">Admin User</p>
              <p className="text-[0.55rem] text-on-surface-variant uppercase">Level 4 Clearance</p>
            </div>
            <UserCircle size={32} className="text-primary transition-transform group-active:scale-95" />
          </div>
        </div>
      </div>
    </header>
  );
};
