import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  let ticketType = await prisma.ticketType.findFirst();
  let hotel = await prisma.hotel.findFirst();
  let room = await prisma.room.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(2, "days").toDate(),
      },
    });
  }

  if (!ticketType) {
    ticketType = await prisma.ticketType.create({
      data: {
        name: "Online",
        price: 100,
        isRemote: true,
        includesHotel: false,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      }
    })
    ticketType = await prisma.ticketType.create({
      data: {
        name: "Presencial sem hotel",
        price: 250,
        isRemote: false,
        includesHotel: false,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      }
    })
    ticketType = await prisma.ticketType.create({
      data: {
        name: "Presencial com hotel",
        price: 600,
        isRemote: false,
        includesHotel: true,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      }
    })
  }
  if(!hotel){
    hotel = await prisma.hotel.create({
      data: {
        name: "Hotel California",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      }
    })
  }
  if(!room){
    room = await prisma.room.create({
      data: {
        name: "Padrão",
        capacity: 1,
        hotelId: 1,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      }
    })
    room = await prisma.room.create({
      data: {
        name: "Presidencial",
        capacity: 2,
        hotelId: 1,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
      }
    })
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
