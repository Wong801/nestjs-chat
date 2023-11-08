export interface JoinRoomDto {
  roomId: string;
  userIds: string[];
}

export interface SendMessageDto {
  roomId: string;
  from: string;
  message: string;
  reply?: string;
}
