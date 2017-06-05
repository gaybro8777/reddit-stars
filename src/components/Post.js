import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import star from '../star.svg'
import starHighlighted from '../star-highlighted.svg'

class Post extends PureComponent {
  static propTypes = {
    thumbnail: PropTypes.string,
    ups: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    starred: PropTypes.bool.isRequired,
    num_comments: PropTypes.number.isRequired,
    handleStar: PropTypes.func.isRequired
  }

  render () {
    return (
      <article className='post'>
        <header>
          <div className='upvotes'>
            <img
              className='thumb'
              src={this.props.starred ? starHighlighted : star}
              width='50'
              onClick={this.props.handleStar}
              alt='Star this item'
            />
            <h2>{this.props.ups}</h2>
          </div>
          <img
            className='thumb'
            src={this.props.thumbnail}
            width={this.props.thumbnail_width}
            height={this.props.thumbnail_height}
            alt='Thumbnail for post'
          />
          <div className='desc'>
            <span className='title'>{this.props.title}</span>
            <p className='link'>
              <a
                href={this.props.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {this.props.url}
              </a>
            </p>
            <p>
              comments:&nbsp;{this.props.num_comments}
            </p>
            <p>
              submitted by&nbsp;
              <a
                href={`https://reddit.com/u/${this.props.author}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {this.props.author}
              </a>
              &nbsp;on&nbsp;
              {`${new Date(this.props.created)}`}
            </p>
          </div>
        </header>
        <iframe title='Post details' src={this.props.url} />
      </article>
    )
  }
}

export default Post
