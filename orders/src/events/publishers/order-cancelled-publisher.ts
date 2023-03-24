import { Publisher, Subjects, OrderCancelledEvent } from '@tkts/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
