export class CreateConversationDto {
  type!: string;
  metadata?: {
    name?: string;
    avatarUrl?: string;
  };
  creatorId!: string;
}