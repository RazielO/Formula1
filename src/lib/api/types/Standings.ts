import type { ConstructorStanding } from './ConstructorStanding';
import type { DriverStanding } from './DriverStanding';

export type StandingsTable = {
  season: string;
  round: string;
  StandingsLists: StandingsLists[];
};

export type StandingsLists = {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
  ConstructorStandings: ConstructorStanding[];
};
