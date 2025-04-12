
export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  type?: string;
}
