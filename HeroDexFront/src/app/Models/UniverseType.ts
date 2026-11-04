export enum UniverseType {
  Marvel = 0,
  DC = 1,
  Watchmen = 2,
  Invincible = 3,
  TheBoys = 4,
  DarkHorse = 5,
  ImageComics = 6,
  Valiant = 7,
  Other = 8
}

export const UniverseTypeLabel: Record<UniverseType, string> = {
  [UniverseType.Marvel]: 'Marvel',
  [UniverseType.DC]: 'DC',
  [UniverseType.Watchmen]: 'Watchmen',
  [UniverseType.Invincible]: 'Invincible',
  [UniverseType.TheBoys]: 'The Boys',
  [UniverseType.DarkHorse]: 'Dark Horse',
  [UniverseType.ImageComics]: 'Image Comics',
  [UniverseType.Valiant]: 'Valiant',
  [UniverseType.Other]: 'Otro'
};