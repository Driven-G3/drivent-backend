import { Event } from '.prisma/client';
import { prisma, redis } from '@/config';

async function findFirst(): Promise<Event> {
  const cacheKey = 'event_data';
  const cachedEvent = await redis.get(cacheKey);

  if (cachedEvent) {
    console.log('cache');
    const event = JSON.parse(cachedEvent);
    return event;
  }

  const event = await prisma.event.findFirst();

  redis.set(cacheKey, JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
