import React  from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import '../styles/Board.css'

function Board() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    // 未ログインならHomeへ戻す
    React.useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <p>読み込み中...</p>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="board-container">
          <h1 className="board-title">掲示板ページ</h1>
        </div>
    );
}

export default Board;
