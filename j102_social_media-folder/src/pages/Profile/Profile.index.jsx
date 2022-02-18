// S'il le souhaite, il peut modifier des éléments de son profil, grâce à un formulaire situé sous ses informations. Éléments modifiables : Username, Description.
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../Register/Register.index";
import { AllUserPosts } from "./components/AllUserPosts";

const Profile = () => {
  const params = useParams();
  const me = useCurrentUser();
  const [myUsername, setMyUsername] = useState();
  const [myDescription, setMyDescription] = useState();

  const [userProfile, setUserProfile] = useState();

  const userId = params.userId;

  useEffect(() => {
    if (me && !userId) {
      setMyUsername(me.username);
      setMyDescription(me.description);
      setUserProfile(me);
    }
  }, [me, userId]);

  console.log("COMPOSANT PROFILE");
  useEffect(() => {
    console.log("User id", userId);
    if (userId) {
      fetch(`http://localhost:1337/users/${userId}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setUserProfile(response);
          console.log("userProfile = other", response);
        })
        .catch((error) => {
          console.log("An error occurred:", error);
        });
    } else {
      setUserProfile(me);
      console.log("UserProfile = me", me);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:1337/users/me", {
      method: "put",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: myUsername,
        description: myDescription,
      }),
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <div className="Profile">
      {userProfile ? (
        <div>
          <h1>Profil de {userProfile.username} </h1>
          <p>Description : {userProfile.description}</p>
        </div>
      ) : (
        "Chargement"
      )}
      {me && userProfile?.id === me?.id && (
        // siuserProfile existe, fais la comparaison
        <form id="profile-modifications-form" onSubmit={handleSubmit}>
          <label htmlFor="name">
            Username: <br />
            <input
              name="name"
              type="text"
              value={myUsername}
              onChange={(e) => setMyUsername(e.target.value)}
            />{" "}
            <br />
          </label>
          <label htmlFor="email">
            Votre description: <br />
            <input
              name="email"
              type="text"
              value={myDescription}
              onChange={(e) => setMyDescription(e.target.value)}
            />{" "}
            <br />
          </label>

          <button type="submit">Je modifie mon profil</button>
        </form>
      )}
      {userProfile && <AllUserPosts user={userProfile} />}
    </div>
  );
};

export default Profile;
