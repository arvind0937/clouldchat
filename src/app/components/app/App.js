import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import DocumentTitle from 'react-document-title';
import withStyles from '../../decorators/withStyles';

import style from '../../scss/app.scss';


@withStyles( style )
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let
      content;

      if (this.props.children){
          content   = React.cloneElement( this.props.children );
      }


    return (
      <DocumentTitle title="Social Rank">
       <div id="sprApp">
         {content}
       </div>
     </DocumentTitle>
    );
  }

}
