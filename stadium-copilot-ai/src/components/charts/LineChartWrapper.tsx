'use client';

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Area, AreaChart,
} from 'recharts';
import { cn } from '@/lib/utils';

interface DataItem {
  name: string;
  [key: string]: string | number;
}

interface LineSeries {
  dataKey: string;
  color?: string;
  name?: string;
}

interface LineChartWrapperProps {
  data: DataItem[];
  series: LineSeries[];
  height?: number;
  className?: string;
  area?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
}

export function LineChartWrapper({
  data,
  series,
  height = 300,
  className,
  area = false,
  showGrid = true,
  showLegend = false,
}: LineChartWrapperProps) {
  const defaultColors = ['#00D4B4', '#0033A0', '#D4002B', '#FFD700'];
  const ChartComponent = area ? AreaChart : LineChart;

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <defs>
            {series.map((s, i) => {
              const color = s.color ?? defaultColors[i % defaultColors.length];
              return (
                <linearGradient key={s.dataKey} id={`gradient-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              );
            })}
          </defs>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          )}
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'rgb(139, 151, 184)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'rgb(139, 151, 184)' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(13, 18, 32)',
              border: '1px solid rgb(42, 51, 80)',
              borderRadius: '8px',
              fontSize: 12,
              color: 'rgb(240, 244, 255)',
            }}
          />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {series.map((s, i) => {
            const color = s.color ?? defaultColors[i % defaultColors.length];
            if (area) {
              return (
                <Area
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  stroke={color}
                  fill={`url(#gradient-${s.dataKey})`}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: color }}
                />
              );
            }
            return (
              <Line
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name ?? s.dataKey}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: color }}
              />
            );
          })}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}
