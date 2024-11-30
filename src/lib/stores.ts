import { writable, type Writable } from "svelte/store";
import type { Race } from "./api/types/Races";

export const darkMode: Writable<boolean> = writable(false);
export const seasonSelected: Writable<number> = writable();
export const startSeason: Writable<number> = writable();
export const rounds: Writable<{ [key: number]: Race[] }> = writable({});