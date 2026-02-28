import mongoose, { Schema } from "mongoose";

const conversationThreadSchema = new mongoose.Schema({
  threadName: { type: String, default: "General" },
  isVoiceThread: { type: Boolean, default: false },
  conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true, }
}, { timestamps: true });

export const ConversationThread = mongoose.model('ConversationThread', conversationThreadSchema);