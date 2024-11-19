import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Coins } from 'lucide-react';

const AnimatedNumber = ({ value, shouldStart }) => {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;

    const steps = 60;
    const stepDuration = 2000 / steps;
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      if (currentStep === steps) {
        setCurrent(value);
        clearInterval(timer);
      } else {
        setCurrent(prev => Math.min(prev + increment, value));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, shouldStart]);

  return Math.round(current).toLocaleString();
};

const StatCard = ({ icon: Icon, label, value, unit, delay, shouldAnimate }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-all"
  >
    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    
    <div className="space-y-2">
      <div className="text-4xl font-bold text-gray-900">
        <AnimatedNumber value={value} shouldStart={shouldAnimate} />
        <span className="ml-1 text-gray-500 text-2xl">{unit}</span>
      </div>
      <div className="text-gray-600">{label}</div>
    </div>

    <div className="absolute -bottom-px left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl opacity-50" />
  </motion.div>
);

const SimpleStats = () => {
  const [stats] = useState({
    activeStartups: 100,
    totalInvestors: 2500,
    totalTokens: 100000
  });

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.1, // 10% 정도만 보여도 애니메이션 시작
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full bg-gray-50 py-16" ref={containerRef}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={Building2}
              label="현재 투자 진행중인 스타트업"
              value={stats.activeStartups}
              unit="개+"
              delay={0}
              shouldAnimate={isVisible}
            />
            
            <StatCard
              icon={Users}
              label="현재 참여 투자자"
              value={stats.totalInvestors}
              unit="명+"
              delay={0.1}
              shouldAnimate={isVisible}
            />
            
            <StatCard
              icon={Coins}
              label="발행된 PCK 토큰"
              value={stats.totalTokens}
              unit="PCK"
              delay={0.2}
              shouldAnimate={isVisible}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center text-sm text-gray-500">
              2024.11 기준
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStats;