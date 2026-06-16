export const mockBadges = [
  { id: 'badge-1', title: 'DSA Master', description: 'Solved over 150 algorithmic challenges.', icon: '🏆', color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20' },
  { id: 'badge-2', title: '30 Day Streak', description: 'Log learning activity for 30 consecutive days.', icon: '🔥', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-500 border-orange-500/20' },
  { id: 'badge-3', title: 'Course Finisher', description: 'Successfully completed 5 core modules.', icon: '📚', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' },
  { id: 'badge-4', title: 'AI Specialist', description: 'Score above 85% in the Artificial Intelligence track.', icon: '🧠', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' }
];

export const mockLearningProgress = {
  'Last 7 Days': [
    { name: 'Mon', hours: 4 }, { name: 'Tue', hours: 6 }, { name: 'Wed', hours: 3 },
    { name: 'Thu', hours: 5 }, { name: 'Fri', hours: 8 }, { name: 'Sat', hours: 10 }, { name: 'Sun', hours: 7 }
  ],
  'Last 30 Days': [
    { name: 'Week 1', hours: 28 }, { name: 'Week 2', hours: 32 }, { name: 'Week 3', hours: 25 }, { name: 'Week 4', hours: 38 }
  ],
  'Last 6 Months': [
    { name: 'Jan', hours: 120 }, { name: 'Feb', hours: 140 }, { name: 'Mar', hours: 110 },
    { name: 'Apr', hours: 165 }, { name: 'May', hours: 180 }, { name: 'Jun', hours: 240 }
  ]
};

export const mockSkillDistribution = [
  { name: 'Java', value: 25, color: '#10b981' },
  { name: 'DSA', value: 30, color: '#f59e0b' },
  { name: 'React', value: 20, color: '#06b6d4' },
  { name: 'AI', value: 15, color: '#a855f7' },
  { name: 'Python', value: 10, color: '#ec4899' }
];

export const mockWeeklyActivity = [
  { day: 'Mon', active: 4, label: 'Mon ███████' },
  { day: 'Tue', active: 6, label: 'Tue █████' },
  { day: 'Wed', active: 3, label: 'Wed ████████' },
  { day: 'Thu', active: 5, label: 'Thu ██████' },
  { day: 'Fri', active: 8, label: 'Fri █████████' },
  { day: 'Sat', active: 10, label: 'Sat ███████████' },
  { day: 'Sun', active: 7, label: 'Sun ████████' }
];

export const mockHeatmap = Array.from({ length: 7 }, (_, rowIndex) =>
  Array.from({ length: 52 }, (_, colIndex) => ({
    day: rowIndex,
    week: colIndex,
    level: Math.random() > 0.85 ? 3 : Math.random() > 0.6 ? 2 : Math.random() > 0.3 ? 1 : 0
  }))
);

export const mockGoals = [
  { id: 1, name: 'React', progress: 72, targetDays: 30, hoursUsed: 24, status: 'On Track' },
  { id: 2, name: 'Java', progress: 90, targetDays: 15, hoursUsed: 18, status: 'Almost Done' },
  { id: 3, name: 'AI', progress: 45, targetDays: 45, hoursUsed: 12, status: 'In Progress' },
  { id: 4, name: 'Python', progress: 60, targetDays: 20, hoursUsed: 15, status: 'On Track' }
];

export const mockNotifications = [
  { id: 'n-1', type: 'streak', title: '🔥 5-Day Study Milestone', message: 'Consistent study schedule maintained. Excellent progress!', unread: true },
  { id: 'n-2', type: 'completion', title: '🎯 Module Certification', message: 'Completed Advanced React Concepts with a score of 95%.', unread: true },
  { id: 'n-3', type: 'performance', title: '📈 Score Optimization', message: 'Your average practice test scores have increased by 15%.', unread: false },
  { id: 'n-4', type: 'goal', title: '🙌 Goal Progression', message: 'You reached 72% of your React study objectives.', unread: false }
];
