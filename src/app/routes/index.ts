import { HttpCodes } from './../../models/http-codes.model';
import { Router } from 'express';

import { router as errorRouter } from './error';
import { router as tollRouter } from './toll';

export { errorRouter, tollRouter };

const router = Router();

router.use('/toll/', tollRouter);
router.use('/error/', errorRouter);
router.use('/**', (req, res) => res.redirect(`/api/error/${HttpCodes.notFound}`));

export { router }