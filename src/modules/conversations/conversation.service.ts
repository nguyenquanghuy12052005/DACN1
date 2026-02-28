import { injectable } from "inversify";
import { CreateConversationDto } from "./dtos/conversation.dto";

@injectable()
export class ConversationService {
  async createConversation(createConversationDto: CreateConversationDto) {

  }
}
