
// Fix: Added React import to provide access to the React namespace for React.ReactNode
import React from 'react';

export interface ServiceStep {
  id: string;
  title: string;
  target: string;
  points: string[];
}

export interface Advantage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Platform {
  name: string;
  description: string;
  logoUrl: string;
}
