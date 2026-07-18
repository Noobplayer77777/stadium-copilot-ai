'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

interface DonutSlice {
  name: string;
  value: number;
  color?: string;
}

interface DonutChartWrapperProps {
  data: DonutSlice[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  className?: string;
  showLegend?: boolean;
  centerLabel?: string;
  centerValue?: string;
}

const DEFAULT_COLORS = ['#0033A0', '#00D4B4', '#D4002B', '#FFD700', '#6366F1', '#10B981'];

export function DonutChartWrapper({
  data,
  height = 260,
  innerRadius = 60,
  outerRadius = 90,
  className,
  showLegend = true,
  centerLabel,
  centerValue,
}: DonutChartWrapperProps) {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(13, 18, 32)',
              border: '1px solid rgb(42, 51, 80)',
              borderRadius: '8px',
              fontSize: 12,
              color: 'rgb(240, 244, 255)',
            }}
            formatter={(value) => [`${value ?? 0}%`, '']}
          />
          {showLegend && (
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, color: 'rgb(139, 151, 184)' }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <p className="text-2xl font-bold">{centerValue}</p>}
          {centerLabel && <p className="text-xs text-[rgb(var(--muted-foreground))]">{centerLabel}</p>}
        </div>
      )}
    </div>
  );
}
