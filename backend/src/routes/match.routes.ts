// match.routes.ts

import { Router } from 'express';
import { getMatchesForAdopter } from '../controllers/match.controller';

const router = Router();

router.get('/adopters/:id/matches', getMatchesForAdopter);

export default router;