import { Document, model, models, Schema, Types } from 'mongoose'

export interface IThread extends Document {
  text: string
  author: Types.ObjectId | string // Assuming author can be either ObjectId or string
  community: Types.ObjectId | string // Assuming community can be either ObjectId or string
  createdAt?: Date
  parentId?: string
  children?: Array<Types.ObjectId | string> // Assuming children can be either ObjectId or string
}

const threadSchema = new Schema<IThread>({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  community: { type: Schema.Types.ObjectId, ref: 'Community' },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  children: [{ type: Schema.Types.ObjectId, ref: 'Thread' }],
})

const Thread = models.Thread || model<IThread>('Thread', threadSchema)

export default Thread
