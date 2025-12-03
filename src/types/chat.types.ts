export type Message = {
    id: string;
    role: string;
    content: string;
    created?: string;
    timestamp?: Date;
    isTyping?: boolean;
}