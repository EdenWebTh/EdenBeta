import './App.css';
import { useState, useEffect } from 'react';
import { db, storage, auth } from './firebase-config';
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { serverTimestamp, getDoc } from 'firebase/firestore';

function Blog() {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState(null);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "Blog");

  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User document does not exist");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const createContent = async () => {
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
      timestamp: serverTimestamp()
    });
  }

  const deleteContent = async (id) => {
    const userDoc = doc(db, "Blog", id);
    await deleteDoc(userDoc);
  }

  const updateContent = async (id, content) => {
    const userDoc = doc(db, "Blog", id);
    const newMessage = { content: "No Edit" };
    await updateDoc(userDoc, newMessage);
  };

  useEffect(() => {
    const q = query(usersCollectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, [usersCollectionRef]);

  function handlemain() {
    window.location.href = "/main";
  }

  return (
    <div className="App">
      <input placeholder='Title...' onChange={(event) => { setNewTitle(event.target.value) }} />
      <input placeholder='Content...' onChange={(event) => { setNewContent(event.target.value) }} />
      <input type="file" onChange={(event) => { setNewImage(event.target.files[0]) }} />
      <button onClick={createContent}>New message</button>
      <button className="btn btn-primary" onClick={handlemain}>back</button>
      <div className='content'>
        {users.map((user) => (
          <div className="card" key={user.id}>
            <div className="card-content">
              {user.imageUrl && <img src={user.imageUrl} alt={user.name} className="card-image" />}
              <div className="card-text">
                <h2>Title: {user.title}</h2>
                <p>name: {user.name}</p>
                <p>Content: {user.content}</p>
              </div>
            </div>
            <div className="card-buttons">
              <button onClick={() => { updateContent(user.id, user.content) }}>Edit</button>
              <button onClick={() => { deleteContent(user.id) }}>Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
