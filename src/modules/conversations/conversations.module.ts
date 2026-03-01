import { ConversationController } from "./conversation.controller";
import { ConversationService } from "./conversation.service";
import ConversationRoute from "./conversation.route";

export const ConversationsModule = {
  controllers: [ConversationController],
  services: [ConversationService],
  routes: [ConversationRoute],
};
