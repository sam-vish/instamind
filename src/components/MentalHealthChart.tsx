import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MentalHealthChartProps {
  data: {
    anxiety: number;
    depression: number;
    stress: number;
    wellbeing: number;
  };
}

export const MentalHealthChart: React.FC<MentalHealthChartProps> = ({ data }) => {
  const indicators = [
    { 
      label: 'Anxiety', 
      value: data.anxiety, 
      color: 'from-red-500 to-red-600', 
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30',
      icon: TrendingUp,
      iconColor: 'text-red-400'
    },
    { 
      label: 'Depression', 
      value: data.depression, 
      color: 'from-orange-500 to-orange-600', 
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30',
      icon: TrendingDown,
      iconColor: 'text-orange-400'
    },
    { 
      label: 'Stress', 
      value: data.stress, 
      color: 'from-yellow-500 to-yellow-600', 
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30',
      icon: Minus,
      iconColor: 'text-yellow-400'
    },
    { 
      label: 'Well-being', 
      value: data.wellbeing, 
      color: 'from-green-500 to-green-600', 
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
      icon: TrendingUp,
      iconColor: 'text-green-400'
    },
  ];

  return (
    <div className="space-y-4">
      {indicators.map((indicator, index) => (
        <div 
          key={indicator.label} 
          className={`group p-4 ${indicator.bgColor} backdrop-blur-sm border ${indicator.borderColor} rounded-xl hover:scale-105 transition-all duration-300 animate-slideInUp`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-3">
              <indicator.icon className={`w-5 h-5 ${indicator.iconColor}`} />
              <span className="text-white font-semibold">{indicator.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold text-lg">{indicator.value.toFixed(1)}%</span>
              <div className="w-12 h-6 bg-white/20 rounded-full flex items-center px-1">
                <div 
                  className={`h-4 bg-gradient-to-r ${indicator.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                  style={{ width: `${Math.min(indicator.value, 100)}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${indicator.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{ width: `${Math.min(indicator.value, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};