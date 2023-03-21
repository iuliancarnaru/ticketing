import { Publisher, Subjects, TicketUpdatedEvent } from '@tkts/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
