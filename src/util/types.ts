import {
  ConversationPopulated,
  MessagePopulated,
} from "../../../backend/src/util/types";

// import { ConversationPopulated } from "./../../../backend/src/util/types";
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchUsersData {
  id: string | null | undefined;
  username: string;
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
}

/// Conversation

export interface ConversationsData {
  conversations: Array<any>;
}

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  praticipantIds: Array<string>;
}

export interface ConversationUpdatedData {
  conversationUpdated: {
    // conversation:Omit<ConversationPopulated,"latestMessage"> &{
    //   latestMessage:MessagePopulated
    // }
    conversation: ConversationPopulated;
  };
}

export interface ConversationDeletedData {
  conversationDeleted: {
    id: string;
  };
}

//Message

export interface MessagesData {
  messages: Array<MessagePopulated>;
}

export interface MessagesVariables {
  conversationId: string;
}

export interface MessageSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessagePopulated;
    };
  };
}
