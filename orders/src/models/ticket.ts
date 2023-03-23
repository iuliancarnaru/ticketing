import { OrderStatus } from '@tkts/common';
import { Schema, model, Document, Model } from 'mongoose';
import { Order } from './order';

interface TicketAttrs {
  title: string;
  price: number;
}

export interface TicketDocument extends Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends Model<TicketDocument> {
  build(attrs: TicketAttrs): TicketDocument;
}

const ticketSchema = new Schema<TicketAttrs>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

ticketSchema.methods.isReserved = async function () {
  // make sure that this ticket is not already reserved
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Ticket = model<TicketDocument, TicketModel>('Ticket', ticketSchema);

export { Ticket };
