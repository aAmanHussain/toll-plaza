import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import { router } from './app/routes';
import { HttpCodes } from './models';

(() => {
  try {
    config();
    const PORT = process.env.PORT || 8000;

    const app = express();
    app.use('/api/', router);
    app.use('**', (req, res, next) =>
      res.redirect(`/api/error/${HttpCodes.notFound}`)
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.set('port', PORT);
    app.listen(app.get('port'), () =>
      console.log(`Server started on PORT: ${PORT}`)
    );

    process.on('uncaughtException', ex => {
      console.error(
        'Error uncaughtException!',
        ex
      );
    });
    process.on('unhandledRejection', ex => {
      console.error(
        'Error unhandledRejection!',
        ex
      );
    });
  } catch (ex) {
    console.error(`Exception: `, ex);
  }
})();
