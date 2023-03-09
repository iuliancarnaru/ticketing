import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().normalizeEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .escape()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    console.log('Creating user....');

    res.send({});
  }
);

export { router as signupRouter };
