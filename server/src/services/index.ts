import { PrismaClient } from "../../generated/prisma/index.js";
import { CacheAPI } from "../cache/cache-api.js";
import { PoemService } from "./poem.service.js";
import { AuthorService } from "./author.service.js";
import { CollectionService } from "./collection.service.js";
import { FollowedAuthorService } from "./followedAuthor.service.js";
import { LikeService } from "./like.service.js";
import { SavedPoemService } from "./savedPoem.service.js";
import { CommentService } from "./comment.service.js";

interface ServicesOptions {
  prisma: PrismaClient;
  cache: CacheAPI;
}

export type Services = {
  poemService: PoemService;
  authorService: AuthorService;
  collectionService: CollectionService;
  followedAuthorService: FollowedAuthorService;
  likeService: LikeService;
  savedPoemService: SavedPoemService;
  commentService: CommentService;
};

export const createServices = ({
  prisma,
  cache,
}: ServicesOptions): Services => {
  return {
    poemService: new PoemService({ prisma, cache }),
    authorService: new AuthorService({ prisma, cache }),
    collectionService: new CollectionService({ prisma, cache }),
    followedAuthorService: new FollowedAuthorService({ prisma, cache }),
    likeService: new LikeService({ prisma, cache }),
    savedPoemService: new SavedPoemService({ prisma, cache }),
    commentService: new CommentService({ prisma, cache }),
  };
};
