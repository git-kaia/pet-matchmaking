// pet.service.ts
/**
 * Pet Service (Application Layer)
 *
 * Responsible for retrieving pet data used in the matching process.
 *
 * Responsibilities:
 * - Fetch pets from the database (optionally filtered by species/type)
 * - Provide domain-ready pet objects to the matching system
 *
 * Note:
 * This service does not contain matching logic or rules.
 * It strictly handles data access coordination.
 */
import { getAllBirds } from '../../infrastructure/repositories/bird.repository';
import { getBirdById } from '../../infrastructure/repositories/bird.repository';

import { Pet } from '../../domain/entities/pet';

export const getAllPets = async (): Promise<Pet[]> => {
    const birds = await getAllBirds();

    // since Bird extends Pet → no mapping needed
    return birds;
};

export const getPetByIdService = async (id: string) => {
    return await getBirdById(id);
};