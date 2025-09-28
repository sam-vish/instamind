import React from 'react';
import { Shield, AlertCircle, Heart, Lock, Eye, Users } from 'lucide-react';

export const PrivacyDisclaimer: React.FC = () => {
  return (
    <div className="relative group animate-slideInUp animation-delay-900">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
      
      <div className="relative bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-3 mb-6">
            <Shield className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Privacy & Ethics</h3>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="group/card bg-white/5 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-white text-lg">Important Disclaimer</h4>
            </div>
            <p className="text-gray-300 leading-relaxed">
              InstaMind provides AI-assisted insights and is <strong className="text-orange-300">not a professional diagnosis tool</strong>. 
              The analysis is for informational purposes only and should not replace professional medical advice.
            </p>
          </div>

          <div className="group/card bg-white/5 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-white text-lg">Seek Professional Help</h4>
            </div>
            <p className="text-gray-300 leading-relaxed">
              If you or someone you know is experiencing mental health concerns, please consult with a 
              qualified mental health professional or contact a crisis helpline.
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-white text-lg">Data Privacy & Security</h4>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Eye, text: "Only public Instagram post captions are analyzed" },
              { icon: Lock, text: "No personal data is stored without explicit consent" },
              { icon: Shield, text: "Analysis data is processed securely and encrypted" },
              { icon: Users, text: "Data is never shared with third parties" },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                <item.icon className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-red-900/20 to-pink-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Heart className="w-5 h-5 text-red-400 animate-pulse" />
            <h4 className="font-bold text-white">Emergency Resources</h4>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-red-300">Crisis Support:</strong> National Suicide Prevention Lifeline: <span className="text-white font-mono">988</span> | 
            Crisis Text Line: Text <span className="text-white font-mono">HOME</span> to <span className="text-white font-mono">741741</span>
          </p>
        </div>
      </div>
    </div>
  );
};