export type TMessage = {
    _id: string;
    sender: {
      id: string;
      name: string;
      avatarUrl?: string;
    };
    receiver: {
      id: string;
      name: string;
      avatarUrl?: string;
    };
    content: string;
    messageType: "text" | "image" | "video" | "file";
    attachments?: string[];
    isRead: boolean;
    createdAt: Date;
    updatedAt?: Date;
  };
  