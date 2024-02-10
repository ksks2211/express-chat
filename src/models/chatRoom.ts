import type { IChatRoom } from "../types/chat.types";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface ChatRoomDocument extends Document, IChatRoom {}

interface ChatRoomModel extends Model<ChatRoomDocument> {}

const ChatRoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  participants: [{ type: String, required: true }],
});

ChatRoomSchema.set("toJSON", {
  getters: true,
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
    delete ret._id;
    return ret;
  },
});

export default mongoose.model<ChatRoomDocument, ChatRoomModel>(
  "ChatRoom",
  ChatRoomSchema
);
