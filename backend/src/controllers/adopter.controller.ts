import { getAdopterById } from '../models/adopter.repository';

export const getAdopter = async (req, res) => {
  const adopter = await getAdopterById(req.params.id);

  if (!adopter) {
    return res.status(404).json({ error: 'Adopter not found' });
  }

  res.json(adopter);
};