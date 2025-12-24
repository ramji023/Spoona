import jwt from "jsonwebtoken"; // import jwt to sign and verify the jwt token
interface ResultType {
  id: string;
  email: string;
}

// function to generate access and refresh token
export const tokenGenerator = (result: ResultType) => {
  // create access token for user
  const accessToken = jwt.sign(
    { id: result.id, email: result.email },
    process.env.ACCESS_SECRET_KEY!,
    {
      expiresIn: process.env.ACCESS_EXPIRATION_TIME as any,
    }
  );
  // console.log(process.env.REFRESH_EXPIRATION_TIME);
  // create refresh token for user
  const refreshToken = jwt.sign(
    { id: result.id },
    process.env.REFRESH_TOKEN_KEY as string,
    { expiresIn: process.env.REFRESH_EXPIRATION_TIME as any }
  );
  return { accessToken, refreshToken };
};
