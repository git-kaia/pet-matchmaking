// pet.controller.ts

import { Request, Response } from 'express';
import { getAllPets, getPetByIdService } from '../services/application/pet.service';

type Params = {
  id: string;
};

export const getPets = async (req: Request, res: Response) => {
  try {
    const pets = await getAllPets();
    return res.json(pets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPet = async (
  req: Request<Params>,
  res: Response
) => {
  try {
    const pet = await getPetByIdService(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    return res.json(pet);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};