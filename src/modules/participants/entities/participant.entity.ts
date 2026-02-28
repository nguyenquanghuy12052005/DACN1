import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  senderId: { type: String, required: true },
  role: {
    type: String,
    enum: ['owner', 'administrator', 'member'],
    required: true
  },
}, { timestamps: true });

export const Participant = mongoose.model('Participant', participantSchema);