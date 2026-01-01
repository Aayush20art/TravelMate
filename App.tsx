
import { useState, useEffect, useCallback, useRef } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import TimelineItem from './components/TimelineItem';
import { generateItinerary } from './services/geminiService';
import { ItineraryPlan, UserPreferences } from './types';

const INTERESTS = ["Culture", "Food", "Shopping", "Parks", "History", "Nightlife", "Adventure"];

const App = () => {
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('18:00');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<ItineraryPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | undefined>();
  const nodesScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => console.log("Location access denied")
      );
    }
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const scrollNodes = () => {
    if (nodesScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = nodesScrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        nodesScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        nodesScrollRef.current.scrollBy({ top: 200, behavior: 'smooth' });
      }
    }
  };

  const handlePlanItinerary = async (e: any) => {
    e.preventDefault();
    if (!location) return;

    setLoading(true);
    setError(null);
    try {
      const prefs: UserPreferences = {
        location,
        startTime,
        endTime,
        interests: selectedInterests.length > 0 ? selectedInterests : ["General sightseeing"]
      };
      const result = await generateItinerary(prefs, coords);
      setPlan(result);
      setTimeout(() => {
        const resultsEl = document.getElementById('itinerary-results');
        resultsEl?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen relative text-slate-100 selection:bg-fuchsia-500/40">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative py-12 md:pt-10">
        {/* Subtle Background Icon Animations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
           <div className="absolute top-[10%] left-[5%] text-cyan-500/10 text-7xl md:text-9xl font-black rotate-12 select-none animate-[pulse_10s_infinite]">✈</div>
           <div className="absolute bottom-[10%] right-[5%] text-fuchsia-500/10 text-7xl md:text-9xl font-black -rotate-12 select-none animate-[pulse_8s_infinite]">📍</div>
           <div className="absolute top-[40%] right-[10%] text-white/5 text-6xl md:text-8xl font-black rotate-45 select-none animate-[pulse_12s_infinite]">🗺</div>
        </div>
        <div className="max-w-6xl w-full text-center space-y-8 md:space-y-16 relative z-10">
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/5 border border-white/20 text-cyan-400 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase shadow-[0_0_30px_rgba(34,211,238,0.2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,1)]"></span>
              </span>
              TravelMate
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-white leading-[0.9] md:leading-[0.8] drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col items-center gap-4">
  <span className="flex items-center gap-4">
    <svg
      className="w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 text-fuchsia-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
    <span>Infinite</span>
  </span>

  <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-600 text-transparent bg-clip-text animate-gradient">
    Journeys
  </span>
</h1>

            
            <p className="text-lg md:text-3xl text-slate-300 max-w-4xl mx-auto font-medium leading-relaxed opacity-90 tracking-tight px-4">
              Design your day with ultra-precision. We bridge the gap between your free time and the city's best kept secrets.
            </p>
          </div>

          <form 
            onSubmit={handlePlanItinerary}
            className="glass p-6 sm:p-12 rounded-[2rem] sm:rounded-[4rem] space-y-8 md:space-y-12 shadow-[0_50px_150px_-30px_rgba(0,0,0,0.7)] animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300 border-white/30 mx-auto max-w-4xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="space-y-2 md:space-y-4 text-left">
                <label className="text-[10px] md:text-xs font-black text-cyan-500 uppercase ml-2 md:ml-4 tracking-[0.3em]">Destination</label>
                <input 
                  type="text"
                  placeholder="Where to?"
                  className="w-full bg-white/5 border border-white/20 rounded-2xl md:rounded-[2rem] px-4 md:px-8 py-4 md:py-6 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/40 transition-all text-white placeholder:text-slate-600 font-extrabold text-lg md:text-xl"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:space-y-4 text-left">
                <label className="text-[10px] md:text-xs font-black text-cyan-500 uppercase ml-2 md:ml-4 tracking-[0.3em]">From</label>
                <input 
                  type="time"
                  className="w-full bg-white/5 border border-white/20 rounded-2xl md:rounded-[2rem] px-4 md:px-8 py-4 md:py-6 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/40 transition-all text-white font-extrabold text-lg md:text-xl"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2 md:space-y-4 text-left">
                <label className="text-[10px] md:text-xs font-black text-cyan-500 uppercase ml-2 md:ml-4 tracking-[0.3em]">Until</label>
                <input 
                  type="time"
                  className="w-full bg-white/5 border border-white/20 rounded-2xl md:rounded-[2rem] px-4 md:px-8 py-4 md:py-6 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/40 transition-all text-white font-extrabold text-lg md:text-xl"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-center px-2 md:px-6 gap-4">
                <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Select Your Interest Vibe</p>
                <p className="text-[9px] md:text-[10px] text-fuchsia-400 font-black uppercase tracking-[0.4em]">{selectedInterests.length} Filters Engaged</p>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
                {INTERESTS.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 sm:px-8 py-2 sm:py-4 rounded-xl sm:rounded-[1.5rem] text-xs sm:text-sm font-black transition-all duration-500 border-2 ${
                      selectedInterests.includes(interest)
                      ? 'bg-gradient-to-br from-fuchsia-600 to-indigo-700 border-fuchsia-400 text-white shadow-[0_0_40px_rgba(217,70,239,0.5)] scale-105 sm:scale-110'
                      : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-400'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={loading}
              className="group w-full bg-white hover:bg-cyan-400 text-[#0c0a2d] font-black py-4 sm:py-8 rounded-2xl sm:rounded-[2.5rem] shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all duration-700 transform active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 md:gap-5 text-xl sm:text-3xl uppercase tracking-tighter btn-glow"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6 sm:h-10 sm:w-10 text-[#0c0a2d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Preparing your guide…
                </>
              ) : (
                <>
                  <span>Architect My Day</span>
                  <svg className="w-6 h-6 sm:w-10 sm:h-10 group-hover:translate-x-3 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
          {error && <p className="text-fuchsia-400 font-black bg-fuchsia-500/10 px-6 py-4 rounded-2xl border border-fuchsia-500/30 inline-block text-base shadow-xl">{error}</p>}
        </div>
      </section>

      {/* Results Section */}
      {plan && (
        <section id="itinerary-results" className="max-w-[1400px] mx-auto px-4 sm:px-10 py-16 md:py-40 animate-in fade-in slide-in-from-bottom-24 duration-1000 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-32">
            {/* Header Area */}
            <div className="lg:col-span-3 mb-8 md:mb-24">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-16 border-l-[8px] md:border-l-[12px] border-fuchsia-600 pl-6 md:pl-12">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-5">
                     <span className="text-[10px] md:text-sm font-black text-cyan-400 uppercase tracking-[0.6em]">Master Plan</span>
                     <div className="h-0.5 w-16 md:w-32 bg-white/20"></div>
                  </div>
                  <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-black text-white tracking-tighter leading-none">{plan.destination}</h2>
                  <p className="text-lg md:text-3xl text-slate-300 font-semibold max-w-5xl leading-snug opacity-90">{plan.summary}</p>
                </div>
                <div className="glass w-full md:w-auto px-8 md:px-16 py-8 md:py-12 rounded-[2rem] md:rounded-[4rem] border-white/20 shadow-[0_30px_80px_rgba(217,70,239,0.15)] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-600"></div>
                  <p className="text-[10px] md:text-[11px] font-black text-slate-500 uppercase mb-2 md:mb-4 tracking-[0.5em]">Projected Capital</p>
                  <p className="text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-br from-white via-cyan-300 to-fuchsia-300 text-transparent bg-clip-text">
                    {plan.totalEstimatedCost}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Timeline */}
            <div className="lg:col-span-2 space-y-8 md:space-y-16">
              <h3 className="text-2xl md:text-4xl font-black text-white mb-10 md:mb-20 flex items-center gap-4 md:gap-8">
                <span className="p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] bg-white/5 text-cyan-400 border border-white/20 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                  <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </span>
                Optimized Journey Stream
              </h3>
              <div className="relative">
                {plan.itinerary.map((item, idx) => (
                  <TimelineItem key={idx} item={item} index={idx} />
                ))}
              </div>
            </div>

            {/* Sidebar Resources */}
            <div className="space-y-12 md:space-y-20">
              <div className="glass p-6 sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[4rem] md:rounded-[5rem] border-white/30 sticky top-12 shadow-2xl overflow-hidden group">
                <div className="absolute top-[-15%] right-[-15%] w-56 h-56 bg-fuchsia-500/20 blur-[100px] rounded-full group-hover:bg-fuchsia-500/30 transition-colors"></div>
                
                <h4 className="text-2xl md:text-3xl font-black text-white mb-8 md:mb-10 flex items-center gap-4 md:gap-6 relative z-10">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,1)]"></div>
                  Route Insights
                </h4>
                
                <div className="relative z-10">
                  {plan.groundingSources.length > 0 ? (
                    <div className="relative">
                       {/* Scrollable Container for Data Nodes */}
                       <div 
                        ref={nodesScrollRef}
                        className="max-h-[350px] md:max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scrollbar scroll-smooth"
                       >
                         {plan.groundingSources.map((source, idx) => (
                           <a 
                             key={idx}
                             href={source.uri}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="flex items-center justify-between p-4 md:p-8 bg-white/5 rounded-2xl md:rounded-[2.5rem] border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all group/link"
                           >
                             <span className="text-xs md:text-sm font-black text-slate-300 group-hover/link:text-white transition-colors truncate max-w-[70%] md:max-w-[80%] uppercase tracking-[0.2em]">
                               {source.title}
                             </span>
                             <div className="p-2 md:p-4 rounded-xl md:rounded-2xl bg-white/10 group-hover/link:bg-cyan-500 group-hover/link:text-[#0c0a2d] transition-all shrink-0">
                               <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                               </svg>
                             </div>
                           </a>
                         ))}
                       </div>
                       
                       {/* Scroll Indicator Button */}
                       {plan.groundingSources.length > 3 && (
                         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0c0a2d] to-transparent pointer-events-none flex items-end justify-center">
                            <button 
                              onClick={scrollNodes}
                              className="mb-2 p-2 rounded-full bg-white/10 backdrop-blur-md animate-bounce pointer-events-auto hover:bg-white/20 transition-colors"
                            >
                               <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                               </svg>
                            </button>
                         </div>
                       )}
                    </div>
                  ) : (
                    <div className="p-8 md:p-12 bg-white/5 rounded-[2rem] md:rounded-[4rem] border border-white/10 italic text-slate-500 text-[10px] md:text-sm font-black text-center uppercase tracking-widest leading-loose">
                      Synchronizing local map data...
                    </div>
                  )}
                </div>

                <div className="mt-8 md:mt-12 p-6 md:p-10 bg-gradient-to-br from-cyan-900/40 via-indigo-900/20 to-fuchsia-900/40 rounded-2xl md:rounded-[3rem] border border-white/10 relative z-10">
                  <div className="flex items-center gap-3 md:gap-5 mb-4 md:mb-6">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h5 className="text-cyan-400 font-black text-[10px] md:text-xs uppercase tracking-[0.5em]">Travel Advisory</h5>
                  </div>
                  <p className="text-[9px] md:text-xs text-slate-400 leading-loose font-black tracking-wide opacity-80 uppercase">
                    Timings are optimized using live satellite grounding. Please allow a 10% buffer for traffic variance during peak hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 md:py-32 border-t border-white/10 mt-20 md:mt-40 relative bg-[#06041d]/90 backdrop-blur-3xl overflow-hidden">
        {/* Decorative elements in footer */}
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/10 blur-[100px] rounded-full -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-fuchsia-500/10 blur-[100px] rounded-full translate-y-1/2"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-24">
            <div className="flex items-center gap-4 md:gap-8">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[3rem] bg-white flex items-center justify-center font-black text-2xl md:text-4xl text-[#0c0a2d] shadow-[0_0_50px_rgba(255,255,255,0.3)]">TM</div>
              <div className="flex flex-col">
                <span className="font-black text-3xl md:text-5xl tracking-tighter text-white uppercase leading-none"></span>
                <span className="text-[9px] md:text-[11px] text-fuchsia-500 uppercase font-black tracking-[0.6em] mt-1 md:mt-2">The Futue is here</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-20 text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-slate-500">
              
              <a href="#" className="hover:text-white transition-colors">Access</a>
            </div>

            <div className="text-center md:text-right flex flex-col items-center md:items-end gap-4 md:gap-6">
              <p className="text-[9px] md:text-[11px] text-slate-700 font-black uppercase tracking-[0.3em]">© 2025 TravelMate — Cross-Platform Speed</p>
              {/* <div className="flex gap-4 md:gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10 transition-all cursor-pointer text-slate-500 hover:text-fuchsia-400">
                    <svg className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48C19.137 20.161 22 16.415 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
