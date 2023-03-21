import { Publisher, Subjects, TicketCreatedEvent } from '@tkts/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
