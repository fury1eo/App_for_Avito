import { useEffect } from 'react';
import { getStoryIds } from '../../services/hnApi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpdatingStories, load } from '../../store/storyReducer';
import Post from '../../components/post/post';

import './posts.css';

const Posts = () => {

    const dispatch = useDispatch();
    const storyIds = useSelector(state => state.storyIds);
    const isUpdatingStories = useSelector(state => state.isUpdatingStories);
    const loading = useSelector(state => state.loading);

    const btnStyle = {
        '--bs-btn-padding-y': '.25rem',
        '--bs-btn-padding-x': '.5rem', 
        '--bs-btn-font-size': '20px'
    }

    const updateNews = () => {
        dispatch(setIsUpdatingStories());
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(setIsUpdatingStories());
        }, 60000);

        dispatch(load(true));
        dispatch(getStoryIds());

        return () => clearInterval(intervalId);
    }, [isUpdatingStories]);


    return (
        <div className="posts">
            <button onClick={updateNews} type="button" className="btn btn-dark updateBtn" style={btnStyle}><i className="fa-solid fa-rotate-right"></i>Update news</button>
            {loading ? (
                <div className="d-flex justify-content-center spinner">
                    <div className="spinner-border m-5" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : null}
            <ul className='list-group'>
                {storyIds.map(storyId => <Post key={storyId} storyId={storyId}/>)}
            </ul>
        </div>
    );
};

export default Posts;