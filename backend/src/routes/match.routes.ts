// match.routes.ts

import { Router } from 'express';
import { getMatchesForAdopter } from '../controllers/match.controller';

const router = Router();

router.get('/:id/matches', getMatchesForAdopter);

export default router;