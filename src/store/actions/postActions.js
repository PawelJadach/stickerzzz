import apiUrl from '../../config/cfg';
import axios from 'axios';

export const GET_POSTS_REQUESTED = 'GET_POSTS_REQUESTED';
export const GET_POSTS_DONE = 'GET_POSTS_DONE';
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED';
export const SEND_POST_DONE = 'SEND_POST_DONE';
export const SEND_POST_FAILED = 'SEND_POST_FAILED';
export const SEND_POST_REQUESTED = 'SEND_POST_REQUESTED';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_POST = 'DELETE_POST';

export function getPostsRequested() {
  return {
    type: 'GET_POSTS_REQUESTED'
  };
}

export function sendPostRequested() {
  return {
    type: 'GET_POSTS_REQUESTED'
  };
}

export function getPostsDone(data) {
  return {
    type: 'GET_POSTS_DONE',
    payload: data
  };
}

export function getPostsFailed(error) {
  return {
    type: 'GET_POSTS_FAILED',
    payload: error
  };
}

export function addComment(userName, comment, avatar, postId) {
  return {
    type: 'ADD_COMMENT',
    userName, 
    comment, 
    avatar,
    postId
  };
}

export function deletePost(postId) {
  //dispatch({ type: 'REGISTER_NOTIFICATION_SWITCH', payload: true, text: 'Dodawanie postów aktualnie wyłączone' });
  return dispatch => {
    dispatch({ type: 'DELETE_POST', postId });
    dispatch({ type: 'REGISTER_NOTIFICATION_SWITCH', payload: true, text: 'Post usunięty!' });
  };
}

export function getPosts() {
  return dispatch => {
    // set state to "loading"
    dispatch(getPostsRequested());

    axios.get(`${apiUrl}api/Posts`)
      .then(res => {
        //console.log('data', res.data.posts);
        dispatch(getPostsDone(res.data.posts));
        })
      .catch(error => {
        console.log(error)
        dispatch(getPostsFailed(error));
      })
  }
}

export const sendPost = (data) => {
  console.log(data)
  return (dispatch, getState) => {
  dispatch(sendPostRequested());
  //dispatch({ type: 'REGISTER_NOTIFICATION_SWITCH', payload: true, text: 'Dodawanie postów aktualnie wyłączone' });
  axios.post(`${apiUrl}api/Posts`, {
      "Post": {
          "Title": data.title,
          "Content": data.content,
          "StickersData": [
            {
              "Name": data.title,
              "Longitude": Number(data.lon),
              "Latitude": Number(data.lat),
              "Img": data.img,
              "TagList": [
                ...data.tagList
              ]
            }
          ]
        }
      }
  )
    .then(function (res) {
        dispatch({ type: 'SEND_POST_DONE', res });
        dispatch({ type: 'REGISTER_NOTIFICATION_SWITCH', payload: true, text: 'Post dodany' });
        //console.log(getState());
        return true
    }).catch(function (err) {
        console.log(err.message)
        dispatch({ type: 'SEND_POST_FAILED', err });
        dispatch({ type: 'REGISTER_NOTIFICATION_SWITCH', payload: true, text: 'Post nie został dodany' });
        return false
    });

  }
}