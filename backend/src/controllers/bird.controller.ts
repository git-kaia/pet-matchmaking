import { getAllBirds } from '../models/bird/bird.repository';

export const getBirds = async (req, res) => {
  try {
    const birds = await getAllBirds();
    res.json(birds);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch birds' });
  }
};