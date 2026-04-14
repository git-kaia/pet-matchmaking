import { getAdopterById } from '../models/adopter/adopter.repository';
import { getAllBirds } from '../models/bird/bird.repository';
import { saveMatch, saveMatchRuleResults } from '../models/match/match.repository';

import { matchingEngine } from '../matching/matchingEngine';

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