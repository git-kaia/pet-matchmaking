// domain/entities/bird.ts

import { Level } from '../types/common.types'
import { Pet } from './pet';

export interface Bird extends Pet {
    animalType: 'bird';

    requiresBirdPartner: boolean;
    sleepNeed?: Level;
    flightNeed?: Level;
}