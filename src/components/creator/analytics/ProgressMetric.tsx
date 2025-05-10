
import React from 'react';

interface ProgressMetricProps {
  label: string;
  value: string;
  progress: number;
  color: string;
}

const ProgressMetric = ({ label, value, progress, color }: ProgressMetricProps) => (
  <div className="pb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
    <div className="w-full bg-black/20 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

export default ProgressMetric;
