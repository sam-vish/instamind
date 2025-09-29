import React, { useEffect, useRef } from 'react';
import { Brain, Heart, Sparkles, ArrowRight, Shield, Zap, Target, Gamepad2, Users, Smartphone } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      
      heroRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(147, 51, 234, 0.3) 0%, rgba(79, 70, 229, 0.2) 25%, rgba(17, 24, 39, 0.8) 50%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div 
        ref={heroRef}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-gray-900 transition-all duration-300"
      />
      
      {/* Floating orbs */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          >
            <div 
              className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-xl animate-pulse"
              style={{
                width: `${20 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 60}px`,
              }}
            />
          </div>
        ))}
        
        {/* Gaming-style geometric shapes */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            <div 
              className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 transform rotate-45"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-6">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="relative">
                  <Brain className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-30 animate-pulse" />
                </div>
                <Heart className="w-4 h-4 text-pink-400 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                InstaMind
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-300 font-medium">
              <a href="#features" className="hover:text-cyan-400 transition-all duration-300 hover:scale-110 transform">Features</a>
              <a href="#privacy" className="hover:text-cyan-400 transition-all duration-300 hover:scale-110 transform">Privacy</a>
              <a href="#about" className="hover:text-cyan-400 transition-all duration-300 hover:scale-110 transform">About</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 animate-fadeInUp">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-3 mb-8 shadow-2xl">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
                <span className="text-cyan-300 text-sm font-bold tracking-wide">AI-POWERED WELLNESS DETECTOR</span>
                <Gamepad2 className="w-5 h-5 text-pink-400 animate-pulse" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl">
                  Check Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient text-shadow-lg">
                  Vibe Check ✨
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-medium max-w-3xl mx-auto">
                🔥 Drop your Instagram links and let our AI tell you if your posts are giving off 
                <span className="text-green-400 font-bold"> healthy vibes </span> or if it's time to 
                <span className="text-orange-400 font-bold"> check in with someone </span> 💙
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fadeInUp animation-delay-300">
              <button
                onClick={onGetStarted}
                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl text-white font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 transform-gpu animate-pulse hover:animate-none"
              >
                <span className="flex items-center space-x-3">
                  <Smartphone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>START VIBE CHECK</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
              </button>
              
              <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-cyan-400/30 rounded-2xl text-white font-bold text-xl hover:bg-white/20 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/20">
                <span className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>See How It Works</span>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInUp animation-delay-600 max-w-4xl mx-auto">
              {[
                { icon: Target, label: 'Accuracy Rate', value: '94%', color: 'from-green-400 to-emerald-400' },
                { icon: Zap, label: 'Analysis Speed', value: '<30s', color: 'from-yellow-400 to-orange-400' },
                { icon: Shield, label: 'Privacy First', value: '100%', color: 'from-blue-400 to-cyan-400' },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 hover:scale-110 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-400/20 transform-gpu">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <stat.icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <div className="text-3xl font-black text-white mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-gray-300 text-sm font-semibold tracking-wide">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div id="features" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                🚀 Super Cool Features
              </h2>
              <p className="text-xl text-gray-300 font-medium">
                Next-level AI that actually gets you 💯
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: '🧠 Smart AI Brain',
                  description: 'Our AI reads between the lines and spots when something might be off',
                  gradient: 'from-purple-500 to-pink-500',
                  emoji: '🤖'
                },
                {
                  icon: Sparkles,
                  title: '✨ Vibe Detector',
                  description: 'Instantly know if your posts are giving good vibes or need some TLC',
                  gradient: 'from-blue-500 to-cyan-500',
                  emoji: '😊'
                },
                {
                  icon: Shield,
                  title: '🛡️ Super Private',
                  description: 'Your stuff stays YOUR stuff - we keep everything locked down tight',
                  gradient: 'from-green-500 to-emerald-500',
                  emoji: '🔒'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-10 hover:bg-white/15 transition-all duration-500 hover:scale-110 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/20 transform-gpu"
                >
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {feature.emoji}
                  </div>
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl`}>
                    <feature.icon className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg font-medium">{feature.description}</p>
                  
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};