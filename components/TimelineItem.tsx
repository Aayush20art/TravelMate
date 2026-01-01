
import { LocationPoint } from '../types';

interface Props {
  item: LocationPoint;
  index: number;
  key?: any;
}

const TimelineItem = ({ item, index }: Props) => {
  return (
    
    <div className="relative pl-8 sm:pl-12 pb-10 sm:pb-14 border-l-2 border-white/5 last:pb-0 group">
      {/* Node Dot - Brighter Glowing Cyan & Pink */}
      <div className="absolute left-[-11px] top-2 w-5 h-5 rounded-full bg-white z-10 shadow-[0_0_20px_rgba(255,255,255,0.8)] border-4 border-cyan-500 group-hover:border-fuchsia-500 transition-colors duration-500"></div>
      
      {/* Content Card */}
      <div className="glass p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] transition-all duration-700 group-hover:translate-x-2 sm:group-hover:translate-x-4 bg-slate-900 group-hover:bg-slate-800/80 group-hover:border-fuchsia-500/50 group-hover:shadow-[0_0_40px_rgba(217,70,239,0.1)]">

        <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
          <span className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.25em] bg-gradient-to-r from-cyan-500 to-blue-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg">
            {item.timeSlot}
          </span>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {item.duration}
          </div>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 group-hover:text-cyan-300 transition-colors tracking-tight">{item.title}</h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 font-medium">{item.description}</p>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-start sm:items-center mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <p className="text-[8px] sm:text-[10px] text-slate-500 uppercase font-black tracking-widest">Transport</p>
              <p className="text-[10px] sm:text-xs text-white font-bold">{item.transportMode}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[8px] sm:text-[10px] text-slate-500 uppercase font-black tracking-widest">Est. Fare</p>
              <p className="text-[10px] sm:text-xs text-white font-bold">{item.estimatedFare}</p>
            </div>
          </div>

          {item.mapUrl && (
            <a 
              href={item.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-2xl bg-white text-[#0c0a2d] text-[10px] sm:text-xs font-black transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span>Map Guide</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
