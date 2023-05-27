import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getActivitiesRooms, getActivities } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.all('*', authenticateToken);
activitiesRouter.get('/rooms', getActivitiesRooms);
activitiesRouter.get('/', getActivities);

export { activitiesRouter };
