import React from 'react';
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Anima</h1>
      <p className="home-subtitle">ようこそ！</p>
    </div>
  );
}

export default Home