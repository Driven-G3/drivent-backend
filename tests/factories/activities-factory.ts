import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import { Activity, ActivityEnrollment, ActivityRoom } from '@prisma/client';
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

export async function listActivityRoom() {
  const response: ActivityRoom[] = [
    {
      id: 1,
      name: 'Room 1',
    },
  ];
  return response;
}

export async function listActivity() {
  const response: Activity[] = [
    {
      id: 1,
      eventId: 1,
      title: 'Room 1',
      startsAt: new Date(),
      endsAt: new Date(),
      locatedAtId: 1,
      capacity: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  return response;
}

export async function listActivityEnrollment() {
  const response: ActivityEnrollment = {
    id: 1,
    ticketId: 1,
    activityId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return response;
}
