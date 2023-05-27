import { Activity, ActivityEnrollment, ActivityRoom } from '@prisma/client';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesRooms(): Promise<ActivityRoom[]> {
  return activitiesRepository.getActivitiesRooms();
}

async function getActivities(): Promise<Activity[]> {
  return activitiesRepository.getActivities();
}

async function postActivityEnrollment(ticketId: number, activityId: number) {
  return activitiesRepository.insertActivityEnrollment(ticketId, activityId);
}

const activitiesService = {
  getActivitiesRooms,
  getActivities,
  postActivityEnrollment,
};

export default activitiesService;
