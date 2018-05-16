import { Router } from 'express';
import HelloWorldController from './helloworld-controller';

const router = Router();

router.get('/hello', HelloWorldController.get);

export default router;