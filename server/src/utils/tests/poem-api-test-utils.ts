import {
  CreatePoemInput,
  CreateAuthorInput,
  CreateCollectionInput,
  CreateSavedPoemInput,
  CreateCommentInput,
  CreateLikeInput,
} from "../../types.js";

export const createAuthorInputObject = ({
  username = "testauthor",
  password = "password",
  email = "test.author@domain.com",
}: {
  username?: string;
  password?: string;
  email?: string;
} = {}): CreateAuthorInput => {
  const newAuthor: CreateAuthorInput = {
    username,
    password,
    email,
  };

  return newAuthor;
};

export const createPoemInputObject = ({
  authorId,
  collectionId,
  text = "testpoemtext",
  title = "testpoem",
}: {
  authorId: string;
  collectionId?: string;
  text?: string;
  title?: string;
}): CreatePoemInput => {
  const newPoem: CreatePoemInput = {
    authorId,
    collectionId,
    text,
    title,
  };

  return newPoem;
};

export const createCollectionInputObject = ({
  authorId,
  title = "testcollection",
}: {
  authorId: string;
  title?: string;
}): CreateCollectionInput => {
  const newCollection: CreateCollectionInput = {
    authorId,
    title,
  };

  return newCollection;
};

export const createCommentInputObject = ({
  authorId,
  poemId,
  text = "testcommenttext",
}: {
  authorId: string;
  poemId: string;
  text?: string;
}): CreateCommentInput => {
  const newComment: CreateCommentInput = {
    authorId,
    poemId,
    text,
  };

  return newComment;
};

export const createLikeInputObject = ({
  authorId,
  poemId,
}: {
  authorId: string;
  poemId: string;
}): CreateLikeInput => {
  const newLike: CreateLikeInput = {
    poemId,
    authorId,
  };

  return newLike;
};

export const createSavedPoemInputObject = ({
  authorId,
  poemId,
}: {
  authorId: string;
  poemId: string;
}): CreateSavedPoemInput => {
  const newSavedPoem: CreateSavedPoemInput = {
    poemId,
    authorId,
  };

  return newSavedPoem;
};
