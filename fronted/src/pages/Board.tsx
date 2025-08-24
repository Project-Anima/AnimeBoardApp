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

    const formatDate = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 1) return "今";
        if (minutes < 60) return `${minutes}分前`;
        if (hours < 24) return `${hours}時間前`;
        return `${days}日前`;
    };

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
                <form onSubmit={handleSubmit} className="post-form">
                    <div className="post-input-row">
                        <img src={user.photoURL || ""} alt="Your icon" className="post-user-icon" />
                        <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="今何してる？" className="post-textarea" rows={3} maxLength={200} />
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
                {posts.length === 0 ? (
                    <div className="no-posts">
                        <p>まだ投稿がありません。最初の投稿をしてみましょう!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="post-item">
                            <div className="post-header">
                                <img 
                                    src={post.authorPhoto} 
                                    alt={post.authorName}
                                    className="post-author-icon"
                                />
                                <div className="post-author-info">
                                    <span className="post-author-name">{post.authorName}</span>
                                    <span className="post-date">{formatDate(post.createdAt)}</span>
                                </div>
                            </div>
                            <div className="post-content">
                                {post.content}
                            </div>
                        </div>
                    ))
                )}
            </div>

          </div>
        </div>
    );
}

export default Board;
