import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import {
  createEnrollmentWithAddress,
  createUser,
  createTicket,
  createPayment,
  createTicketTypeWithHotel,
  createHotel,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { createActivity, createActivityEnrollment, createActivityRooms } from '../factories/activities-factory';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /activities', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activities');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 with activities ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const activitieRoom = await createActivityRooms();
      const activities = await createActivity(activitieRoom.id);

      const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});

describe('GET /activities/rooms', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activities/rooms');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activities/rooms').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activities/rooms').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 with activities ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const activitieRoom = await createActivityRooms();
      const activities = await createActivity(activitieRoom.id);

      const response = await server.get('/activities/rooms').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});

describe('POST /activities/enrollment', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/activities/enrollment');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/activities/enrollment').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/activities/enrollment').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 with enrollment', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const activitieRoom = await createActivityRooms();
      const activities = await createActivity(activitieRoom.id);
      const activitiesEnrollment = await createActivityEnrollment(ticket.id, activities.id);
      const body = {
        ticketId: ticket.id,
        activityId: activities.id,
      };
      const response = await server.post('/activities/enrollment').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});
