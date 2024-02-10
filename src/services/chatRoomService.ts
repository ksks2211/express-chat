import ChatRoom, { ChatRoomDocument } from "../models/chatRoom";

const createChatRoom = async (
  name: string,
  creator: string
): Promise<ChatRoomDocument> => {
  const chatRoom = new ChatRoom({
    name,
    createdBy: creator,
    participants: [creator],
  });
  return await chatRoom.save();
};

const deleteChatRoom = async (id: string) => {
  return await ChatRoom.findByIdAndDelete(id);
};

export default {
  createChatRoom,
  deleteChatRoom,
};
