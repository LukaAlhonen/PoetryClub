export type PoemModel = {
  id: string;
  title: string;
  authorId: string;
  text: string;
  datePublished: Date;
  collectionId?: string | null;
  views: number;
};

export type AuthorModel = {
  id: string;
  username: string;
  email: string;
  dateJoined: Date;
};

export type CommentModel = {
  id: string;
  text: string;
  datePublished: Date;
  poemId: string;
  authorId: string;
};

export type CollectionModel = {
  id: string;
  title: string;
  dateCreated: Date;
  ownerId: string;
};

export type SavedPoemModel = {
  id: string;
  poemId: string;
  authorId: string;
  dateSaved: Date;
};

export type LikeModel = {
  id: string;
  datePublished: Date;
  poemId: string;
  authorId: string;
};

export type FollowedAuthorModel = {
  id: string;
  followerId: string;
  followingId: string;
};
