import { ConversationController } from "./conversation.controller";
import { ConversationService } from "./conversation.service";

export const ConversationsModule = {
    controllers: [ConversationController],
    services: [ConversationService],
};
