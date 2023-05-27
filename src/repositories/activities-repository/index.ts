import { Activity, ActivityRoom } from '@prisma/client';
import { prisma } from '@/config';

async function getActivitiesRooms(): Promise<ActivityRoom[]> {
  return prisma.activityRoom.findMany();
}

async function getActivities(): Promise<Activity[]> {
  return prisma.activity.findMany();
}

const activitiesRepository = {
  getActivitiesRooms,
  getActivities,
};

export default activitiesRepository;
