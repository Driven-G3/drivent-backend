import { Activity, ActivityRoom, ActivityEnrollment } from '@prisma/client';
import { prisma } from '@/config';

async function getActivitiesRooms(): Promise<ActivityRoom[]> {
  return prisma.activityRoom.findMany();
}

async function getActivities(): Promise<Activity[]> {
  return prisma.activity.findMany({
    include: {
      Enrollment: {},
    },
  });
}

async function insertActivityEnrollment(ticketId: any, activityId: any) {
  return await prisma.activityEnrollment.create({
    data: {
      ticketId,
      activityId,
    },
  });
}

const activitiesRepository = {
  getActivitiesRooms,
  getActivities,
  insertActivityEnrollment,
};

export default activitiesRepository;
