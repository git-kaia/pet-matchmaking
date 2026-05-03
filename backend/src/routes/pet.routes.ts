// pet.routes.ts

import { Router } from 'express';
import { getPets, getPet } from '../controllers/pet.controller';

const router = Router();

router.get('/pets', getPets);
router.get('/pets/:id', getPet);

export default router;