export interface JoinRoomDto {
  roomId: string;
  userIds: string[];
}

export interface SendMessageDto {
  from: string;
  message: string;
  reply?: string;
}
