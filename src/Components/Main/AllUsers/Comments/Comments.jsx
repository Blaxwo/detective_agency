import React, { useState } from "react";
import style from "./Comments.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../../../../Redux/commentsReducer';

const Comments = () => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.commentsPage.comments);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [author, setAuthor] = useState('');
    const [text, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let newComment;
        if(currentUser==null){
            newComment = {
                author: "Unknown",
                text: text,
                date: new Date().toISOString() // Пример даты, можно заменить на другой формат
            };
        }
        else{
            newComment = {
                author: currentUser.name,
                text: text,
                date: new Date().toISOString() // Пример даты, можно заменить на другой формат
            };
        }
        dispatch(addComment(newComment));
        setContent('');
    };

    return (
        <main className={style.main}>
            <h2>Comments</h2>
            <div className={style.commentsSection}>
                <div className={style.addComments}>
                    <h1>Add a Comment</h1>
                    <form className={style.commentForm} onSubmit={handleSubmit}>
                        <label htmlFor="text">Content:</label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className={style.commentList}>
                    <h1>Comments</h1>
                    {comments.map((comment, index) => (
                        <div key={index} className={style.comment}>
                            <p><strong>Author:</strong> {comment.author}</p>
                            <p className={style.content}><strong>Content:</strong> {comment.text}</p>
                            <p><strong>Date:</strong> {comment.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Comments;
