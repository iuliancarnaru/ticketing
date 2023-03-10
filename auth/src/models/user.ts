import { Schema, model, Model, Document } from 'mongoose';

interface IUser {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDocument> {
  build(attrs: IUser): UserDocument;
}

interface UserDocument extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// to enforce TS check
userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

const User = model<UserDocument, UserModel>('User', userSchema);

export { User };
