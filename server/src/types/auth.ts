export interface MyJwtPayload {
  authorId: string;
  email: string;
  authVersion: string;
  iat?: number;
  exp?: number;
}
