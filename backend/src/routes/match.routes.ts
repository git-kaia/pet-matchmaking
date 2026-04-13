// router.post("/match", matchController.getMatches); - EKSEMPEL

import express from 'express';
import { getMatches } from '../controllers/match.controller';

const router = express.Router();

// GET to retrieving matches
router.get('/matches/:id', getMatches);

export default router;