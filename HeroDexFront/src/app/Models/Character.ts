import { CharacterType } from "./CharacterType";
import { Power } from "./Power";
import { Team } from "./Team";
import { UniverseType } from "./UniverseType";

export interface Character {
  id: number;
  name: string;
  realName: string;
  description: string;
  universe: UniverseType;
  characterType: CharacterType;
  image: string;
  video: string;
  logo: string;
  firstAppearance: string;
  publisher: string;
  teams: Team[];
  powers: Power[];
  banner: string;
  isAlive: boolean;
  occupation: string;
  baseOfOperations: string;
  aliases: string[];
}