import User from "../db/models/User.js";

/**
 * queries db for an user with cookie data: username, sessionId1 and sessionId2
 * if unsuccessfull returns status 401 message breaking the middleware chain
 * otherwise passes { username, sessionId, userId } to succeeding middlewares
 * available inside res.locals and calls next
 *
 * EXAMPLE AUTHORIZED ROUTE
 * app.use("/api", authorize, v1: express.Router);
 *
 * EXAMPLE USAGE INSIDE SUCCEEDING MIDDLEWARE:
 * const { username, sessionId, userId } = res.locals;
 * OR
 * const { user } = res.locals;
 */
const authorize = async (req, res, next) => {
  const { username, sessionId1, sessionId2 } = req.cookies;
  const sessionId = sessionId1 + sessionId2

  if (!username || !sessionId) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  const user = await User.collection.findOne(
    {
      "account.username": username,
      "account.sessionId": sessionId,
    },
    {
      projection: {
        "account.username": 1,
        "account.sessionId": 1,
        "account.email": 1,
        "account.confirmedEmail": 1,
      },
    }
  );

  if (user === null) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  // pass user data to succeeding middlewares
  res.locals.username = user.account.username;
  res.locals.sessionId = user.account.sessionId;
  res.locals.userId = user._id; // this is of type ObjectId not string!!!
  res.locals.publicUserData = {
    username: user.account.username,
    email: user.account.email,
    confirmedEmail: user.account.confirmedEmail,
  }

  return next();
};

export default authorize;
