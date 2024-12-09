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
        setCurrent((prev) => Math.min(prev + increment, value));
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
    className="relative bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 transition-all"
  >
    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
      <Icon className="w-7 h-7 text-blue-600" />
    </div>

    <div className="space-y-2">
      <div className="text-5xl font-bold text-gray-900">
        <AnimatedNumber value={value} shouldStart={shouldAnimate} />
        <span className="ml-1 text-gray-500 text-3xl">{unit}</span>
      </div>
      <div className="text-gray-600 text-xl">{label}</div>
    </div>

    <div className="absolute -bottom-px left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl opacity-50" />
  </motion.div>
);

const SimpleStats = () => {
  const [stats, setStats] = useState({
    activeStartups: 30,
    totalInvestors: 706,
    totalTokens: 16860,
  });
  const [currentDateTime, setCurrentDateTime] = useState(() => ({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  }));
  const [isVisible, setIsVisible] = useState(false);
  const [lastStartupUpdate, setLastStartupUpdate] = useState(new Date());
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // 실시간 업데이트 로직
    const updateStats = () => {
      const now = new Date();
      const hoursSinceLastUpdate = (now - lastStartupUpdate) / (1000 * 60 * 60);
      
      setStats(prevStats => {
        // 24시간마다 스타트업 1개씩 증가
        const newStartupCount = 
          hoursSinceLastUpdate >= 24 
            ? prevStats.activeStartups + 1 
            : prevStats.activeStartups;
        
        // 24시간이 지났다면 마지막 업데이트 시간 갱신
        if (hoursSinceLastUpdate >= 24) {
          setLastStartupUpdate(now);
        }

        return {
          activeStartups: newStartupCount,
          totalInvestors: prevStats.totalInvestors + Math.floor(Math.random() * 2),
          totalTokens: prevStats.totalTokens + Math.floor(Math.random() * 5),
        };
      });
    };

    const statsTimer = setInterval(updateStats, 60000); // 1분마다 업데이트
    const clockTimer = setInterval(() => {
      const now = new Date();
      setCurrentDateTime({
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
      });
    }, 1000);

    return () => {
      clearInterval(statsTimer);
      clearInterval(clockTimer);
    };
  }, [lastStartupUpdate]);

  return (
    <div className="relative w-full bg-gray-50 py-16" ref={containerRef}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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
            <div className="inline-flex items-center text-lg text-gray-500">
              {currentDateTime.date} {currentDateTime.time} 기준
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStats;