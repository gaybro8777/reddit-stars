import React, { Component } from 'react';
import { connect } from 'react-redux';
import jquery from 'jquery';
import * as posts from '../redux/modules/posts';
import * as user from '../redux/modules/user';
import './App.css';
import Login from './Login';
import Post from './Post';
import PostItem from './PostItem';

window.$ = window.jQuery = jquery;

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleStarredOnly = this.toggleStarredOnly.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
    this.state = {
      starredOnly: false
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
    jquery( ".cross" ).hide();
    jquery( ".menu" ).hide();
    jquery( ".hamburger" ).click(function() {
      jquery( ".menu" ).slideToggle( "slow", function() {
        jquery( ".hamburger" ).hide();
        jquery( ".cross" ).show();
      });
    });

    jquery( ".cross" ).click(function() {
      jquery( ".menu" ).slideToggle( "slow", function() {
        jquery( ".cross" ).hide();
        jquery( ".hamburger" ).show();
      });
    });
  }

  toggleStarredOnly() {
    this.setState({
      starredOnly: !this.state.starredOnly
    });
  }

  toggleStar(id) {
    const data = this.props.posts.data.filter(v => v.id === id);
    if(data.shift().starred) {
      this.props.unstar(id);
    }
    else {
      this.props.star(id);
    }
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
        <section className="top-nav responsive">
          <div className="logo">
            <h2>Reddit Stars</h2>
              <button className="hamburger">&#9776;</button>
              <button className="cross">&#735;</button>
            <div className="menu">
              <label>
                <input
                  name="starred"
                  type="checkbox"
                  onClick={this.toggleStarredOnly}
                />
                View Starred Only
              </label>
              <Login />
            </div>
          </div>
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
                handleStar={() => this.toggleStar(v.id)}
              />
            )}
            </ul>
          </section>
          <section className="content">
            { activeIndex === -1 ||
              <Post
                {...data[activeIndex]}
                handleStar={() => this.toggleStar(data[activeIndex].id)}
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
    star: (id) => dispatch(posts.star(id)),
    unstar: (id) => dispatch(posts.unstar(id)),
    login: (username, password) => dispatch(user.login(username, password)),
    logout: () => dispatch(user.logout()),
    register: (username, password) => dispatch(user.register(username, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
