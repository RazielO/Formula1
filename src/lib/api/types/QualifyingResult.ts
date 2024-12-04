import type { Constructor } from './Constructor';
import type { Driver } from './Driver';

export type QualifyingResult = {
  number: string;
  position: string;
  Driver: Driver;
  Constructor: Constructor;
  Q1: string | undefined;
  Q2: string | undefined;
  Q3: string | undefined;
};
