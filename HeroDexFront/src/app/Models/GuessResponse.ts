import { CharacterCompareResult } from "./CharacterCompareResult";

export interface GuessResponse {
  hasWon: boolean;
  results: CharacterCompareResult;
}