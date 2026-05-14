// adopter.controller.ts

import { Request, Response } from 'express';
import { getAdopterByIdService } from '../services/application/adopter.service';

type Params = {
  id: string;
};

export const getAdopter = async (
  req: Request<Params>,
  res: Response
) => {
  try {
    const adopter = await getAdopterByIdService(req.params.id);

    if (!adopter) {
      return res.status(404).json({ error: 'Adopter not found' });
    }

    return res.json(adopter);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};