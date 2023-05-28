import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';

export async function getActivitiesRooms(req: AuthenticatedRequest, res: Response) {
  try {
    const activitiesRooms = await activitiesService.getActivitiesRooms();
    return res.status(httpStatus.OK).send(activitiesRooms);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.getActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function postActivityEnrollment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.body;
  const { activityId } = req.body;
  try {
    console.log(ticketId, activityId);
    const enrollment = await activitiesService.postActivityEnrollment(ticketId, activityId);
    return res.status(httpStatus.OK).send(enrollment);
  } catch (error) {
    return res.sendStatus(500);
  }
}
