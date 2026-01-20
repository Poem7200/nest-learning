import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

@Schema({ _id: false })
export class Profile {
  @Prop()
  bio: string;

  @Prop()
  phone: string;

  @Prop()
  avatar: string;
}

const ProfileSchema = SchemaFactory.createForClass(Profile);

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class User extends Document implements IUserMethods {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    index: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6,
  })
  password: string;

  @Prop({ type: ProfileSchema })
  profile: Profile;

  @Prop({
    type: [String],
    default: [],
  })
  tags: string[];

  @Prop({
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active',
    index: true,
  })
  status: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isAdmin: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  loginCount: number;

  @Prop({})
  lastLoginAt: Date;

  readonly isActive: boolean;

  declare comparePassword: (password: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error('Failed to hash password');
  }
});

UserSchema.post('save', function () {
  console.log(`用户 ${this.username} 已保存`);
});

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// 添加虚拟字段
UserSchema.virtual('isActive').get(function () {
  return this.status === 'active';
});

// 创建索引
UserSchema.index({ username: 1, email: 1 });
UserSchema.index({ status: 1 });
