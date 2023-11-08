import { useState, useEffect } from "react";
import Header from "./layouts/header";
import Repositories from "./layouts/repositories";
import GitHub from "./assets/github-mark-white.svg";
import { getUserProfile } from "./services/http";

function App() {
  const [userid, setUserid] = useState("github");
  const [user, setUser] = useState({
    id: "",
    image: GitHub,
    name: "User name",
    description: "User description",
    followers: 0,
    following: 0,
    location: "loading...",
    repositoriesUrl: "",
  });

  const handleFetch = () => {
    if (!userid.trim()) return;
    getUserProfile(userid).then(setUser);
  };

  useEffect(handleFetch, [userid]);

  return (
    <>
      <Header setSelect={setUserid} />

      <main>
        <div className="header">
          <div className="profile-image">
            <img src={user.image} alt="" />
          </div>

          <div className="profile-social-stats">
            <div className="followers">
              <span>followers</span>
              <span className="line" />
              <span>{user.followers}</span>
            </div>
            <div className="following">
              <span>following</span>
              <span className="line" />
              <span>{user.following}</span>
            </div>
            <div className="location">
              <span>location</span>
              <span className="line" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="username fs-large">{user.name}</div>

          {user.description ? (
            <p>{user.description}</p>
          ) : (
            <p className="placeholder-alert">No description</p>
          )}
        </div>

        <Repositories userid={userid} type={user.type} />
      </main>
    </>
  );
}

export default App;
