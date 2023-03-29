import { Schema, model, Model, Document } from 'mongoose';
import { Password } from '../services/password';

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDocument extends Document {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

const userSchema = new Schema<UserAttrs>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
    done();
  }
});

// to enforce TS check
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDocument, UserModel>('User', userSchema);

export { User };
