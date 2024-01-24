import { model, models, Schema, Types } from 'mongoose'

export interface IUser extends Document {
  id: string
  username: string
  name: string
  image?: string
  bio?: string
  threads: Types.ObjectId[]
  onboarded: boolean
  communities: Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  threads: [{ type: Schema.Types.ObjectId, ref: 'Thread' }],
  onboarded: { type: Boolean, default: false },
  communities: [{ type: Schema.Types.ObjectId, ref: 'Community' }],
})

const User = models.User || model<IUser>('User', userSchema)

export default User
