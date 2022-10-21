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
      console.log("\nLooks like you might have forgotten to include your MongoDB Atlas credentials inside .env\n");
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
