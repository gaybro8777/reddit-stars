import axios from 'axios';
import firebase from '../../firebase';
import {
  starPost as starForUser,
  unstarPost as unstarForUser
 } from './user';

// Actions
const LOAD         = 'easeit/posts/LOAD';
const VIEW         = 'easeit/posts/VIEW';
const STAR         = 'easeit/posts/STAR';
const UNSTAR       = 'easeit/posts/UNSTAR';
const UNSTAR_ALL   = 'easeit/posts/UNSTAR_ALL';

// Reducer
export default function reducer(state = {}, action = {}) {
  let post;
  let posts;
  let index;

  switch (action.type) {
    case LOAD:
      return {
        ...state,
        data: action.posts
      }
    case UNSTAR:
      index = state.data.findIndex(v => v.id === action.postId);
      if(index < 0) return state;

      post = Object.assign({}, state.data[index]);
      post.starred = false;

      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          post,
          ...state.data.slice(index + 1),
        ]
      }
    case UNSTAR_ALL:
      posts = Object.assign([], state.data);
      posts.forEach(x => { x.starred = false });

      return {
        ...state,
        data: posts
      }
    case STAR:
      index = state.data.findIndex(v => v.id === action.postId);
      if(index < 0) return state;

      post = Object.assign({}, state.data[index]);
      post.starred = true;

      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          post,
          ...state.data.slice(index + 1),
        ]
      }
    case VIEW:
      post = Object.assign({}, state.data[action.index]);
      return {
        ...state,
        activeIndex: action.index,
        currentPost: post
      }
    default: return state;
  }
}

// Action Creators
export function loadPosts(posts = []) {
  return { type: LOAD, posts };
}

export function unstarAll() {
  return { type: UNSTAR_ALL };
}

export function unstarPost(postId) {
  return { type: UNSTAR, postId };
}

export function starPost(postId) {
  return { type: STAR, postId };
}

export function view(index) {
  return { type: VIEW, index };
}

// Side effects
export function fetchPosts () {
  return dispatch =>
    axios.get('https://www.reddit.com/hot.json')
      .then(posts => {
        // console.log('raw posts', posts.data.data.children);
        const data = posts.data.data.children.map(v => ({
          author: v.data.author,
          title: v.data.title,
          thumbnail: v.data.thumbnail,
          thumbnail_height: v.data.thumbnail_height,
          thumbnail_width: v.data.thumbnail_width,
          id: v.data.id,
          created: v.data.created,
          num_comments: v.data.num_comments,
          permalink: v.data.permalink,
          url: v.data.url,
          ups: v.data.ups,
          starred: false
        }))
        dispatch(loadPosts(data));
      })
}

export function star (id) {
  return (dispatch, getState) => {
    dispatch(starPost(id));
    dispatch(starForUser(id));

    const state = getState();
    const token = state.user.token;
    const authenticated = state.user.authenticated
    if (authenticated) {
      firebase.database()
        .ref('starred')
        .child(token)
        .set(state.user.starred);
    }
  }
}

export function unstar (id) {
  return (dispatch, getState) => {
    dispatch(unstarPost(id));
    dispatch(unstarForUser(id));

    const state = getState();
    const token = state.user.token;
    const authenticated = state.user.authenticated
    if (authenticated) {
      firebase.database()
        .ref('starred')
        .child(token)
        .set(state.user.starred);
    }
  }
}


export function fetchStarredPosts () {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;

    firebase.database()
      .ref(`starred/${token}`)
      .once('value', postIds => {
        const starred = [];
        postIds.forEach(id => {
          const val = id.val();
          starred.push(val);
          dispatch(starPost(val));
          dispatch(starForUser(val));
        });
        // console.log('loaded ', starred.length, 'records');

        // setTimeout(() => {
        //   const postIds = postId.val() || [];
        //   dispatch(receiveStarredPosts(postIds));
        // }, 0);
      });
  }
}

// export function receiveStarredPosts (postIds) {
//   return dispatch => {
//     console.log('recvd', postIds);
//     Object.values(postIds).forEach(postId => {
//       dispatch(starPost(postId));
//       dispatch(starForUser(postId));
//     });
//   }
// }
