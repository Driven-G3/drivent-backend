import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { listHotels, getHotelsWithRooms } from '@/controllers/hotel-controller';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', listHotels).get('/:hotelId', getHotelsWithRooms);

export { hotelsRouter };
