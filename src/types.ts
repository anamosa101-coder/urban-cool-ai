import React from 'react';

export interface User {
  id: string;
  name: string;
  role: string;
  clearance: string;
}

export interface HeatMetric {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'optimal' | 'critical' | 'moderate';
  icon: React.ReactNode;
}

export interface Alert {
  id: string;
  trigger: string;
  severity: 'critical' | 'moderate' | 'low';
  timestamp: string;
  status: 'resolved' | 'active' | 'scheduled' | 'deploying';
}

export interface Hotspot {
  id: string;
  name: string;
  type: string;
  temp: number;
  risk: number;
}
