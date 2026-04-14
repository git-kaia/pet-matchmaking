import { getAdopterById } from '../models/adopter/adopter.repository';
import { saveAdopter } from '../models/adopter/adopter.repository';
import { normalizeQuizToAdopter } from '../services/adopter.service';


export const getAdopter = async (req, res) => {
  const adopter = await getAdopterById(req.params.id);

  if (!adopter) {
    return res.status(404).json({ error: 'Adopter not found' });
  }

  res.json(adopter);
};

export const createAdopter = async (req, res) => {
  const adopter = normalizeQuizToAdopter(req.body);

  await saveAdopter(adopter);

  res.status(201).json(adopter);
};