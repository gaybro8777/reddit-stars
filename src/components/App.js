import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as posts from '../redux/modules/posts';
import * as user from '../redux/modules/user';
import './App.css';
import Login from './Login';
import Post from './Post';
import PostItem from './PostItem';

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const {
      posts: { activeIndex, data }
    } = this.props;

    return (
      <main className="App">
        <section className="top-nav">
          <h2>EaseIt</h2>
          <nav>
            <ul>
              <li>

              </li>
            </ul>
          </nav>
          <Login />
        </section>
        <section className="container">
          <section className="left-nav">
            <ul>
            {data.map((v, i) =>
              <PostItem
                key={v.id}
                {...v}
                selected={activeIndex === i}
                handleClick={() => this.props.view(i)}
                handleStar={() => this.props.star(v.id)}
              />
            )}
            </ul>
          </section>
          <section className="content">
            { activeIndex === -1 ||
              <Post
                {...data[activeIndex]}
                handleStar={() => this.props.star(data[activeIndex].id)}
              />
            }
          </section>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ posts, user }, props) => {
  return {
    posts,
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(posts.fetchPosts()),
    view: (index) => dispatch(posts.view(index)),
    star: (index, id) => dispatch(posts.star(index, id)),
    login: (username, password) => dispatch(user.login(username, password)),
    logout: () => dispatch(user.logout()),
    register: (username, password) => dispatch(user.register(username, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
