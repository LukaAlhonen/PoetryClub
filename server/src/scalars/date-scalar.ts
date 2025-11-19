import { GraphQLError, GraphQLScalarType, Kind } from "graphql";

export const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom date scalar",

  serialize(value: unknown): string {
    let date: Date;

    if (value instanceof Date) {
      date = value;
    } else if (typeof value === "string") {
      date = new Date(value);
    } else {
      throw new GraphQLError(`Value is not a valid date or string: ${value}`);
    }

    if (isNaN(date.getTime())) {
      throw new GraphQLError(`Invalid date: ${value}`);
    }

    return date.toISOString();
  },

  parseValue(value: unknown): Date {
    if (typeof value === "string") {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new GraphQLError(`Invalid date: ${value}`);
      }
      return date;
    }
    throw new GraphQLError(`Value must be a string: ${value}`);
  },

  parseLiteral(ast): Date {
    if (ast.kind === Kind.STRING) {
      const date = new Date(ast.value);
      if (isNaN(date.getTime())) {
        throw new GraphQLError(`Invalid date: ${ast.value}`);
      }
      return date;
    }
    throw new GraphQLError(`Value must be a string`);
  },
});
