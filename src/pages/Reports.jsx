import React from 'react';
import { BarChart2, Award, Info, Printer, CheckCircle2 } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { Page3D } from '../components/ui/Page3D';

export function Reports() {
  const { userProfile, recommendations } = useStudent();
  const handlePrint = () => window.print();

  const scoreAnalyses = Object.entries(userProfile.scores).map(([name, score]) => {
    let status = 'Excellent';
    if (score < 70) status = 'Needs Improvement';
    else if (score < 85) status = 'Average';
    else if (score < 95) status = 'Good';
    return { name, score, status };
  });

  const strengths = scoreAnalyses.filter(s => s.score >= 85);
  const weaknesses = scoreAnalyses.filter(s => s.score < 70);

  return (
    <Page3D>
      <div className="space-y-8 max-w-4xl print:bg-white print:text-black">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-850 dark:text-slate-100 tracking-tight">Diagnostic Reports</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Generate, compile, and print dynamic evaluation summaries.</p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/15 cursor-pointer"
          >
            <Printer className="h-4 w-4" /> Print Report
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-8 space-y-8 print:border-none print:bg-white print:p-0 shadow-sm">
          <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-850 pb-6">
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 print:text-slate-900">EVALUATION METRICS DOSSIER</h1>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-1 font-bold">DATE: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-indigo-650 dark:text-indigo-400">LEARNFLOW ANALYTICS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-white dark:bg-slate-950/20 print:bg-slate-100/50 border border-slate-200 dark:border-slate-900 rounded-xl">
            <div className="space-y-2">
              <div className="flex justify-between text-xs border-b border-slate-100 dark:border-slate-850 pb-1">
                <span className="text-slate-500 font-semibold">Subject Identifier:</span>
                <span className="text-slate-800 dark:text-slate-200 print:text-slate-900 font-bold">{userProfile.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-semibold">Contact Node:</span>
                <span className="text-slate-800 dark:text-slate-200 print:text-slate-900 font-bold">{userProfile.email}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs border-b border-slate-100 dark:border-slate-850 pb-1">
                <span className="text-slate-500 font-semibold">Division Track:</span>
                <span className="text-slate-800 dark:text-slate-200 print:text-slate-900 font-bold">Computer Science & Engineering</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-semibold">Focus Module:</span>
                <span className="text-slate-800 dark:text-slate-200 print:text-slate-900 font-bold">Applied Artificial Intelligence</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 print:text-slate-900 flex items-center gap-2 border-b border-slate-150 dark:border-slate-850 pb-2">
              <BarChart2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> 1. Metrics & Objectives Summary
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-slate-950/25 print:bg-slate-50 border border-slate-200 dark:border-slate-900/40 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.005)]">
                <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">Certified Modules</span>
                <p className="text-xl font-extrabold text-slate-855 dark:text-slate-200 print:text-slate-950 mt-1">8 / 12</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-950/25 print:bg-slate-50 border border-slate-200 dark:border-slate-900/40 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.005)]">
                <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">Operational Hours</span>
                <p className="text-xl font-extrabold text-slate-850 dark:text-slate-200 print:text-slate-950 mt-1">240 Hours</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-950/25 print:bg-slate-50 border border-slate-200 dark:border-slate-900/40 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.005)]">
                <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">Performance Average</span>
                <p className="text-xl font-extrabold text-slate-850 dark:text-slate-200 print:text-slate-950 mt-1">72%</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 print:text-slate-900 flex items-center gap-2 border-b border-slate-150 dark:border-slate-850 pb-2">
              <Award className="h-4 w-4 text-emerald-650 dark:text-emerald-400" /> 2. Competency Analysis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-700 dark:text-slate-350 print:text-slate-800">Identified Strengths</h5>
                <div className="space-y-2">
                  {strengths.map((str) => (
                    <div key={str.name} className="flex justify-between items-center text-xs p-2 bg-white dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/10 rounded-lg">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 print:text-slate-800">{str.name}</span>
                      <span className="font-bold font-mono text-emerald-600 dark:text-emerald-450 print:text-emerald-700">{str.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-700 dark:text-slate-350 print:text-slate-800">Target Competency Areas</h5>
                <div className="space-y-2">
                  {weaknesses.map((wk) => (
                    <div key={wk.name} className="flex justify-between items-center text-xs p-2 bg-white dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/10 rounded-lg">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 print:text-slate-800">{wk.name}</span>
                      <span className="font-bold font-mono text-rose-600 dark:text-rose-455 print:text-rose-700">{wk.score}%</span>
                    </div>
                  ))}
                  {weaknesses.length === 0 && (
                    <div className="text-xs text-slate-400 dark:text-slate-500 py-3 text-center border border-dashed border-slate-200 dark:border-slate-850 rounded-xl font-mono">No target deficits identified.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 print:text-slate-900 flex items-center gap-2 border-b border-slate-150 dark:border-slate-850 pb-2">
              <Info className="h-4 w-4 text-cyan-600 dark:text-cyan-400" /> 3. Prescribed Interventions
            </h4>
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="p-3.5 bg-white dark:bg-slate-950/20 print:bg-slate-50 border border-slate-200/80 dark:border-slate-900/50 print:border-slate-200 rounded-xl flex items-start gap-3 shadow-[0_2px_4px_rgba(0,0,0,0.005)]">
                  <CheckCircle2 className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 print:text-slate-900">{rec.title}</h5>
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 print:text-slate-650 mt-1.5 leading-relaxed">{rec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 pt-12 border-t border-slate-200 dark:border-slate-850 print:border-slate-350 text-center text-slate-400 dark:text-slate-500 text-[10px] font-mono select-none">
            <div className="flex flex-col items-center">
              <div className="w-40 border-b border-slate-200 dark:border-slate-800 print:border-slate-300 h-8"></div>
              <span className="mt-2 font-bold">Evaluator Signature</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-40 border-b border-slate-200 dark:border-slate-800 print:border-slate-300 h-8"></div>
              <span className="mt-2 font-bold">Academic Board Director</span>
            </div>
          </div>
        </div>
      </div>
    </Page3D>
  );
}
