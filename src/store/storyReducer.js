const defaultState = () => ({
    storyIds: [],
    loading: false,
    isUpdatingStories: false,
    isUpdatingComments: false,
});

const ADD_STORY_IDS = 'ADD_STORY_IDS';
const ADD_STORIES = 'ADD_STORIES';
const ADD_ROOT_COMMENTS = 'ADD_ROOT_COMMENTS';
const UPDATING_STORIES = 'UPDATING_STORIES';
const UPDATING_COMMENTS = 'UPDATING_COMMENTS';
const LOAD = 'LOAD';

export const storyReducer = (state = defaultState(), action) => {
    switch(action.type) {
        case ADD_STORY_IDS:
            return {...state, storyIds: [...action.payload]}
        case ADD_STORIES:
            return {...state, stories: [...action.payload]}
        case ADD_ROOT_COMMENTS:
            return {...state, currentStoryRootCommentsIds: [...action.payload]}
        case UPDATING_STORIES:
            return {...state, isUpdatingStories: !state.isUpdatingStories}
        case UPDATING_COMMENTS:
            return {...state, isUpdatingComments: !state.isUpdatingComments}
        case LOAD:
            return {...state, loading: action.payload}
        default:
            return state
    }
};

export const addStoryIds = (payload) => ({type: ADD_STORY_IDS, payload});
export const addStories = (payload) => ({type: ADD_STORIES, payload});
export const setIsUpdatingStories = () => ({type: UPDATING_STORIES});
export const setIsUpdatingComments = () => ({type: UPDATING_COMMENTS});
export const load = (payload) => ({type: LOAD, payload});
export const addRootComments = (payload) => ({type: ADD_ROOT_COMMENTS, payload});