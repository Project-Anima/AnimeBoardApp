import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
    setMenuOpen(false);
  };

  return (
    <header className="header">
      {/* {左側リンク} */}
      <nav className="nav-links">
        <Link to="/">ホーム</Link>
        <Link to="/Board">掲示板</Link>
      </nav>

      {/* {右側リンク} */}
      <div>
        {!user ? (
          <button onClick={signInWithGoogle}>Google サインイン</button>
        ) : (
          <div className="user-icon-wrapper">
            <img
              src={user.photoURL || ""}
              alt="User"
              className="user-icon"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
            {menuOpen && (
              <div className="dropdown">
                <button onClick={signOut}>サインアウト</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
