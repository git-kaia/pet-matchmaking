// adopter.routes.ts

import express from 'express';
import { getAdopter } from '../controllers/adopter.controller';

const router = express.Router();

router.get('/:id', getAdopter);
// router.post('/adopters', createAdopter);

export default router;

