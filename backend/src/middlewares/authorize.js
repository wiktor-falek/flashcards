import User from "../db/models/User.js";

/**
 * queries db for an user with username and sessionId from cookie
 * if unsuccessfull returns status 401 message breaking the middleware chain
 * otherwise passes { username, sessionId, userId } to succeeding middlewares
 * avalidable inside res.locals and calls next
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
  const { username, sessionId } = req.cookies;

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

  return next();
};

export default authorize;
