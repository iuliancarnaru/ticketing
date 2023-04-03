import mongoose, { model, Document, Model, Schema } from 'mongoose';

interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

interface PaymentDocument extends Document {
  orderId: string;
  stripeId: string;
}

interface PaymentModel extends Model<PaymentDocument> {
  build(attrs: PaymentAttrs): PaymentDocument;
}

const paymentSchema = new Schema<PaymentAttrs>(
  {
    orderId: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
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

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = model<PaymentDocument, PaymentModel>('Payment', paymentSchema);

export { Payment };
