import { Router } from 'express';
import AppsController from './controllers/appsController';
const router = new Router(),
      appsController = new AppsController();

// Experiences
router.get('/test', appsController.show);

export default router;
