import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getStory } from '../../services/hnApi';
import { setIsUpdatingComments } from '../../store/storyReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Comment from '../../components/comment/comment';

import './postPage.css';

const PostPage = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const [story, setStory] = useState({});
    const isUpdatingComments = useSelector(state => state.isUpdatingComments);

    const btnStyle = {
        '--bs-btn-padding-y': '.25rem',
        '--bs-btn-padding-x': '.5rem', 
        '--bs-btn-font-size': '20px'
    }

    const updateComments = () => {
        dispatch(setIsUpdatingComments());
    }

    useEffect(() => {
        getStory(params.id).then(data => data && data.url  && setStory(data));
    }, [isUpdatingComments])

    return (
        <div className='page'>
            <Link to='/posts'><button type="button" className="btn btn-dark returnBtn" style={btnStyle}><i className="fa-solid fa-arrow-left"></i>Go to news</button></Link>
            <div className="page__title">{story.title}</div>
            <div className="page__wrapper">
                <div className="page__author">
                    <i className="fa-solid fa-user"></i>
                    <div className="text">{story.by}</div>
                </div>
                <div className="page__date">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text">
                        <div className="date">{`${new Date(story.time * 1000).getDate()}.${new Date(story.time * 1000).getMonth()}.${new Date(story.time * 1000).getFullYear()}`}</div>
                        <div className="time">{`${new Date(story.time * 1000).getHours()}:${new Date(story.time * 1000).getMinutes()}`}</div>
                    </div>
                </div>
            </div>
            <div className="page__url">URL: <a href={story.url}>{story.url}</a></div>
            <div className="page__wrapper">
                <div className="page__count">{story.descendants} comments</div>
                <button onClick={updateComments} type="button" className="btn btn-dark" style={btnStyle}><i className="fa-solid fa-rotate-right"></i>Update comments</button>
            </div>
            <hr/>
            <ul className="page__comments__wrapper">
                {story.kids ? story.kids.map(item => <Comment key={item} commentId={item}/> ) : <div className='no-comments'>No comments...</div>}
            </ul>
        </div>
    );
};

export default PostPage;