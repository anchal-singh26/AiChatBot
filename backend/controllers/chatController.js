
import Chat from "../models/Chat.js"


export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };

    // Save and get the new chat back
    const newChat = await Chat.create(chatData);

    res.json({ success: true, chat: newChat });  // ✅ return chat object
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getChats = async (req, res) => {
  try {
    const userId = req.user._id

 const chats = await Chat.find({ userId })
  .sort({ updatedAt: -1 })
  .select("+createdAt +updatedAt"); 

    res.json({ success: true, chats })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id
    const { chatId } = req.body

    await Chat.deleteOne({ _id: chatId, userId })

    res.json({ success: true,  message:"Chay Deleted" })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

