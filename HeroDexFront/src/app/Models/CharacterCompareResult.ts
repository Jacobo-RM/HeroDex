export interface CharacterCompareResult {
  id: number;
  name: string;
  image: string;
  universeStatus: 'Correct' | 'Incorrect';
  universeValue: string;
  characterTypeStatus: 'Correct' | 'Incorrect';
  characterTypeValue: string;
  publisherStatus: 'Correct' | 'Incorrect';
  publisherValue: string;
  isAliveStatus: 'Correct' | 'Incorrect';
  isAliveValue: string;
  powersStatus: 'Correct' | 'Partial' | 'Incorrect';
  powersValue: string;
  teamsStatus: 'Correct' | 'Partial' | 'Incorrect';
  teamsValue: string;
}