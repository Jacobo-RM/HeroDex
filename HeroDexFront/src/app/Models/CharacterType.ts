export enum CharacterType {
  Hero = 0,
  AntiHero = 1,
  Vigilante = 2,
  Villain = 3,
  AntiVillain = 4,
  Mercenary = 5,
  Neutral = 6,
  Creature = 7,
  God = 8,
  CosmicEntity = 9
}

export const CharacterTypeLabel: Record<CharacterType, string> = {
  [CharacterType.Hero]: 'Héroe',
  [CharacterType.AntiHero]: 'Antihéroe',
  [CharacterType.Vigilante]: 'Vigilante',
  [CharacterType.Villain]: 'Villano',
  [CharacterType.AntiVillain]: 'Antivillano',
  [CharacterType.Mercenary]: 'Mercenario',
  [CharacterType.Neutral]: 'Neutral',
  [CharacterType.Creature]: 'Criatura',
  [CharacterType.God]: 'Dios',
  [CharacterType.CosmicEntity]: 'Entidad cósmica'
};