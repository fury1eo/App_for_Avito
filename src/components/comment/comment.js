import React from 'react';

import { useState, useEffect } from 'react';
import { getStory } from '../../services/hnApi';

import './comment.css';

const Comment = ({ commentId }) => {

    const [commentBody, setCommentBody] = useState({});
    const [repliesIds, setRepliesIds] = useState([]);

    const getReplies = () => {
        return commentBody.kids ? setRepliesIds(commentBody.kids) : null
    }

    const getDate = () => {
        const commentTime = new Date().getTime() - new Date(commentBody.time * 1000).getTime();
        const days = Math.floor(commentTime / 1000 / 60 / 60 / 24);
        const hours = Math.floor(commentTime / 1000 / 60 / 60) - days * 24;
        const minutes = Math.floor(commentTime / 1000 / 60) - hours * 60;

        let date = '';

        if (days > 0) {
            date = `${days} days ago`;
        } else if (hours > 0 && days === 0) {
            date = `${hours} hours ago`;
        } else if (hours === 0 && days === 0) {
            date = `${minutes} minutes ago`;
        }
        return date;
    }

    useEffect(() => {
        getStory(commentId).then(data => data && setCommentBody(data));
    }, [])

    return commentBody.deleted || commentBody.dead ? null : (
        <li onClick={getReplies} className='comment-block'>
            <div className="comment">
                <div className="comment__wrapper">
                    <div className="comment__author">
                        <i className="fa-sharp fa-solid fa-circle-user"></i>
                        <div className="name">{commentBody.by}</div>
                    </div>
                    <div onClick={getDate} className="comment__data">{getDate()}
                    </div>
                </div>
                <div className="comment__text">{commentBody.text}</div>
            </div>
            <ul className="replies">
                {repliesIds.map(item => <Comment key={item} commentId={item}/> )}
            </ul>
        </li>
    );
};

export default Comment;