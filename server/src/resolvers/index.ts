import { Resolvers } from "../types.js";
import { DateScalar } from "../scalars/date-scalar.js";
import { Query } from "./Query.js";
import { Mutation } from "./Mutation.js";
import { Author } from "./Author.js";
import { Poem } from "./Poem.js";
import { Collection } from "./Collection.js";
import { Comment } from "./Comment.js";
import { FollowedAuthor } from "./FollowedAuthor.js";
import { Like } from "./Like.js";
import { SavedPoem } from "./SavedPoem.js";

export const resolvers: Resolvers = {
  Date: DateScalar,
  Query,
  Mutation,
  Author,
  Poem,
  Collection,
  Comment,
  FollowedAuthor,
  Like,
  SavedPoem,
};
