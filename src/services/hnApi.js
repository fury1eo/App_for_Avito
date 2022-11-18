import axios from "axios";
import { addStoryIds, load } from '../store/storyReducer';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
export const newStoriesUrl = `${baseUrl}newstories.json`;
export const storyUrl = `${baseUrl}item/`;

export const getStoryIds = () => {
    return async dispatch => {
        dispatch(load(true));

        const result = await axios.get(newStoriesUrl).then(({ data }) => data.slice(0, 100));
        dispatch(addStoryIds(result));

        dispatch(load(false));
    }
};

export const getStory = async storyId => {
    const result = await axios.get(`${storyUrl + storyId}.json`).then(({ data }) => data);
    return result;
}