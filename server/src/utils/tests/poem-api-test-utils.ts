import { PoemAPI } from "../../datasources/poem-api.js";
import {
  CreatePoemInput,
  CreateAuthorInput,
  CreateCollectionInput,
  CreateSavedPoemInput,
  CreateCommentInput,
  CreateLikeInput,
} from "../../types.js";

export class PoemAPITestUtils {
  constructor(private poemAPI: PoemAPI) {}

  createAuthorInputObject(
    username?: string,
    password?: string,
    email?: string,
  ): CreateAuthorInput {
    const newAuthor: CreateAuthorInput = {
      username: username ? username : "testauthor",
      password: password ? password : "password",
      email: email ? email : "test.author@domain.com",
    };

    return newAuthor;
  }

  createPoemInputObject(
    authorId: string,
    collectionId?: string,
    text?: string,
    title?: string,
  ): CreatePoemInput {
    const newPoem: CreatePoemInput = {
      authorId,
      collectionId,
      text: text ? text : "testpoemtext",
      title: title ? title : "testpoem",
    };

    return newPoem;
  }

  createCollectionInputObject(
    authorId: string,
    title?: string,
  ): CreateCollectionInput {
    const newCollection: CreateCollectionInput = {
      authorId,
      title: title ? title : "testcollection",
    };

    return newCollection;
  }

  createCommentInputObject(
    authorId: string,
    poemId: string,
    text?: string,
  ): CreateCommentInput {
    const newComment: CreateCommentInput = {
      authorId,
      poemId,
      text: text ? text : "testcommenttext",
    };

    return newComment;
  }

  createLikeInputObject(authorId: string, poemId: string): CreateLikeInput {
    const newLike: CreateLikeInput = {
      poemId,
      authorId,
    };

    return newLike;
  }

  createSavedPoemInputObject(
    authorId: string,
    poemId: string,
  ): CreateSavedPoemInput {
    const newSavedPoem: CreateSavedPoemInput = {
      poemId,
      authorId,
    };

    return newSavedPoem;
  }

  async createDefaultTestAuthor() {
    const newAuthor = this.createAuthorInputObject();
    const testAuthor = await this.poemAPI.createAuthor(newAuthor);
    return testAuthor;
  }

  async createDefaultTestPoem() {
    const testAuthor = await this.createDefaultTestAuthor();
    const newPoem = this.createPoemInputObject(testAuthor.id);
    const testPoem = await this.poemAPI.createPoem(newPoem);
    return testPoem;
  }

  async createDefaultTestCollection() {
    const testPoem = await this.createDefaultTestPoem();
    const testAuthor = testPoem.author;
    const newCollection = this.createCollectionInputObject(
      testAuthor.id,
      testPoem.id,
    );
    const testCollection = await this.poemAPI.createCollection(newCollection);
    return testCollection;
  }

  async createDefaultTestComment() {
    const testPoem = await this.createDefaultTestPoem();
    const testAuthor = testPoem.author;
    const newComment = this.createCommentInputObject(
      testAuthor.id,
      testPoem.id,
    );
    const testComment = await this.poemAPI.createComment(newComment);
    return testComment;
  }

  async createDefaultTestLike() {
    const testPoem = await this.createDefaultTestPoem();
    const testAuthor = testPoem.author;
    const newLike = this.createLikeInputObject(testAuthor.id, testPoem.id);
    const testLike = await this.poemAPI.createLike(newLike);
    return testLike;
  }

  async createDefaultTestSavedPoem() {
    const testPoem = await this.createDefaultTestPoem();
    const testAuthor = testPoem.author;
    const newSavedPoem = this.createSavedPoemInputObject(
      testAuthor.id,
      testPoem.id,
    );
    const testSavedPoem = await this.poemAPI.createSavedPoem(newSavedPoem);
  }
}
