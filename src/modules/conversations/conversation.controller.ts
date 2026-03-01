import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { ConversationService } from "./conversation.service";

@injectable()
export class ConversationController {
  constructor(
    private conversationService: ConversationService
  ) {

  }

  /**
   * Các bước tạo conversation:
   * - Tạo conversation với data đã được cho
   * - Thêm user thực hiện hành động vào conversation với role là "owner"
   * - Thêm 1 thread tin nhắn mặc định là "General", thêm 1 thread voice chat mặc định
   * là "General Media Chat"
   * @param createConversationDto 
   */
  async createConversation(request: Request, response: Response, next: NextFunction) {
    try {
      await this.conversationService.createConversation(request.body);
      return response.json({
        message: "Done",
      })
    } catch (exception) {
      return response.json(exception);
    }
  }

  async joinConversation() {

  }
}
