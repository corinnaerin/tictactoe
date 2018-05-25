export type MessageType =
    'INFO' | 'ERROR' | 'WARNING';

export interface Message {
  type?: MessageType;
  message?: string;
}