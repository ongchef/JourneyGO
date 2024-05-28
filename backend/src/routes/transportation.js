import express from 'express'
import { getTransportation } from '../controllers/transportation.js';

const router = express.Router();
router.get("/:groupId/:day", getTransportation);

export default router