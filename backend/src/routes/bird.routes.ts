import express from 'express';
import { getBirds } from '../controllers/bird.controller';

const router = express.Router();

router.get('/', getBirds);

export default router;