import React, { Component } from 'react';

export default RenderableComponent => class extends Component {
  
  render() {
    const {rendered = true, ...rest} = this.props;
    return rendered && <RenderableComponent {...rest} />;
  }
};