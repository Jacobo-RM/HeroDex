import { UniverseType } from "./UniverseType";

export const UniverseLogo: Record<UniverseType, string> = {
  [UniverseType.Marvel]: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/3840px-Marvel_Logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail',
  [UniverseType.DC]: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/960px-DC_Comics_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail',
  [UniverseType.Watchmen]: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Watchmen_logo.svg?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=original',
  [UniverseType.Invincible]: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Invincible_comic_series_logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
  [UniverseType.TheBoys]: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/The_Boys_TV_series_logo.png?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=original',
  [UniverseType.DarkHorse]: '/universes/dark-horse.png',
  [UniverseType.ImageComics]: '/universes/image-comics.png',
  [UniverseType.Valiant]: '/universes/valiant.png',
  [UniverseType.Other]: '/universes/other.png',
};