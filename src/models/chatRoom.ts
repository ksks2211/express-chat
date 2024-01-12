import { Mode } from "fs";
import { ChatRoom } from "../types/chat.types";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface ChatRoomDocument extends Document, ChatRoom {}

interface ChatRoomModel extends Model<ChatRoomDocument> {}

const ChatRoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  participants: [{ type: String, required: true }],
});

export default mongoose.model<ChatRoomDocument>("ChatRoom", ChatRoomSchema);
