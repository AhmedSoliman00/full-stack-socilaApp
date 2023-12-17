import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery("posts", () =>
    makeRequest.get("/posts").then((res) => res.data)
  );
  console.log(data);
  //TEMPORARY

  return (
    <div className="posts">
      {error
        ? "error"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};
export default Posts;
