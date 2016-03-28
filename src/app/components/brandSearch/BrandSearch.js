import React, { Component, PropTypes } from 'react';

let
  getHeaderText = () => {
    return (
      <div>
      <div className="b-s-header scp">Social Rank</div>
      <div className="b-s-subheader scp">Find out how brands are performing in social</div>
      </div>

    );
  };

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {


    return (
      <div>
        {getHeaderText()}
      </div>
    );
  }

}
