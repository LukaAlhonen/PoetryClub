import { PoemAPI } from "../../datasources/poem-api.js";
import {
  CreatePoemInput,
  CreateAuthorInput,
  CreateCollectionInput,
  CreateCommentInput,
} from "../../types.js";

export const createAuthorInputObject = ({
  username = "testauthor",
  password = "password",
  email = "test.author@domain.com",
  omitPassword = true,
}: {
  username?: string;
  password?: string;
  email?: string;
  omitPassword?: boolean;
} = {}): CreateAuthorInput => {
  const newAuthor: CreateAuthorInput = {
    username,
    password,
    email,
    omitPassword,
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
