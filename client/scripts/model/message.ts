export type MessageType =
    'info' | 'error' | 'warning';

export interface Message {
  type?: MessageType;
  message?: string;
}