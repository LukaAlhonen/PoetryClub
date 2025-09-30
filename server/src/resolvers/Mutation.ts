import { Resolvers } from "../__generated__/types.js";
import { handlePrismaError } from "../utils/prisma-error-handler.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { v4 } from "uuid";
import { MyJwtPayload } from "../types/auth.js";
import { PoemAPI } from "../datasources/poem-api.js";

const verifyUser = async ({
  user,
  poemAPI,
}: {
  user: MyJwtPayload;
  poemAPI: PoemAPI;
}) => {
  if (!user) throw new Error("not authenticated");
  const author = await poemAPI.getAuthorById({
    id: user.authorId,
    omitAuthVersion: false,
  });
  if (!author) throw new Error("user not found");
  if (!(author.authVersion === user.authVersion))
    throw new Error("token no longer valid");
};

export const Mutation: Resolvers["Mutation"] = {
  // Create
  createPoem: async (_, { input }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      return dataSources.poemAPI.createPoem({
        ...input,
        authorId: user.authorId,
      });
    } catch (err) {
      handlePrismaError(err, "createPoem");
    }
  },

  createAuthor: (_, { input }, { dataSources }) => {
    try {
      return dataSources.poemAPI.createAuthor(input);
    } catch (err) {
      handlePrismaError(err, "createAuthor");
    }
  },

  createComment: async (_, { poemId, text }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      return dataSources.poemAPI.createComment({
        poemId,
        text,
        authorId: user.authorId,
      });
    } catch (err) {
      handlePrismaError(err, "createComment");
    }
  },

  createCollection: async (_, { title }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      return dataSources.poemAPI.createCollection({
        title,
        authorId: user.authorId,
      });
    } catch (err) {
      handlePrismaError(err, "createCollection");
    }
  },

  createSavedPoem: async (_, { poemId }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      return dataSources.poemAPI.createSavedPoem({
        poemId,
        authorId: user.authorId,
      });
    } catch (err) {
      handlePrismaError(err, "createSavedPoem");
    }
  },

  createLike: async (_, { poemId }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      return dataSources.poemAPI.createLike({
        poemId,
        authorId: user.authorId,
      });
    } catch (err) {
      handlePrismaError(err, "createLike");
    }
  },

  createFollowedAuthor: async (_, { followingId }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      return dataSources.poemAPI.createFollowedAuthor({
        authorId: user.authorId,
        followingId,
      });
    } catch (err) {
      handlePrismaError(err, "createFollowedAuthor");
    }
  },

  // Update
  updatePoem: async (_, { input }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    const poem = await dataSources.poemAPI.getPoem({ id: input.poemId });

    if (poem.authorId !== user.authorId) {
      throw new Error("not authorised");
    }

    try {
      return dataSources.poemAPI.updatePoem(input);
    } catch (err) {
      handlePrismaError(err, "updatePoem");
    }
  },

  updateAuthor: async (_, { input }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    const authVersion = v4();

    try {
      return dataSources.poemAPI.updateAuthor({
        authorId: user.authorId,
        authVersion,
        ...input,
      });
    } catch (err) {
      handlePrismaError(err, "updateAuthor");
    }
  },

  updateCollection: async (_, { input }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    const collection = await dataSources.poemAPI.getCollection({
      id: input.id,
    });

    if (collection.authorId !== user.authorId) {
      throw new Error("not authenticated");
    }

    try {
      return dataSources.poemAPI.updateCollection(input);
    } catch (err) {
      handlePrismaError(err, "updateCollection");
    }
  },

  // Remove
  removeAuthor: async (_, __, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      return dataSources.poemAPI.removeAuthor({ id: user.authorId });
    } catch (err) {
      handlePrismaError(err, "removeAuthor");
    }
  },

  removePoem: async (_, { poemId }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      const poem = await dataSources.poemAPI.getPoem({ id: poemId });

      if (poem.authorId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removePoem");
    }

    try {
      return dataSources.poemAPI.removePoem({ id: poemId });
    } catch (err) {
      handlePrismaError(err, "removePoem");
    }
  },

  removeComment: async (_, { commentId }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      const comment = await dataSources.poemAPI.getComment({ id: commentId });

      if (comment.authorId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removeComment");
    }

    try {
      return dataSources.poemAPI.removeComment({ id: commentId });
    } catch (err) {
      handlePrismaError(err, "removeComment");
    }
  },

  removeCollection: async (_, { collectionId }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      const collection = await dataSources.poemAPI.getCollection({
        id: collectionId,
      });

      if (collection.authorId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removeCollection");
    }

    try {
      return dataSources.poemAPI.removeCollection({ id: collectionId });
    } catch (err) {
      handlePrismaError(err, "removeCollection");
    }
  },

  removeLike: async (_, { likeId }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      const like = await dataSources.poemAPI.getLike({ id: likeId });

      if (like.authorId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removeLike");
    }

    try {
      return dataSources.poemAPI.removeLike({ id: likeId });
    } catch (err) {
      handlePrismaError(err, "removeLike");
    }
  },

  removeSavedPoem: async (_, { savedPoemId }, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      const savedPoem = await dataSources.poemAPI.getSavedPoem({
        id: savedPoemId,
      });

      if (savedPoem.authorId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removeSavedPoem");
    }

    try {
      return dataSources.poemAPI.removeSavedPoem({ id: savedPoemId });
    } catch (err) {
      handlePrismaError(err, "removeSavedPoem");
    }
  },

  removeFollowedAuthor: async (
    _,
    { followedAuthorId },
    { user, dataSources },
  ) => {
    if (!user || user === null) {
      throw new Error("not authenticated");
    }

    await verifyUser({ user, poemAPI: dataSources.poemAPI });

    try {
      const followedAuthor = await dataSources.poemAPI.getFollowedAuthor({
        id: followedAuthorId,
      });

      if (followedAuthor.followerId !== user.authorId) {
        throw new Error("not authorised");
      }
    } catch (err) {
      handlePrismaError(err, "removeFollowedAuthor");
    }

    try {
      return dataSources.poemAPI.removeFollowedAuthor({ id: followedAuthorId });
    } catch (err) {
      handlePrismaError(err, "removeFollowedAuthor");
    }
  },

  // auth
  login: async (_, { username, password }, { dataSources, req, res }) => {
    const author = await dataSources.poemAPI.getAuthorByUsername({
      username,
      omitPassword: false,
      omitAuthVersion: false,
    });

    if (!author) {
      throw new Error("Incorrect username or password");
    }

    const passwordIsValid = await argon2.verify(author.password, password);

    if (!passwordIsValid) {
      throw new Error("Incorrect username or password");
    }

    const accessToken = jwt.sign(
      {
        authorId: author.id,
        email: author.email,
        authVersion: author.authVersion,
      },
      config.JWT_SECRET,
      { expiresIn: "15m" },
    );

    const resfreshToken = jwt.sign(
      { authorId: author.id },
      config.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", resfreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 1000,
    });

    return { token: accessToken, author };
  },

  signup: async (_, { input }, { dataSources }) => {
    try {
      return dataSources.poemAPI.createAuthor(input);
    } catch (err) {
      handlePrismaError(err, "createAuthor");
    }
  },

  logout: async (_, __, { res, user, dataSources }) => {
    if (!user) {
      return true;
    }

    // invalidate old auth verison
    const authVersion = v4();

    await dataSources.poemAPI.updateAuthor({
      authorId: user.authorId,
      authVersion,
    });

    // clear refresh cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return true;
  },

  refreshToken: async (_, __, { req, dataSources }) => {
    const token = req.cookies.refreshToken;
    if (!token) throw new Error("no refresh token");

    try {
      const payload = jwt.verify(token, config.JWT_REFRESH_SECRET) as {
        authorId: string;
        authVersion: string;
      };

      const author = await dataSources.poemAPI.getAuthorById({
        id: payload.authorId,
        omitAuthVersion: false,
      });
      if (!author) throw new Error("User not found");
      if (!(author.authVersion === payload.authVersion))
        throw new Error("token no longer valid");

      const newAccessToken = jwt.sign(
        {
          authorId: author.id,
          email: author.email,
          authVersion: author.authVersion,
        },
        config.JWT_REFRESH_SECRET,
        { expiresIn: "15m" },
      );

      return { token: newAccessToken, author };
    } catch (err) {
      handlePrismaError(err, "refreshToken");
    }
  },
};
