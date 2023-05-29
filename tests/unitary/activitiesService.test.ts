import { listActivity, listActivityEnrollment, listActivityRoom } from '../factories/activities-factory';
import activitiesRepository from '@/repositories/activities-repository';
import activitiesService from '@/services/activities-service';

describe('getActivitiesRooms function', () => {
  it('should return the ActivitiesRooms', async () => {
    const activitiesRooms = await listActivityRoom();

    jest.spyOn(activitiesRepository, 'getActivitiesRooms').mockResolvedValue(activitiesRooms);

    const result = await activitiesService.getActivitiesRooms();

    expect(result).toEqual(activitiesRooms);
  });
});

describe('getActivities function', () => {
  it('should return the Activities', async () => {
    const activity = await listActivity();

    jest.spyOn(activitiesRepository, 'getActivities').mockResolvedValue(activity);

    const result = await activitiesService.getActivities();

    expect(result).toEqual(activity);
  });
});

describe('insertActivityEnrollment function', () => {
  it('should return the insertActivityEnrollment', async () => {
    const ticketId = 1;
    const activityId = 1;
    const activityEnrollment = await listActivityEnrollment();

    jest.spyOn(activitiesRepository, 'insertActivityEnrollment').mockResolvedValue(activityEnrollment);

    const result = await activitiesService.postActivityEnrollment(ticketId, activityId);

    expect(result).toEqual(activityEnrollment);
  });
});
