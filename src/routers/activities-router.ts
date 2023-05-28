import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getActivitiesRooms, getActivities, postActivityEnrollment } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.all('*', authenticateToken);
activitiesRouter.get('/rooms', getActivitiesRooms);
activitiesRouter.get('/', getActivities);
activitiesRouter.post('/enrollment', postActivityEnrollment);

export { activitiesRouter };
