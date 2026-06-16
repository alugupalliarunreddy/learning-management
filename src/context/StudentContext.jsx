import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import {
  mockBadges, mockLearningProgress, mockSkillDistribution,
  mockWeeklyActivity, mockHeatmap, mockGoals, mockNotifications
} from '../data/mockData';

export const StudentContext = createContext();

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudent must be used within StudentProvider');
  return context;
};

export const StudentProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [enable3D, setEnable3D] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    setIsGuest(false);
  };
  
  const loginAsGuest = () => {
    setIsAuthenticated(true);
    setIsGuest(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
  };

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Failed to write theme preferences:', e);
    }
  }, [theme]);

  const [selectedFilter, setSelectedFilter] = useState('Last 7 Days');
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [notifications, setNotifications] = useState(mockNotifications);

  const [userProfile, setUserProfile] = useState({
    name: 'Arun',
    email: 'arunreddy@example.com',
    skills: ['React', 'TypeScript', 'Java', 'Python', 'AI'],
    learningGoals: ['Complete React in 30 days', 'Master DSA challenges', 'Build ML models'],
    scores: { React: 82, Java: 90, AI: 88, Python: 60, DSA: 65 }
  });

  const [goals, setGoals] = useState(mockGoals);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const updateProfile = (name, email) => {
    setUserProfile(prev => ({ ...prev, name, email }));
  };

  const updateStudentScore = (skill, val) => {
    setUserProfile(prev => ({
      ...prev,
      scores: { ...prev.scores, [skill]: Number(val) }
    }));
  };

  const addNewGoal = (goalName, targetDays) => {
    setGoals(prev => [
      ...prev,
      { id: Date.now(), name: goalName, progress: 0, targetDays: Number(targetDays), hoursUsed: 0, status: 'In Progress' }
    ]);
  };

  const updateGoal = (id, updatedGoal) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updatedGoal } : g));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const recommendations = useMemo(() => {
    const list = [];
    if (userProfile.scores.React < 85) {
      list.push({
        title: 'Advanced React Optimization',
        desc: 'Master React performance profiling, memory leak detection, and fiber architecture.',
        details: ['Performance Profiling & Auditing', 'Virtual DOM & Fiber Engine', 'Concurrent Mode & Suspense', 'Custom Hooks & State Engines']
      });
    }
    if (userProfile.scores.DSA < 70) {
      list.push({
        title: 'Dynamic Programming Masterclass',
        desc: 'Deep dive into recursive state spaces, memoization tables, and bottom-up tabulation.',
        details: ['DP State Space Formulations', 'Memoization & Recursion Trees', 'Topological Sort & Grid DP', 'Bitmask & Knapsack Variants']
      });
    }
    if (userProfile.scores.AI < 90) {
      list.push({
        title: 'Machine Learning Pipelines',
        desc: 'An intensive introduction to supervised models, loss optimizer calculus, and neural node architectures.',
        details: ['Loss Functions & Optimizers', 'Supervised Learning Calculus', 'Neural Network Layers', 'Feature Selection & Evaluation']
      });
    }
    if (list.length === 0) {
      list.push({
        title: 'Distributed System Architecture',
        desc: 'Advanced paradigms in scalability, load balancer topologies, sharding, and redis cache layers.',
        details: ['Load Balancer Topologies', 'Caching & Replication Trees', 'Database Partition Sharding', 'Message Queue Buffering']
      });
    }
    return list;
  }, [userProfile.scores]);

  const aiInsights = useMemo(() => {
    const insights = [];
    if (userProfile.scores.React >= 80) {
      insights.push('🚀 Your React development telemetry is optimal (increased by 25% this cycle).');
    } else {
      insights.push('💡 Recommendation: Execute 3 sandbox builds to increase React score.');
    }
    if (userProfile.scores.DSA < 70) {
      insights.push('⚠️ DSA progression score is below benchmark threshold. Focus on recursion trees.');
    } else {
      insights.push('🛡️ Benchmark Met: DSA competency is within the safe evaluation parameters.');
    }
    insights.push('🔥 Learning efficiency peaks during weekend blocks (avg. 8.5 hrs vs 4.8 hrs weekdays).');
    insights.push('📊 Peak cognitive performance correlated with interactive sandboxed problem solving.');
    return insights;
  }, [userProfile.scores]);

  return (
    <StudentContext.Provider
      value={{
        theme, toggleTheme, selectedFilter, setSelectedFilter, customRange, setCustomRange,
        notifications, markAllNotificationsRead, markNotificationRead, deleteNotification,
        userProfile, setUserProfile, updateProfile, updateStudentScore, goals, addNewGoal, updateGoal, deleteGoal,
        isAuthenticated, isGuest, login, loginAsGuest, logout,
        recommendations, aiInsights, mockBadges, mockLearningProgress, mockSkillDistribution,
        mockWeeklyActivity, mockHeatmap,
        enable3D, setEnable3D, enableNotifications, setEnableNotifications
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
