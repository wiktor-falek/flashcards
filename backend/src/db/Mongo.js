import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

class Mongo {
  constructor() {
    this.URL =
      process.env.NODE_ENV === "production"
        ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.4zrjv3n.mongodb.net/flashcards?retryWrites=true&w=majority`
        : "mongodb://127.0.0.1:27017/flashcards";
    
    try {
      this.client = new MongoClient(this.URL);
    }
    catch(e) {
      const message = process.env.NODE_ENV === "production"
      ? "\nYou might have forgotten to include your MongoDB Atlas credentials inside .env\n"
      : "\nConnection to local mongodb database failed, did you run npm run db (mongod)?\n"
      console.error(message);
      throw(e);
    }
    this.init();
  }

  init() {
    this.client.connect();
    this.db = this.client.db();
  }
}
3;
export default new Mongo();
