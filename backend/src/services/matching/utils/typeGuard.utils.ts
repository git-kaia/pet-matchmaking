// typeGuard.utils.ts
import { Pet } from '../../../domain/entities/pet';
import { Bird } from '../../../domain/entities/bird';

export const isBird = (pet: Pet): pet is Bird =>
  pet.animalType === 'bird';