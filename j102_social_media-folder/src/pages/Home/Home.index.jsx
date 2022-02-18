// Si pas connecté:
// Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.
// + liste de posts (ou messages, j'alterne entre les deux mots pour ne pas faire trop de répétitions, mais un post et un message sont la même chose), mais ne peut pas voir qui les a écrits ni le nombre de likes qu'ils ont reçus.

// Si connecté:
// Pour commencer, un input de type text, dans laquelle il peut écrire un message, et qu'il peut poster grâce à un bouton. Sous cette partie qui permet d'écrire un message, l'utilisateur voit également l'ensemble des messages de tous les utilisateurs (lui compris) classés du plus récent au plus ancien. Au-dessus de chaque message, il peut voir qui a posté ce message.
// En cliquant sur le nom de la personne qui a posté ce message, il peut voir le profil de cette personne (/user/USERNAME_OF_THE_PERSON), tous les messages de cette personne, ainsi que ses informations (username et description).
// L'utilisateur peut aussi liker un message, ajoutant donc + 1 au nombre de likes déjà présent sur le post. Il peut aussi dé-liker un post.
// L'utilisateur peut supprimer un message qu'il a posté s'il le souhaite.

import React from "react";
import { useCurrentUser } from "../Register/Register.index";
import Feed from "./components/Feed/Feed.index";
import NewPostForm from "./components/NewPostForm/NewPostForm.index";

const Home = () => {
  const currentUser = useCurrentUser();

  return (
    <div className="Home">
      <h1>
        Welcome on My Social Network{" "}
        {currentUser ? currentUser.username : "Anonymous"}{" "}
      </h1>
      <p>
        This website is a training to Redux and React. We use auth and routing
        to create a small social media website.
      </p>
      {currentUser && <NewPostForm />}
      <Feed />
    </div>
  );
};

export default Home;
