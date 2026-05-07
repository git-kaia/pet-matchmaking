// pet.routes.ts

import { Router } from 'express';
import { getPets, getPet } from '../controllers/pet.controller';

const router = Router();

router.get('/', getPets);
router.get('/:id', getPet);

export default router;