import { db, storage, auth } from "./firebase-config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  ref,
  uploadBytes,
  getDownloadURL,
  setDoc,
  getDoc
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";

export const fetchUserData = async (setUserDetails) => {
  auth.onAuthStateChanged(async (user) => {
    console.log(user);
    if (user) {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("No user data found");
      }
    } else {
      console.log("User is not logged in");
    }
  });
};

export const handleLogout = async () => {
  try {
    await auth.signOut();
    window.location.href = "/main";
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

export const handleRegister = async (email, password, fname, lname) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: "",
      });
    }
    console.log("User Registered Successfully!!");
    toast.success("User Registered Successfully!!", {
      position: "top-center",
    });
  } catch (error) {
    console.log(error.message);
    toast.error(error.message, {
      position: "bottom-center",
    });
  }
};

export const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in Successfully");
    window.location.href = "/main";
    toast.success("User logged in Successfully", {
      position: "top-center",
    });
  } catch (error) {
    console.log(error.message);
    toast.error(error.message, {
      position: "bottom-center",
    });
  }
};

// Function to create content
export const createContent = async (
  newTitle,
  newContent,
  newImage,
  userDetails,
  usersCollectionRef
) => {
  if (newImage == null) return;

  // Create a storage reference
  const imageRef = ref(storage, `images/${newImage.name}`);

  // Upload the image
  await uploadBytes(imageRef, newImage);
  const imageUrl = await getDownloadURL(imageRef);

  // Add the new document to Firestore
  await addDoc(usersCollectionRef, {
    name: userDetails.firstName,
    title: newTitle,
    content: newContent,
    imageUrl: imageUrl,
    timestamp: serverTimestamp(),
  });
};

// Function to delete content
export const deleteContent = async (id) => {
  const userDoc = doc(db, "Blog", id);
  await deleteDoc(userDoc);
};

// Function to update content
export const updateContent = async (id, content) => {
  const userDoc = doc(db, "Blog", id);
  const newMessage = { content: "No Edit" };
  await updateDoc(userDoc, newMessage);
};
