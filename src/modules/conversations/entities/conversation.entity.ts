import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['direct', 'group', 'channel'],
    required: true
  },
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: false },
  metadata: {
    // Conversation name in case the conversation is group/channel
    name: { type: String, default: "Default conversation name" },
    // URL to conversation's avatar
    avatarUrl: { type: String, default: "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg" },
  }
}, { timestamps: true });

export const Conversation = mongoose.model('Conversation', conversationSchema);