import { auth } from "./firebase-config";
const MainPage = () => {
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div>
      <p className="">
        go to profile <a href="/profile">profile</a>
      </p>
      <p className="">
        go to blog <a href="/blog">blog</a>
      </p>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default MainPage;
