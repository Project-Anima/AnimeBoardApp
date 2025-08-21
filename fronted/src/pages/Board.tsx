import React, { useState }  from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import '../styles/Board.css'

interface Post {
    id: string;
    content: string;
    authorName: string;
    authorPhoto: string;
    createdAt: Date;
}

function Board() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [postContent, setPostContent] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);

    // 未ログインならHomeへ戻す
    React.useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!postContent.trim() || !user) return; 

        const newPost: Post = {
            id: Date.now().toString(),
            content: postContent.trim(),
            authorName: user?.displayName || "匿名ユーザー",
            authorPhoto: user?.photoURL || "",
            createdAt: new Date()
        };

        setPosts([newPost, ...posts])
        setPostContent("");
    }

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

            {/* {投稿一覧} */}
            <div className="posts-container">

            </div>

          </div>
        </div>
    );
}

export default Board;
