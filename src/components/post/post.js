import { useState, useEffect } from 'react';
import { getStory } from '../../services/hnApi';
import { Link } from "react-router-dom";

import './post.css';

const Post = ({ storyId }) => {

    const [story, setStory] = useState({});

    useEffect(() => {
        getStory(storyId).then(data => data && data.url  && setStory(data));
    }, [storyId]);

    return story && story.url ? (
        <li className="list-group-item">
            <div className="list-group-item-upper">
                <Link className="list-group-item-title" to={'/posts/' + storyId}>{story.title}</Link>
                <div className="list-group-item-date">
                    <div className="date">{`${new Date(story.time * 1000).getDate()}.${new Date(story.time * 1000).getMonth()}.${new Date(story.time * 1000).getFullYear()}`}</div>
                    <div className="time">{`${new Date(story.time * 1000).getHours()}:${new Date(story.time * 1000).getMinutes()}`}</div>
                </div>
            </div>
            <div className="list-group-item-wrapper">
                <div className="author">
                    <i className="fa-solid fa-user"></i>
                    <div className="list-group-item-subtitle">{story.by}</div>
                </div>
                <div className="score">
                    <i className="fa-solid fa-star"></i>
                    <div className="list-group-item-score">{story.score}</div>
                </div>
            </div>
        </li>
    ): null;
};

export default Post;