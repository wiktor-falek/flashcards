import app from "./app.js";

process.env.NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
