import bcrypt from "bcrypt";

import Mongo from "../Mongo.js";
import userSchema from "../schemas/userSchema.js";
import logger from "../../../logger.js";

class User {
  constructor(db) {
    this.collection = db.collection("users");
  }
  async getUserByName(username) {
    const user = await this.collection.findOne({
      "account.username": username,
    });
    return user;
  }
  /**
   * @param {String} email
   * @returns boolean
   */
  async emailIsTaken(email) {
    const user = await this.collection.findOne({
      "account.confirmedEmail": email,
    });
    if (user === null) {
      return false;
    }
    return true;
  }
  /**
   *
   * @param {String} username
   * @param {String} email
   * @returns {
   *   "usernameIsTaken": Boolean,
   *   "emailIsTaken": Boolean
   * }
   */
  async usernameOrEmailIsTaken(username, email) {
    const user = await this.collection.findOne({
      $or: [
        { "account.username": username },
        { "account.confirmedEmail": email },
      ],
    });
    const results = {
      usernameIsTaken: false,
      emailIsTaken: false,
    };
    if (user !== null) {
      if (user.account.username === username) {
        results.usernameIsTaken = true;
      }
      if (user.account.confirmedEmail === email) {
        results.emailIsTaken = true;
      }
    }
    return results;
  }

  async register(username, password, email) {
    const initialUserData = {
      account: { username: username, email: email },
    };

    let userData;
    try {
      userData = await userSchema.validateAsync(initialUserData);
    } catch (err) {
      logger.error(`Register validation failed.\n${err}`);
      return null;
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    userData.account.hash = hash;

    try {
      const newUser = await this.collection.insertOne(userData);
    } catch (e) {
      logger.error(`Failed to save new user.\n${e}`);
      return null;
    }
    return userData;
  }
}

export default new User(Mongo.db);
