import { Prisma } from "../../generated/prisma/index.js";

export type AuthorWithRelations = Prisma.AuthorGetPayload<{
  include: {
    poems: true;
    likedPoems: true;
    savedPoems: true;
    collections: true;
    comments: true;
    followedBy: true;
    following: true;
  };
}>;

export type SafeAuthor = Omit<
  AuthorWithRelations,
  "password" | "authVersion"
> & {
  password?: string;
  authVersion?: string;
};

export type PoemWithRelations = Prisma.PoemGetPayload<{
  include: {
    author: true;
    inCollection: true;
    comments: true;
    likes: true;
    savedBy: true;
  };
}>;

export type CollectionWithRelations = Prisma.CollectionGetPayload<{
  include: {
    author: true;
    poems: true;
  };
}>;

export type CommentWithRelations = Prisma.CommentGetPayload<{
  include: {
    poem: true;
    author: true;
  };
}>;

export type LikeWithRelations = Prisma.LikeGetPayload<{
  include: {
    author: true;
    poem: true;
  };
}>;

export type FollowedAuthorWithRelations = Prisma.FollowedAuthorGetPayload<{
  include: {
    follower: true;
    following: true;
  };
}>;

export type SavedPoemWithRelations = Prisma.SavedPoemGetPayload<{
  include: {
    author: true;
    poem: true;
  };
}>;
