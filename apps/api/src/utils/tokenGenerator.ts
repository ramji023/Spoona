import jwt from "jsonwebtoken";
interface ResultType {
  id: string;
  email: string;
}
export const tokenGenerator = (result: ResultType) => {
  // create tokens for user
  const accessToken = jwt.sign(
    { id: result.id, email: result.email },
    process.env.ACCESS_SECRET_KEY!,
    {
      expiresIn: process.env.ACCESS_EXPIRATION_TIME as any,
    }
  );
  // console.log(process.env.REFRESH_EXPIRATION_TIME);
  const refreshToken = jwt.sign(
    { id: result.id },
    process.env.REFRESH_TOKEN_KEY as string,
    { expiresIn: process.env.REFRESH_EXPIRATION_TIME as any }
  );
  return { accessToken, refreshToken };
};
