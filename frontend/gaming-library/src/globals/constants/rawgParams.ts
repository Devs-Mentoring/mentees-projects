import { GameParams } from "../types/rawgTypes";
import { formatParams } from "../functions/rawgApi";
import { getCurrentDay, getCurrentMonth } from "../functions/helpers";

export const initialFromDate = new Date("1985");
export const currentDate = new Date();
export const currentYear = currentDate.getFullYear();
export const currentMonth = getCurrentMonth();
export const currentDay = getCurrentDay();
export const currentFormattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
// const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-12-31`;

const best_games: Partial<GameParams> = {
  ordering: "-rating",
  metacritic: "90,100",
  dates: `1990,${currentFormattedDate}`,
};

const latest_releases: Partial<GameParams> = {
  ordering: "-released",
  metacritic: "30,100",
};

const upcoming_games: Partial<GameParams> = {
  ordering: "-added",
  dates: `${currentFormattedDate},${nextYear}`,
};

export const genres = {
  action: "action",
  indie: "indie",
  racing: "racing",
  adventure: "adventure",
  RPG: "role-playing-games-rpg",
  strategy: "strategy",
  shooter: "shooter",
  casual: "casual",
  simulation: "simulation",
  puzzle: "puzzle",
  arcade: "arcade",
  platformer: "platformer",
  mmo: "massively-multiplayer",
  sports: "sports",
  fighting: "fighting",
  family: "family",
  board: "board-games",
  educational: "educational",
  card: "card",
};

export const platform = {
  PC: "pc",
  "Playstation 5": "playstation5",
  "Xbox One": "xbox-one",
  "Playstation 4": "playstation4",
  "Xbox Series X": "xbox-series-x",
  "Nintendo Switch": "nintendo-switch",
  iOS: "ios",
  Android: "android",
  "Nintendo 3DS": "nintendo-3ds",
  "Nintendo DS": "nintendo-ds",
  "Nintendo DSi": "nintendo-dsi",
  macOS: "macos",
  Linux: "linux",
  "Xbox 360": "xbox360",
  Xbox: "xbox-old",
  "Playstation 3": "playstation3",
  "Playstation 2": "playstation2",
  Playstation: "playstation1",
  "PS-Vita": "ps-vita",
  PSP: "psp",
  "Wii U": "wii-u",
  Wii: "wii",
  GameCube: "game-cube",
  "Nintendo 64": "nintendo-64",
  "Game Boy Advance": "game-boy-advance",
  "Game Boy Color": "game-boy-color",
  "Game Boy": "game-boy",
  SNES: "snes",
  "3D0": "3do",
  Dreamcast: "dreamcast",
  "Sega Master System": "sega-master-system",
  "Sega 32X": "sega-32x",
  "Sega CD": "sega-cd",
};

export const publishers = {
  "CD PROJEKT RED": "cd-projekt-red",
  "Sony Computer Entertainment": "sony-computer-entertainment",
  "Activision Blizzard": "activision-blizzard",
  "Electronic Arts": "electronic-arts",
  "Square Enix": "square-enix",
  "Bethesda Softworks": "bethesda-softworks",
  "Ubisoft Entertainment": "ubisoft-entertainment",
  "Microsoft Studios": "microsoft-studios",
  Nintendo: "nintendo",
  Valve: "valve",
  SEGA: "sega-2",
  "2K Games": "2k-games",
  "Feral Interactive": "feral-interactive",
  Capcom: "capcom",
  Konami: "konami",
  "Bandai Namco Entertainment": "bandai-namco-entertainment",
};

export const rawgParams = {
  "Best Games": formatParams(best_games),
  "Latest Releases": formatParams(latest_releases),
  "Upcoming Games": formatParams(upcoming_games),
};
