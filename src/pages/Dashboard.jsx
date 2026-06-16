import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckSquare, Clock, Flame, Lightbulb, Sparkles, Plus, Edit2, Trash2 } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { Page3D } from '../components/ui/Page3D';
import { StatCardWrapper } from '../components/ui/StatCardWrapper';
import { FlippableRecommendationCard } from '../components/ui/FlippableRecommendationCard';

const PRESET_COURSES = [
  { name: 'React', days: 30 },
  { name: 'Java', days: 45 },
  { name: 'DSA', days: 60 },
  { name: 'Python', days: 30 },
  { name: 'AI', days: 90 },
  { name: 'Node.js', days: 30 },
  { name: 'System Design', days: 45 },
  { name: 'SQL', days: 20 },
];

export function Dashboard() {
  const { theme, goals, addNewGoal, updateGoal, deleteGoal, recommendations, aiInsights, mockHeatmap } = useStudent();
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalDays, setNewGoalDays] = useState('30');
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingGoalIdx, setEditingGoalIdx] = useState(null);

  const handleSubmitGoal = (e) => {
    e.preventDefault();
    if (!newGoalName.trim()) return;
    
    if (editingGoalIdx !== null) {
      updateGoal(editingGoalIdx, { name: newGoalName, targetDays: Number(newGoalDays) });
      setEditingGoalIdx(null);
    } else {
      addNewGoal(newGoalName, newGoalDays);
    }
    
    setNewGoalName('');
    setNewGoalDays('30');
    setShowGoalForm(false);
  };

  const handleEditGoal = (goal) => {
    setEditingGoalIdx(goal.id);
    setNewGoalName(goal.name);
    setNewGoalDays(goal.targetDays.toString());
    setShowGoalForm(true);
  };

  const handleCancelForm = () => {
    setShowGoalForm(false);
    setEditingGoalIdx(null);
    setNewGoalName('');
    setNewGoalDays('30');
  };

  const heatmapColors = theme === 'light' ?
    ['bg-slate-100 border border-slate-200/20', 'bg-indigo-100', 'bg-indigo-300', 'bg-indigo-600'] :
    ['bg-slate-950 border border-slate-900/40', 'bg-indigo-950', 'bg-indigo-700/80', 'bg-indigo-500'];

  return (
    <Page3D>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">LearnFlow</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Diagnostic dashboard detailing skill metrics and predictive recommendations.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCardWrapper title="Active Modules" value={goals.length.toString()} icon={BookOpen} glowColor="indigo" description="Enrolled study paths" />
          <StatCardWrapper title="Completed" value={goals.filter(g => g.status === 'Almost Done' || g.progress >= 90).length.toString()} icon={CheckSquare} glowColor="emerald" description="Modules certified" />
          <StatCardWrapper title="Diagnostic Hours" value={`${goals.reduce((acc, g) => acc + g.hoursUsed, 150)} hrs`} icon={Clock} glowColor="cyan" description="Accumulated learning timeline" />
          <StatCardWrapper title="Progression Streak" value="15 Days" icon={Flame} glowColor="orange" description="Consecutive operational days" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Daily Activity Heatmap</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Telemetry matrix mapping cumulative study density</p>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase select-none">
                  <span>Less</span>
                  <span className={`h-2.5 w-2.5 rounded-sm ${heatmapColors[0]}`}></span>
                  <span className={`h-2.5 w-2.5 rounded-sm ${heatmapColors[1]}`}></span>
                  <span className={`h-2.5 w-2.5 rounded-sm ${heatmapColors[2]}`}></span>
                  <span className={`h-2.5 w-2.5 rounded-sm ${heatmapColors[3]}`}></span>
                  <span>More</span>
                </div>
              </div>

              <div className="overflow-x-auto pr-2">
                <div className="min-w-[720px] flex items-start gap-2 pt-2">
                  <div className="flex flex-col gap-1 text-[9px] text-slate-400 dark:text-slate-500 font-mono pr-1 select-none leading-3 h-24 justify-between pt-0.5">
                    <span className="h-2">Mon</span>
                    <span className="h-2">Tue</span>
                    <span className="h-2">Wed</span>
                    <span className="h-2">Thu</span>
                    <span className="h-2">Fri</span>
                    <span className="h-2">Sat</span>
                    <span className="h-2">Sun</span>
                  </div>
                  <div className="flex-1 grid grid-flow-col grid-rows-7 gap-1 h-24">
                    {mockHeatmap.flatMap((row, rIdx) =>
                      row.map((cell, cIdx) => (
                        <div
                          key={`cell-${rIdx}-${cIdx}`}
                          className={`h-2.5 w-2.5 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer ${heatmapColors[cell.level]}`}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Competency Path Projections</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Projected progression for target modules</p>
                </div>
                <button
                  onClick={() => {
                    setEditingGoalIdx(null);
                    setNewGoalName('');
                    setNewGoalDays('30');
                    setShowGoalForm(!showGoalForm);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Projection
                </button>
              </div>

              <AnimatePresence>
                {showGoalForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mb-6 p-4 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Choose Course</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {PRESET_COURSES.map(course => (
                            <button
                              type="button"
                              key={course.name}
                              onClick={() => { setNewGoalName(course.name); setNewGoalDays(course.days.toString()); }}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                                newGoalName === course.name
                                  ? 'bg-indigo-600 text-white border-indigo-500'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-indigo-400'
                              }`}
                            >
                              {course.name}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Or type a custom course..."
                          value={newGoalName}
                          onChange={(e) => setNewGoalName(e.target.value)}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs outline-none text-slate-800 dark:text-slate-200 focus:border-indigo-500/50"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Target Horizon (Days)</label>
                        <input
                          type="number"
                          min="5"
                          value={newGoalDays}
                          onChange={(e) => setNewGoalDays(e.target.value)}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs outline-none text-slate-800 dark:text-slate-200 focus:border-indigo-500/50"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 text-xs font-semibold pt-2">
                      <button type="button" onClick={handleCancelForm} className="px-3 py-1.5 text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg">
                        Cancel
                      </button>
                      <button type="button" onClick={handleSubmitGoal} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm">
                        {editingGoalIdx !== null ? 'Save Changes' : 'Create'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="bg-white dark:bg-slate-950/20 border border-slate-200 dark:border-slate-900 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{goal.name} Path</h5>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase border ${goal.progress >= 90 ? 'text-emerald-600 bg-emerald-500/5 border-emerald-500/10' : 'text-indigo-600 bg-indigo-500/5 border-indigo-500/10'
                          }`}>
                          {goal.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-300/30 dark:border-slate-850/50">
                          <div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-mono w-10 text-right">{goal.progress}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-mono border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-900 pt-3 sm:pt-0 sm:pl-6 shrink-0">
                      <div className="flex flex-col gap-0.5">
                        <span className="uppercase text-slate-400 dark:text-slate-500">HORIZON</span>
                        <span className="text-slate-700 dark:text-slate-350 font-bold">{goal.targetDays} Days</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="uppercase text-slate-400 dark:text-slate-500">INVESTED</span>
                        <span className="text-slate-700 dark:text-slate-350 font-bold">{goal.hoursUsed} hrs</span>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col gap-1 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-900 pt-3 sm:pt-0 sm:pl-3 shrink-0">
                      <button onClick={() => handleEditGoal(goal)} className="p-1.5 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-500/10">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteGoal(goal.id)} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-500/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 relative overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-xl">
                  <Lightbulb className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-850 dark:text-slate-200">AI Diagnostic Insights</h4>
                  <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono tracking-wider">PREDICTIVE EVALUATION</p>
                </div>
              </div>
              <div className="space-y-3 mt-6">
                {aiInsights.map((insight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-3 bg-white dark:bg-slate-950/20 border border-slate-200/80 dark:border-slate-900/60 rounded-xl text-xs text-slate-650 dark:text-slate-300 leading-relaxed font-medium"
                  >
                    {insight}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 rounded-xl">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-850 dark:text-slate-200">Syllabus Interventions</h4>
                  <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono tracking-wider">DYNAMIC RECOMMENDATIONS</p>
                </div>
              </div>

              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <FlippableRecommendationCard
                    key={idx}
                    title={rec.title}
                    desc={rec.desc}
                    details={rec.details}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page3D>
  );
}
