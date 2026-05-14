// adopter.service.ts
/**
 * Adopter Service (Application Layer)
 *
 * Responsible for handling adopter-related use cases.
 * Acts as a bridge between controllers and the data layer (repository).
 *
 * Current responsibilities:
 * - Fetch adopter data from the database
 *
 * Future responsibilities (optional):
 * - Validate adopter input
 * - Transform quiz data into domain model
 * - Handle adopter creation/update logic
 *
 * Note:
 * This service contains no matching logic.
 */
import { getAllAdopters, getAdopterById } from '../../infrastructure/repositories/adopter.repository';
import { Adopter } from '../../domain/entities/adopter';

export const getAdopterByIdService = async (
    id: string
): Promise<Adopter | null> => {
    return await getAdopterById(id);
};

export const getAllAdoptersService = async (): Promise<Adopter[]> => {
    return await getAllAdopters();
};


