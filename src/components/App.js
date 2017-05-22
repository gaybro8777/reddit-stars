import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as posts from '../redux/modules/posts';
import * as user from '../redux/modules/user';
import './App.css';
import Login from './Login';
import Post from './Post';
import PostItem from './PostItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleStarredOnly = this.toggleStarredOnly.bind(this);
    this.state = {
      starredOnly: false
    };
  }
  componentDidMount() {
    this.props.fetchPosts();
  }

  toggleStarredOnly() {
    this.setState({
      starredOnly: !this.state.starredOnly
    });
  }
  render() {
    const {
      posts: { activeIndex, data }
    } = this.props;

    return (
      <main className="App">
        <section className="top-nav">
          <div className="logo">
            <h2>Reddit Stars</h2>
            <label>
              <input
                name="starred"
                type="checkbox"
                onClick={this.toggleStarredOnly}
              />
              View Starred Only
            </label>
          </div>
          {/*
          <nav>
            <ul>
              <li>
              </li>
            </ul>
          </nav>
          */}
          <Login />
        </section>
        <section className="container">
          <section className="left-nav">
            <ul>
            {data
              .filter(v => {
                return this.state.starredOnly ? v.starred : v;
              })
              .map((v, i) =>
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
    // toggleStarredOnly: () => dispatch(posts.toggleStarredOnly()),
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
