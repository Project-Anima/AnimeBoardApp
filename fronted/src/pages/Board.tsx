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
          <div className="board-content">
            {/* 投稿フォーム */}
            <div className="post-form-container">
                <form className="post-form">
                    <div className="post-input-row">
                        <img src={user.photoURL || ""} alt="Your icon" className="post-user-icon" />
                        <textarea value="" className="post-textarea" rows={3} maxLength={200} />
                    </div>
                    <div className="post-actions">
                        <span className="char-count">

                        </span>
                        <button type="submit" className="post-button">投稿</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
    );
}

export default Board;
