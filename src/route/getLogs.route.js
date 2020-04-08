import { Router } from 'express';
import getLogs from '../controller/getLogs';

const router = Router();

router.get('/on-covid-19/logs', getLogs);

export default router;