import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationThreadId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  // In PostgreSQL
  senderId: { type: String, required: true },
  // If replies
  parentId: { type: Schema.Types.ObjectId, ref: 'Message', default: null },
  textContent: { type: String, default: "" },
  attachments: [
    {
      directUrl: { type: String },
      fileSize: { type: String },
      fileName: { type: String },
    }
  ],
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);