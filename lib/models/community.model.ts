import mongoose, { Document, Types } from 'mongoose'

export interface ICommunity extends Document {
  id: string
  username: string
  name: string
  image?: string
  bio?: string
  createdBy: Types.ObjectId | string // Assuming createdBy can be either ObjectId or string
  threads: Array<Types.ObjectId | string> // Assuming threads can be either ObjectId or string
  members: Array<Types.ObjectId | string> // Assuming members can be either ObjectId or string
}

const communitySchema = new mongoose.Schema<ICommunity>({
  id: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const Community =
  mongoose.models.Community || mongoose.model<ICommunity>('Community', communitySchema)

export default Community
