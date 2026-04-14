import express from 'express';
import { getAdopter, createAdopter } from '../controllers/adopter.controller';

const router = express.Router();

router.get('/adopters/:id', getAdopter);
router.post('/adopters', createAdopter);

export default router;

