import { auth,db } from "./firebase-config";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const MainPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  function handlelogin() {
    window.location.href = "/login";
  }

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/main";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
          <p className="">
            go to profile <a href="/profile">profile</a>
          </p>
          <p className="">
            go to blog <a href="/blog">blog</a>
          </p>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>Please Login</p>
          <button className="btn btn-primary" onClick={handlelogin}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default MainPage;
