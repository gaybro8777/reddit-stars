import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Post extends PureComponent {
  static propTypes = {
    thumbnail: PropTypes.string,
    ups: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }

  render() {
    return (
      <article className="post">
        <div className="upvotes">
          {this.props.ups}
        </div>
        <img
          className="thumb"
          src={this.props.thumbnail}
          width={this.props.thumbnail_width}
          height={this.props.thumbnail_height}
          alt="Thumbnail for post"
        />
        <div className="desc">
          <span className="title">{this.props.title}</span>
          &nbsp;
          <span className="link">
            <a href={this.props.url}>Link</a>
          </span>
          &nbsp;by&nbsp;
          <a
            href={`https://reddit.com/u/${this.props.author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.author}
          </a>
        </div>
        <iframe title="Post details" src={this.props.url} />
      </article>
    );
  }
}

export default Post;
