import { Router, Request, Response, NextFunction } from 'express';

import { TollService } from './../../services/toll';
import { HttpCodes } from './../../../models/http-codes.model';

export const router = Router();
const tollService = new TollService();

router.get(
  '/health-check',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(HttpCodes.ok).json({
        result: null,
        message: 'Toll Router health check is working fine'
      });
    } catch ({ status, message }) {
      return res.status(status).json({
        result: null,
        message
      });
    }
  }
);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, result, message } = await tollService.getTollList();
    return res.status(status).json({
      result,
      message
    });
  } catch ({ status, message }) {
    return res.status(status).json({
      result: null,
      message
    });
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, result, message } = await tollService.getTollDetails(req.params.id);
    return res.status(status).json({
      result,
      message
    });
  } catch ({ status, message }) {
    return res.status(status).json({
      result: null,
      message
    });
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(`BODY: `, req.body);
    if (!req.body) {
      return res.status(HttpCodes.badRequest).json({
        result: null,
        message: 'Bad request'
      });
    }
    const { status, result, message } = await tollService.saveToll(req.body);
    return res.status(status).json({
      result,
      message
    });
  } catch ({ status, message }) {
    return res.status(status).json({
      result: null,
      message
    });
  }
});

/**
 * Route to update a TOLL Ticket
 */
router.patch(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = 200;
      const message = 'Hello';
      return res.status(status).json({
        result: null,
        message
      });
    } catch ({ status, message }) {
      return res.status(status).json({
        result: null,
        message
      });
    }
  }
);

/**
 * Route to delete a TOLL Ticket
 */
router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = 200;
      const message = 'Hello';
      return res.status(status).json({
        result: null,
        message
      });
    } catch ({ status, message }) {
      return res.status(status).json({
        result: null,
        message
      });
    }
  }
);

router.get('/toll-exists/:registrationNumber', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, result, message } = await tollService.getTollDetailsByRegistrationNumber(req.params.registrationNumber);
    return res.status(status).json({
      result,
      message
    });
  } catch ({ status, message }) {
    return res.status(status).json({
      result: null,
      message
    });
  }
});