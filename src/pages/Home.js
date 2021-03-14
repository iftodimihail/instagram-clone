import React, { useEffect, useState } from "react";
import Post from "components/common/Post";
import { auth, db } from "utils/firebase";

function Home() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, []);

  return posts.map((post) => (
    <Post key={post.id} {...post} user={auth.currentUser} />
  ));
}

export default Home;
