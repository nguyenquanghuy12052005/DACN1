import { Router } from "express";
import { injectable } from "inversify";
import { ConversationController } from "./conversation.controller";
import { Route } from "../../core/interface";
import { authMiddleware } from "../auth";

@injectable()
class ConversationRoute implements Route {
  public path = "/conversations";
  public router = Router();

  constructor(private conversationController: ConversationController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);
    // Create conversation
    this.router.post("/", (req, res, next) => this.conversationController.createConversation(req, res, next));
  }
}

export default ConversationRoute;
