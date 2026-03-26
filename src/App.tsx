import React, { useState } from 'react';
import { LoginView } from './components/LoginView';
import { Sidebar, TopBar } from './components/Navigation';
import { AnalyticsView } from './components/AnalyticsView';
import { DashboardView } from './components/DashboardView';
import { CommandCenterView } from './components/CommandCenterView';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [center, setCenter] = useState<[number, number]>([12.9784, 77.6408]); // Default: Indiranagar, Bangalore
  const [locationName, setLocationName] = useState('INDIRANAGAR, BANGALORE');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView 
            center={center} 
            setCenter={setCenter} 
            locationName={locationName} 
            setLocationName={setLocationName} 
          />
        );
      case 'analytics':
        return <AnalyticsView locationName={locationName} />;
      case 'command':
        return <CommandCenterView locationName={locationName} />;
      case 'reports':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-headline font-bold text-white mb-4 uppercase tracking-widest">Reports Module</h2>
            <p className="text-on-surface-variant max-w-md">Detailed PDF and CSV reports are generated weekly. Access the archive to view historical thermal data.</p>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary/30">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="pl-64">
        <TopBar title={activeTab.replace('-', ' ')} locationName={locationName} />
        
        <main className="pt-24 pb-12 px-8 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-error/5 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
