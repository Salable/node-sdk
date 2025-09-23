import objectBuilder from './object-builder';
import { EventStatus } from '@prisma/client';
import { EventType } from '../lib/constants';

export const mockSalableEvent = objectBuilder({
  type: EventType.CreateSeats,
  organisation: 'xxxxx',
  status: EventStatus.pending as EventStatus,
  isTest: false,
  retries: 0,
});
