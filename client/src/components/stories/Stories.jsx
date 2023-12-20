import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "Abod",
      img: "https://images.pexels.com/photos/2881010/pexels-photo-2881010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "Eslam",
      img: "https://images.pexels.com/photos/19164743/pexels-photo-19164743/free-photo-of-woman-in-a-green-suit-standing-in-an-empty.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      name: "Ahma",
      img: "https://images.pexels.com/photos/19443630/pexels-photo-19443630/free-photo-of-round-window-of-marie-elisabeth-luders-haus-in-berlin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      name: "Mohammed",
      img: "https://images.pexels.com/photos/19533990/pexels-photo-19533990/free-photo-of-a-boat-is-traveling-through-the-water-near-a-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img
          src={
            currentUser.profilePic
              ? "/upload/" + currentUser.profilePic
              : "cover.jpg"
          }
          alt=""
        />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
