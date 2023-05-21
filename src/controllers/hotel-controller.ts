import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function listHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const hotels = await hotelsService.listHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    next(error);
  }
}

export async function getHotelsWithRooms(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { hotelId } = req.params;

  try {
    const hotels = await hotelsService.getHotelsWithRooms(Number(hotelId));

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    next(error);
  }
}
