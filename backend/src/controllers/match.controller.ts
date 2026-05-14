// match.controller.ts

import { Request, Response } from 'express';

import { getAdopterByIdService } from '../services/application/adopter.service';
import { getAllPets } from '../services/application/pet.service';
import { matchAdopterWithPets } from '../services/application/match.service';

import { generateMatchFeedback } from '../services/matching/feedback/matchFeedback.service';

type Params = {
  id: string;
};

export const getMatchesForAdopter = async (
  req: Request<Params>,
  res: Response
) => {
  try {
    const adopterId = req.params.id;

    const adopter = await getAdopterByIdService(adopterId);

    if (!adopter) {
      return res.status(404).json({ message: 'Adopter not found' });
    }

    const pets = await getAllPets();
    const matches = await matchAdopterWithPets(adopter, pets);

    const response = matches.map((m) => ({
      petId: m.petId,
      percentage: m.percentage,
      score: m.score,
      feedback: generateMatchFeedback(m),
    }));

    return res.json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};