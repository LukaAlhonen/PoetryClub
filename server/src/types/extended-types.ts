import {
  Author,
  Poem,
  Collection,
  Comment,
  Like,
  SavedPoem,
  FollowedAuthor,
} from "../../generated/prisma/client.js";

export type AuthorIncludes = Omit<Author, "password"> & {
  poems?: Poem[];
  savedPoems?: SavedPoem[];
  likedPoems?: Like[];
  comments?: Comment[];
  followedBy?: FollowedAuthor[];
  following?: FollowedAuthor[];
  collections?: Collection[];
};

export type AuthorWithPasswordIncludes = Author & {
  poems?: Poem[];
  savedPoems?: SavedPoem[];
  likedPoems?: Like[];
  comments?: Comment[];
  followedBy?: FollowedAuthor[];
  following?: FollowedAuthor[];
  collections?: Collection[];
};

export type SafeAuthor = Omit<Author, "password" | "authVersion"> & {
  password?: string;
  authVersion?: string;
};
