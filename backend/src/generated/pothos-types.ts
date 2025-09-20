/* eslint-disable */
import type { Prisma, User, OneTimePassword, AgentConversation, AgentConversationMessage } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "Conversations";
        ListRelations: "Conversations";
        Relations: {
            Conversations: {
                Shape: AgentConversation[];
                Name: "AgentConversation";
                Nullable: false;
            };
        };
    };
    OneTimePassword: {
        Name: "OneTimePassword";
        Shape: OneTimePassword;
        Include: never;
        Select: Prisma.OneTimePasswordSelect;
        OrderBy: Prisma.OneTimePasswordOrderByWithRelationInput;
        WhereUnique: Prisma.OneTimePasswordWhereUniqueInput;
        Where: Prisma.OneTimePasswordWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    AgentConversation: {
        Name: "AgentConversation";
        Shape: AgentConversation;
        Include: Prisma.AgentConversationInclude;
        Select: Prisma.AgentConversationSelect;
        OrderBy: Prisma.AgentConversationOrderByWithRelationInput;
        WhereUnique: Prisma.AgentConversationWhereUniqueInput;
        Where: Prisma.AgentConversationWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "AgentConversationMessage";
        ListRelations: "AgentConversationMessage";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            AgentConversationMessage: {
                Shape: AgentConversationMessage[];
                Name: "AgentConversationMessage";
                Nullable: false;
            };
        };
    };
    AgentConversationMessage: {
        Name: "AgentConversationMessage";
        Shape: AgentConversationMessage;
        Include: Prisma.AgentConversationMessageInclude;
        Select: Prisma.AgentConversationMessageSelect;
        OrderBy: Prisma.AgentConversationMessageOrderByWithRelationInput;
        WhereUnique: Prisma.AgentConversationMessageWhereUniqueInput;
        Where: Prisma.AgentConversationMessageWhereInput;
        Create: {};
        Update: {};
        RelationName: "conversation";
        ListRelations: never;
        Relations: {
            conversation: {
                Shape: AgentConversation;
                Name: "AgentConversation";
                Nullable: false;
            };
        };
    };
}