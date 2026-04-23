import { getAdopterById } from '../infrastructure/repositories/adopter.repository';
import { getAllBirds } from '../infrastructure/repositories/bird.repository';
import { saveMatch, saveMatchRuleResults } from '../infrastructure/repositories/match.repository';

import { matchingEngine } from '../services/matching/matchingEngine';

export const getMatches = async (req, res) => {
  const adopter = await getAdopterById(req.params.id);
  const birds = await getAllBirds();

  if (!adopter) {
    return res.status(404).json({ error: 'Adopter not found' });
  }

  const results = [];

  for (const bird of birds) {
    const match = matchingEngine(adopter, bird);

    const matchId = await saveMatch(adopter.id, bird.id, match.score);

    if (match.rules) {
      await saveMatchRuleResults(matchId, match.rules);
    }

    results.push({
      birdId: bird.id,
      score: match.score
    });
  }

  res.json(results);
};