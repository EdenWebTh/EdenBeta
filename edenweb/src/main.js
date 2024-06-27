import { auth, db } from "./firebase-config";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const MainPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        fetchUserData(userAuth.uid);
      } else {
        setUser(null);
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    const docRef = doc(db, "Users", userId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
      window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h3>Welcome {userDetails?.firstName} 🙏🙏</h3>
          <p className="">
            Go to profile <a href="/profile">profile</a>
          </p>
          <p className="">
            Go to blog <a href="/blog">blog</a>
          </p>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>Please Login</p>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default MainPage;
