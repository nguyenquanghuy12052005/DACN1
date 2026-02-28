import { Router } from "express";
import { container } from "../../core/di/container";
import { ConversationController } from "./conversation.controller";
import { Route } from "../../core/interface";

class ConversationRoute implements Route {
    public path = "/conversations";
    public router = Router();
    private conversationController = container.get(ConversationController);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", (req, res, next) => this.conversationController.createConversation(req, res, next));
    }
}

export default ConversationRoute;
