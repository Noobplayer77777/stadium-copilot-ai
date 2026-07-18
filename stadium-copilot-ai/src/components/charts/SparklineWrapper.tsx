'use client';

import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface SparklineWrapperProps {
  data: Array<{ value: number }>;
  color?: string;
  height?: number;
  className?: string;
  trend?: 'up' | 'down' | 'flat';
}

export function SparklineWrapper({
  data,
  color,
  height = 48,
  className,
  trend,
}: SparklineWrapperProps) {
  const trendColor = trend === 'up' ? '#22C55E' : trend === 'down' ? '#EF4444' : '#8B97B8';
  const resolvedColor = color ?? trendColor;

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={resolvedColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={resolvedColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{ fontSize: 11, background: 'rgb(13,18,32)', border: '1px solid rgb(42,51,80)', borderRadius: 6 }}
            itemStyle={{ color: 'rgb(240,244,255)' }}
            labelStyle={{ display: 'none' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={resolvedColor}
            fill="url(#sparkGradient)"
            strokeWidth={1.5}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
