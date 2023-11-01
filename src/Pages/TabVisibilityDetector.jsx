import React, { Component } from 'react';

class TabVisibilityDetector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSwitchCount: 0,
    };
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.setState((prevState) => ({
        tabSwitchCount: prevState.tabSwitchCount + 1,
      }));
    }
  }

  render() {
    return null; 
  }
}

export default TabVisibilityDetector;
