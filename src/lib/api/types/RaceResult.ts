import type { Constructor } from './Constructor';
import type { Driver } from './Driver';

type Time = {
  millis: string | undefined;
  time: string;
};

type AverageSpeed = {
  units: string;
  speed: string;
};

type FastestLap = {
  rank: string;
  lap: string;
  Time: Time;
  AverageSpeed: AverageSpeed;
};

export type RaceResult = {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: Time;
  FastestLap: FastestLap;
};
