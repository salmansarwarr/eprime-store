import express from 'express';

import { signIn } from '../controllers/admin.js';

const router = express.Router();

router.post('/', signIn);

export default router;