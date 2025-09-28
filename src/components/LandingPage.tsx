import React, { useEffect, useRef } from 'react';
import { Brain, Heart, Sparkles, ArrowRight, Shield, Zap, Target } from 'lucide-react';

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
            className="absolute animate-float-slow opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          >
            <div 
              className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl"
              style={{
                width: `${20 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 60}px`,
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
                <Brain className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                <Heart className="w-4 h-4 text-pink-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                InstaMind
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-300">
              <a href="#features" className="hover:text-purple-400 transition-colors duration-300">Features</a>
              <a href="#privacy" className="hover:text-purple-400 transition-colors duration-300">Privacy</a>
              <a href="#about" className="hover:text-purple-400 transition-colors duration-300">About</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 animate-fadeInUp">
              <div className="inline-flex items-center space-x-2 bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">AI-Powered Mental Health Insights</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Understand Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Digital Wellbeing
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Analyze Instagram posts with advanced AI to gain insights into mental health patterns, 
                sentiment trends, and emotional wellbeing indicators.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fadeInUp animation-delay-300">
              <button
                onClick={onGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 transform-gpu"
              >
                <span className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
              </button>
              
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInUp animation-delay-600">
              {[
                { icon: Target, label: 'Accuracy Rate', value: '94%' },
                { icon: Zap, label: 'Analysis Speed', value: '<30s' },
                { icon: Shield, label: 'Privacy First', value: '100%' },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-purple-500/30">
                    <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:text-purple-300 transition-colors duration-300" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
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
              <h2 className="text-4xl font-bold text-white mb-4">
                Powerful Features for Deep Insights
              </h2>
              <p className="text-xl text-gray-400">
                Advanced AI analysis with beautiful visualizations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: 'AI Analysis',
                  description: 'Advanced natural language processing to detect mental health indicators',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  icon: Sparkles,
                  title: 'Sentiment Tracking',
                  description: 'Real-time sentiment analysis with detailed emotional breakdowns',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Shield,
                  title: 'Privacy Protected',
                  description: 'Your data stays secure with ethical AI practices and transparency',
                  gradient: 'from-green-500 to-emerald-500'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-purple-500/30"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};