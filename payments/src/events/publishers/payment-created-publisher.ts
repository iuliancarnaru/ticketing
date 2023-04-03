import { Subjects, Publisher, PaymentCreatedEvent } from '@tkts/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
