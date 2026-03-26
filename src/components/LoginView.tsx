import React from 'react';
import { motion } from 'motion/react';
import { LogIn, ShieldCheck } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-surface">
      {/* Left Section: 70% Brand Visual */}
      <section className="relative w-full md:w-[70%] min-h-[400px] md:min-h-screen flex items-end p-8 md:p-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            alt="City skyline"
            referrerPolicy="no-referrer"
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
          <div className="absolute inset-0 glass-panel opacity-40"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <ShieldCheck size={14} className="text-primary" />
            <span className="text-[0.625rem] font-headline uppercase tracking-[0.15em] text-primary">Thermal Sentinel Active</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]">
            Urban Cooling Intelligence
          </h1>
          <p className="font-body text-xl md:text-2xl text-on-surface-variant font-light tracking-wide leading-relaxed">
            Turning Heat Data into Action
          </p>
          
          <div className="mt-12 flex gap-8 items-center border-t border-white/10 pt-8">
            <div className="flex flex-col">
              <span className="font-headline text-2xl font-bold text-primary">32.4°C</span>
              <span className="font-label text-[0.6875rem] uppercase tracking-widest text-on-surface-variant">Avg Sector Heat</span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex flex-col">
              <span className="font-headline text-2xl font-bold text-tertiary">Optimized</span>
              <span className="font-label text-[0.6875rem] uppercase tracking-widest text-on-surface-variant">Grid Status</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Right Section: 30% Login Panel */}
      <section className="w-full md:w-[30%] bg-surface-container-low flex items-center justify-center p-8 md:p-12 z-20 shadow-2xl shadow-surface-container-lowest/40">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm"
        >
          <div className="flex p-1 bg-surface-container rounded-full mb-10 border border-outline-variant/10">
            <button className="flex-1 py-2 text-[0.75rem] font-headline font-bold rounded-full bg-surface-bright text-primary shadow-sm">
              LOG IN
            </button>
            <button className="flex-1 py-2 text-[0.75rem] font-headline font-medium text-on-surface-variant hover:text-on-surface transition-colors">
              SIGN UP
            </button>
          </div>

          <div className="mb-10">
            <h2 className="font-headline text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-on-surface-variant text-sm">Access your district cooling dashboard.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-2">
              <label className="block font-label text-[0.6875rem] uppercase tracking-widest text-on-surface-variant font-semibold" htmlFor="email">
                Corporate Email
              </label>
              <input 
                className="w-full bg-surface-container-highest border-none rounded-sm px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/40 focus:bg-surface-bright transition-all placeholder:text-on-surface-variant/30" 
                id="email" 
                placeholder="name@city-admin.gov" 
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-label text-[0.6875rem] uppercase tracking-widest text-on-surface-variant font-semibold" htmlFor="password">
                  Secure Token
                </label>
                <a className="text-[0.6875rem] uppercase tracking-widest text-primary font-bold hover:underline" href="#">Forgot?</a>
              </div>
              <input 
                className="w-full bg-surface-container-highest border-none rounded-sm px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/40 focus:bg-surface-bright transition-all placeholder:text-on-surface-variant/30" 
                id="password" 
                placeholder="••••••••••••" 
                type="password"
                required
              />
            </div>
            <div className="flex items-center gap-3">
              <input 
                className="w-4 h-4 rounded-none bg-surface-container-highest border-outline-variant text-primary focus:ring-0 focus:ring-offset-0" 
                id="remember" 
                type="checkbox" 
              />
              <label className="text-xs text-on-surface-variant cursor-pointer" htmlFor="remember">Keep session active for 24h</label>
            </div>
            <button 
              className="w-full thermal-gradient-btn text-on-primary font-headline font-bold py-4 rounded-full tracking-wider uppercase text-xs shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2" 
              type="submit"
            >
              <LogIn size={16} />
              Log In
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20"></div>
            </div>
            <div className="relative flex justify-center text-[0.625rem] uppercase tracking-[0.2em] font-headline font-bold text-outline">
              <span className="bg-surface-container-low px-4">Federated Access</span>
            </div>
          </div>

          <button 
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 bg-surface-container-high border border-outline-variant/15 py-3 rounded-full hover:bg-surface-bright transition-all active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span className="font-label text-sm font-medium text-on-surface">Continue with Google</span>
          </button>

          <footer className="mt-12 text-center">
            <p className="text-[0.6875rem] text-outline uppercase tracking-widest leading-loose">
              Institutional access only.<br/>
              Contact <a className="text-primary hover:underline" href="#">System Admin</a> for new credentials.
            </p>
          </footer>
        </motion.div>
      </section>
    </main>
  );
};
