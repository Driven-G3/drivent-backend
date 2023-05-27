import { Activity, ActivityRoom } from '@prisma/client';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesRooms(): Promise<ActivityRoom[]> {
  return activitiesRepository.getActivitiesRooms();
}

async function getActivities(): Promise<Activity[]> {
  return activitiesRepository.getActivities();
}

const activitiesService = {
  getActivitiesRooms,
  getActivities,
};

export default activitiesService;
