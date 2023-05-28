import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import { prisma } from '@/config';

export async function createActivity(roomId: number) {
  return await prisma.activity.create({
    data: {
      eventId: 1,
      title: faker.lorem.sentence(),
      startsAt: dayjs().subtract(1, 'day').toDate(),
      endsAt: dayjs().subtract(1, 'day').toDate(),
      locatedAtId: roomId,
      capacity: 15,
    },
    include: {
      Enrollment: true,
    },
  });
}

export async function createActivityRooms() {
  return await prisma.activityRoom.create({
    data: {
      name: faker.lorem.sentence(),
    },
  });
}

export async function createActivityEnrollment(ticketId: number, activityId: number) {
  return await prisma.activityEnrollment.create({
    data: {
      ticketId,
      activityId,
    },
  });
}
