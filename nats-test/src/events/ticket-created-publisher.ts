import { Publisher, TicketCreatedEvent, Subjects } from '@tkts/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
