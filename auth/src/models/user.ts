import { Schema, model, Model, Document } from 'mongoose';
import { Password } from '../services/password';
// import * as argon2 from 'argon2';

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

const userSchema = new Schema<IUser>(
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

  // without helper class using argon2
  // if (this.isModified('password')) {
  //   const hashed = await argon2.hash(this.get('password'));
  //   this.set('password', hashed);
  // }
});

// to enforce TS check
userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

const User = model<UserDocument, UserModel>('User', userSchema);

export { User };
