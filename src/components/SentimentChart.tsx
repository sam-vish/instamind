import React, { useEffect, useRef } from 'react';

interface SentimentChartProps {
  data: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Calculate percentages
    const total = data.positive + data.negative + data.neutral;
    const positivePct = (data.positive / total) * 100;
    const negativePct = (data.negative / total) * 100;
    const neutralPct = (data.neutral / total) * 100;

    // Draw animated donut chart
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    const innerRadius = radius * 0.6;

    let currentAngle = -Math.PI / 2;

    // Add glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(147, 51, 234, 0.5)';

    // Positive segment
    const positiveAngle = (positivePct / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + positiveAngle);
    ctx.arc(centerX, centerY, innerRadius, currentAngle + positiveAngle, currentAngle, true);
    ctx.closePath();
    ctx.fillStyle = '#10B981';
    ctx.fill();
    currentAngle += positiveAngle;

    // Neutral segment
    const neutralAngle = (neutralPct / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + neutralAngle);
    ctx.arc(centerX, centerY, innerRadius, currentAngle + neutralAngle, currentAngle, true);
    ctx.closePath();
    ctx.fillStyle = '#6366F1';
    ctx.fill();
    currentAngle += neutralAngle;

    // Negative segment
    const negativeAngle = (negativePct / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + negativeAngle);
    ctx.arc(centerX, centerY, innerRadius, currentAngle + negativeAngle, currentAngle, true);
    ctx.closePath();
    ctx.fillStyle = '#EF4444';
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Add center text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Sentiment', centerX, centerY - 5);
    ctx.font = '12px system-ui';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText('Analysis', centerX, centerY + 10);

  }, [data]);

  return (
    <div className="space-y-6">
      <canvas
        ref={canvasRef}
        className="w-full h-48 animate-fadeIn"
        style={{ width: '100%', height: '192px' }}
      />
      <div className="space-y-3">
        {[
          { label: 'Positive', value: data.positive, color: 'bg-green-500', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
          { label: 'Neutral', value: data.neutral, color: 'bg-indigo-500', bgColor: 'bg-indigo-500/20', borderColor: 'border-indigo-500/30' },
          { label: 'Negative', value: data.negative, color: 'bg-red-500', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' },
        ].map((item, index) => (
          <div key={item.label} className={`flex items-center justify-between p-3 ${item.bgColor} backdrop-blur-sm border ${item.borderColor} rounded-xl hover:scale-105 transition-all duration-300 animate-slideInUp`} style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 ${item.color} rounded-full shadow-lg`} />
              <span className="text-white font-medium">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold text-lg">
                {((item.value / (data.positive + data.negative + data.neutral)) * 100).toFixed(1)}%
              </span>
              <div className="w-16 bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${(item.value / (data.positive + data.negative + data.neutral)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};