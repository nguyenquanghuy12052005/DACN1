import { injectable } from "inversify";
import { CreateConversationDto } from "./dtos/conversation.dto";
import { UserService } from "../users/user.service";
import { Conversation } from "./entities/conversation.entity";
import { Participant } from "../participants/entities/participant.entity";
import { ConversationThread } from "./entities/thread.entity";

@injectable()
export class ConversationService {
  constructor(
    private readonly userService: UserService
  ) { }
  async createConversation(createConversationDto: CreateConversationDto) {
    for (const participantId of createConversationDto.participantIds) {
      const user = await this.userService.getUserById(+participantId);
      if (!user) {
        const message = `User ${user} not found`;
        console.log(message);
        throw new Error(message);
      }
    }

    switch (createConversationDto.type) {
      case "group":
        console.log('Service.createConversation: Tạo conversation');
        const conversation = await Conversation.insertOne({
          type: "group",
          metadata: {
            name: createConversationDto.metadata?.name,
            avatarUrl: createConversationDto.metadata?.avatarUrl,
          }
        });
        console.log('Service.createConversation: Thêm participant đầu tiên');
        await Participant.insertOne({
          conversationId: conversation._id,
          memberId: +createConversationDto.participantIds[0],
          role: "owner"
        });
        console.log('Service.createConversation: Thêm 2 channel Text và Voice');
        await ConversationThread.insertMany([
          // Text-based message thread
          {
            threadName: "General Channel",
            isVoiceThread: false,
            conversationId: conversation._id,
          },
          // Voice thread
          {
            threadName: "Voice Channel",
            isVoiceThread: true,
            conversationId: conversation._id,
          }
        ]);
        break;
      case "direct":
        break;
      default:
        throw new Error("Invalid conversation type");
    }
  }
}
