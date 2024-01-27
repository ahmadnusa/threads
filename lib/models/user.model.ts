import { Document, model, models, Schema, Types } from 'mongoose'

export interface IUser extends Document {
  id: string
  username: string
  name: string
  image?: string
  bio?: string
  threads?: Array<Types.ObjectId | string> // Assuming threads can be either ObjectId or string
  onboarded?: boolean
  communities?: Array<Types.ObjectId | string> // Assuming communities can be either ObjectId or string
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
