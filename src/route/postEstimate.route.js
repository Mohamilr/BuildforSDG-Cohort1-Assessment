import { Router } from 'express';
import postEstimate from '../controller/postEstimate';

const router = Router();

router.post('/on-covid-19', postEstimate);

export default router;