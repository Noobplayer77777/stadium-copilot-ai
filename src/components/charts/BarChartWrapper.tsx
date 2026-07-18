'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { cn } from '@/lib/utils';

interface DataItem {
  name: string;
  [key: string]: string | number;
}

interface BarSeries {
  dataKey: string;
  color?: string;
  name?: string;
}

interface BarChartWrapperProps {
  data: DataItem[];
  series: BarSeries[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
}

export function BarChartWrapper({
  data,
  series,
  height = 300,
  className,
  showGrid = true,
  showLegend = false,
}: BarChartWrapperProps) {
  const defaultColors = ['#0033A0', '#00D4B4', '#D4002B', '#FFD700', '#6366F1'];

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />
          )}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: 'rgb(139, 151, 184)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'rgb(139, 151, 184)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(13, 18, 32)',
              border: '1px solid rgb(42, 51, 80)',
              borderRadius: '8px',
              fontSize: 12,
              color: 'rgb(240, 244, 255)',
            }}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {series.map((s, i) => (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              name={s.name ?? s.dataKey}
              fill={s.color ?? defaultColors[i % defaultColors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
