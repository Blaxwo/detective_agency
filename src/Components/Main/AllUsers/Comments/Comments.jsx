import React, { useState } from "react";
import style from "./Comments.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../../../../Redux/commentsReducer';
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                date: new Date().toISOString()
            };
        }
        else{
            newComment = {
                author: currentUser.name,
                text: text,
                date: new Date().toISOString()
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
                    <h1>Add a <a className={certificateStyle.glosarij} href={links.glosarij_Comments} target="_blank">Comment</a></h1>
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
                    <h1><a className={certificateStyle.glosarij} href={links.glosarij_Comments} target="_blank">Comments</a></h1>
                    {comments.map((comment, index) => (
                        <div key={index} className={style.comment}>
                            <p><strong>Author:</strong> {comment.author}</p>
                            <p className={style.content}><strong>Content:</strong> {comment.text}</p>
                            <p><strong>Date:</strong> {comment.date}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.comments} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    );
}

export default Comments;
