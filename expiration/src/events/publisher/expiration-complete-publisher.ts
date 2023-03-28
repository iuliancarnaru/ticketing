import { Subjects, Publisher, ExpirationCompleteEvent } from '@tkts/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject =  Subjects.ExpirationComplete;
}