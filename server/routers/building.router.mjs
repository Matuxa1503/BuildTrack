import express from 'express';
import { getBuildingByLink, getLastBuilding, processNewBuildings } from '../controllers/building.controller.mjs';

const router = express.Router();

router.get('/proc', processNewBuildings);
router.get('/item/:link', getBuildingByLink);
router.get('/last', getLastBuilding);

export default router;
