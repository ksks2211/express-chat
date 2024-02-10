import mongoose, { Document, Model, Schema } from "mongoose";
import moment from "moment";
import type { ITodo } from "../types/todo.types";
// Interface representing a document in MongoDB.
export interface TodoDocument extends Document, ITodo {}

interface TodoModel extends Model<TodoDocument> {
  toggleCompletedById: (id: string) => Promise<boolean>;
}

// Schema corresponding to the document interface.
const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  isCompleted: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
    immutable: true,
    get: (createdAtValue: Date) =>
      moment(createdAtValue).format("YYYY-MM-DD HH:mm:ss"),
  },
});

// Static method
TodoSchema.statics.toggleCompletedById = async function (
  id: string
): Promise<boolean> {
  const result = await this.updateOne({ _id: id }, [
    { $set: { isCompleted: { $not: "$isCompleted" } } },
  ]);
  return result.matchedCount > 0;
};

TodoSchema.set("toJSON", {
  getters: true,
  virtuals: true,
  versionKey: false,
  transform: (doc, ret, options) => {
    delete ret._id;
    return ret;
  },
});

export default mongoose.model<TodoDocument, TodoModel>("Todo", TodoSchema);
