import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';

export async function getActivitiesRooms(req: AuthenticatedRequest, res: Response) {
  try {
    const activitiesRooms = await activitiesService.getActivitiesRooms();
    return res.send(activitiesRooms);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.getActivities();
    return res.send(activities);
  } catch (error) {
    return res.sendStatus(500);
  }
}
