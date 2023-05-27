import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  let ticketType = await prisma.ticketType.findFirst();
  let hotel = await prisma.hotel.findFirst();
  let room = await prisma.room.findFirst();
  let activityRoom = await prisma.activityRoom.findFirst();
  let activity = await prisma.activity.findFirst();
  // let activityEnrollment = await prisma.activityEnrollment.findFirst()

  if (!activityRoom) {
    await prisma.activityRoom.createMany({
      data: [
        {
          name: 'Sala de jogos',
        },
        {
          name: 'Sala de montagem',
        },
        {
          name: 'Auditório',
        },
      ],
    });
  }

  if (!activity) {
    await prisma.activity.createMany({
      data: [
        {
          title: 'Campeonato de League of Legends',
          capacity: 40,
          startsAt: new Date('2023-06-01 09:00'),
          endsAt: new Date('2023-06-01 13:00'),
          locatedAtId: 1,
          eventId: 1,
        },
        {
          title: 'Campeonato de Forza',
          capacity: 20,
          startsAt: new Date('2023-06-01 13:00'),
          endsAt: new Date('2023-06-01 14:00'),
          locatedAtId: 1,
          eventId: 1,
        },
        {
          title: 'Jogue o que quiser',
          capacity: 35,
          startsAt: new Date('2023-06-01 14:00'),
          endsAt: new Date('2023-06-01 17:00'),
          locatedAtId: 1,
          eventId: 1,
        },
        {
          title: 'League of Legends: montando o PC ideal',
          capacity: 15,
          startsAt: new Date('2023-06-01 9:00'),
          endsAt: new Date('2023-06-01 10:00'),
          locatedAtId: 2,
          eventId: 1,
        },
        {
          title: 'Overclocking de CPU e GPU: aprenda hoje',
          capacity: 15,
          startsAt: new Date('2023-06-01 10:00'),
          endsAt: new Date('2023-06-01 11:30'),
          locatedAtId: 2,
          eventId: 1,
        },
        {
          title: 'Vue js 3: O fim do React?',
          capacity: 15,
          startsAt: new Date('2023-06-01 13:00'),
          endsAt: new Date('2023-06-01 14:00'),
          locatedAtId: 3,
          eventId: 1,
        },
        {
          title: 'Next: O próximo passo do React',
          capacity: 15,
          startsAt: new Date('2023-06-01 14:00'),
          endsAt: new Date('2023-06-01 15:30'),
          locatedAtId: 3,
          eventId: 1,
        },
      ],
    });
  }

  // if (!activityEnrollment) {
  //   await prisma.activityEnrollment.createMany({
  //     data: [
  //       {
  //         ticketId: 1,
  //         activityId: 1,
  //       },
  //       {
  //         ticketId: 2,
  //         activityId: 1,
  //       },
  //       {
  //         ticketId: 3,
  //         activityId: 2,
  //       },
  //       {
  //         ticketId: 4,
  //         activityId: 3,
  //       }
  //     ]
  //   })
  // }

  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(2, 'days').toDate(),
      },
    });
  }

  if (!ticketType) {
    ticketType = await prisma.ticketType.create({
      data: {
        name: 'Online',
        price: 100,
        isRemote: true,
        includesHotel: false,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      },
    });
    ticketType = await prisma.ticketType.create({
      data: {
        name: 'Presencial sem hotel',
        price: 250,
        isRemote: false,
        includesHotel: false,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      },
    });
    ticketType = await prisma.ticketType.create({
      data: {
        name: 'Presencial com hotel',
        price: 600,
        isRemote: false,
        includesHotel: true,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      },
    });
  }
  if (!hotel) {
    hotel = await prisma.hotel.create({
      data: {
        name: 'Hotel California',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      },
    });
  }
  if (!room) {
    room = await prisma.room.create({
      data: {
        name: 'Padrão',
        capacity: 1,
        hotelId: 1,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      },
    });
    room = await prisma.room.create({
      data: {
        name: 'Presidencial',
        capacity: 2,
        hotelId: 1,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      },
    });
  }

  console.log({ event, ticketType });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
