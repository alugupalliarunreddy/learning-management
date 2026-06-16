import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Calendar } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { Page3D } from '../components/ui/Page3D';

export function Analytics() {
  const {
    selectedFilter, setSelectedFilter, customRange, setCustomRange,
    mockLearningProgress, mockSkillDistribution, mockWeeklyActivity
  } = useStudent();

  const [startInput, setStartInput] = useState(customRange.start);
  const [endInput, setEndInput] = useState(customRange.end);
  const [isCustomActive, setIsCustomActive] = useState(false);

  const getChartData = () => {
    if (isCustomActive && startInput && endInput) {
      return [
        { name: 'Start (' + startInput + ')', hours: 12 },
        { name: 'Mid Range', hours: 38 },
        { name: 'End (' + endInput + ')', hours: 24 }
      ];
    }
    return mockLearningProgress[selectedFilter] || [];
  };

  const activeChartData = getChartData();

  const handleApplyCustomRange = (e) => {
    e.preventDefault();
    if (!startInput || !endInput) return;
    setCustomRange({ start: startInput, end: endInput });
    setIsCustomActive(true);
    setSelectedFilter('Custom Range');
  };

  const handleFilterSelect = (filterName) => {
    setSelectedFilter(filterName);
    setIsCustomActive(false);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-xs text-slate-500 font-mono font-bold">{label}</p>
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1">Study: {payload[0].value} hours</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Page3D>
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-850 dark:text-slate-100 tracking-tight">Performance Analytics</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Review learning timelines, domain distributions, and active metrics.</p>
        </div>

        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
          <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-slate-450 dark:text-slate-500 font-mono uppercase mr-2 font-bold">TIMELINE:</span>
              {['Last 7 Days', 'Last 30 Days', 'Last 6 Months'].map(preset => (
                <button
                  key={preset}
                  onClick={() => handleFilterSelect(preset)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${selectedFilter === preset && !isCustomActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/15'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                    }`}
                >
                  {preset}
                </button>
              ))}
              {isCustomActive && (
                <span className="px-4 py-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono">
                  Custom Range Active
                </span>
              )}
            </div>

            <form onSubmit={handleApplyCustomRange} className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
              <span className="text-[10px] text-slate-450 dark:text-slate-500 font-mono uppercase font-bold">CUSTOM RANGE:</span>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={startInput}
                  onChange={(e) => setStartInput(e.target.value)}
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 outline-none focus:border-indigo-500/30"
                />
                <span className="text-xs text-slate-400 font-mono">to</span>
                <input
                  type="date"
                  value={endInput}
                  onChange={(e) => setEndInput(e.target.value)}
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 outline-none focus:border-indigo-500/30"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold rounded-xl text-xs border border-slate-200 dark:border-slate-800 transition-all cursor-pointer shadow-sm"
              >
                <Calendar className="h-4 w-4" /> Apply
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-850 dark:text-slate-200">Study Hour Distribution</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Chronological analysis of invested time</p>
              </div>
              <span className="text-[10px] text-indigo-650 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 px-2.5 py-1 rounded-full font-mono font-bold uppercase border border-indigo-500/10 dark:border-indigo-500/20">
                {selectedFilter}
              </span>
            </div>

            <div className="h-72">
              {!activeChartData?.length ? (
                <div className="h-full flex items-center justify-center text-sm text-slate-500 font-medium border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  No data for this range.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activeChartData} margin={{ left: -15, right: 10, top: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="hours" name="Hours Studied" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHours)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 flex flex-col items-center justify-between shadow-sm">
            <div className="w-full">
              <h4 className="text-sm font-semibold text-slate-850 dark:text-slate-200">Domain Proportions</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Module distribution representation</p>
            </div>

            <div className="h-44 w-44 mt-4 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mockSkillDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={3} dataKey="value">
                    {mockSkillDistribution.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono font-bold">Domains</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 w-full mt-4">
              {mockSkillDistribution.map(skill => (
                <div key={skill.name} className="flex items-center gap-2 bg-white dark:bg-slate-950/20 border border-slate-200 dark:border-slate-900 px-3 py-1.5 rounded-xl">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: skill.color }}></span>
                  <span className="text-xs text-slate-700 dark:text-slate-350 font-semibold">{skill.name}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono ml-auto font-bold">{skill.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 shadow-sm">
          <div>
            <h4 className="text-sm font-semibold text-slate-850 dark:text-slate-200">Weekly Study Load</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-6">Comparative diagnostic map of active hours</p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockWeeklyActivity} margin={{ left: -15, right: 10, top: 10, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg shadow-xl font-mono text-xs text-slate-700 dark:text-slate-300">
                          <p className="font-bold">{label}</p>
                          <p className="text-indigo-600 dark:text-indigo-450 font-bold mt-0.5">Active hours: {payload[0].value}h</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="active" name="Activity (hrs)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Page3D>
  );
}
