import React, { Component } from 'react';
import star from '../star.svg';
import starHighlighted from '../star-highlighted.svg';

class PostItem extends Component {
  render() {
    return (
      <li className={`post-item ${this.props.selected ? 'selected' : ''}`} onClick={this.props.handleClick}>
        <img
          className="thumb"
          src={this.props.starred ? starHighlighted : star}
          width="25"
          onClick={this.props.handleStar}
          alt="Star this item"
        />
        <div className="upvotes">
          {this.props.ups}
        </div>
       <p className="title">{this.props.title}</p>
        <div className="desc">

        </div>
      </li>
    );
  }
}

export default PostItem;
