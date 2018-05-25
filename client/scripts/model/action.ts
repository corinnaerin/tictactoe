export default interface Action {
  type: string;
  input?: any;
  data?: any;
  error?: string;
}