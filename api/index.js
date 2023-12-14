import express from "express";
const app = express();
import userRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import likesRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//middleware
app.use(express.json()); // to send json data
app.use(cors());
app.use(cookieParser());


app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server started");
});
