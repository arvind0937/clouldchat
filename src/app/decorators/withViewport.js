import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import EventEmitter from 'eventemitter3';
import ExecutionEnvironment from 'exenv';

let EE;
let viewport = { width: 1366, height: 768 }; // Default size for server-side rendering
const W = window;
const D = document;
const RESIZE_EVENT = 'resize';
const canUseDOM = ExecutionEnvironment.canUseDOM;

function getDimensions() {
  let width = W.innerWidth,
    height = W.innerHeight,
    elSprNav = D.getElementsByClassName( 'sprNavContent' )[ 0 ],
    elSprHeader = D.getElementById( 'sprHeader' ) || {},
    dimensions = {
      width : width,
      height: height
    };

  if ( elSprNav ) {
    dimensions.workspace = {
      width : width - elSprNav.offsetWidth,
      height: height - elSprHeader.offsetHeight
    };
  }

  return dimensions;
}

function handleWindowResize() {
  if ( viewport.width !== W.innerWidth || viewport.height !== W.innerHeight ) {
    viewport = getDimensions();

    EE.emit( RESIZE_EVENT, viewport );
  }
}

function withViewport( ComposedComponent ) {
  return class WithViewport extends Component {

    static innerComponentRef = 'innerComponent';

    static displayName = (ComposedComponent.displayName && ComposedComponent.displayName.indexOf( '.' ) !== -1 ?
        ComposedComponent.displayName.substr( 0, ComposedComponent.displayName.indexOf( '.' ) ) :
        ComposedComponent.name) + '.';

    constructor() {
      super();

      this.state = {
        viewport: canUseDOM ? getDimensions() : viewport
      };
    }

    componentDidMount() {
      if ( !EE ) {
        EE = new EventEmitter();
        W.addEventListener( 'resize', handleWindowResize );
        W.addEventListener( 'orientationchange', handleWindowResize );
      }
      EE.on( 'resize', this.handleResize, this );

      this.setState( {
        viewport: canUseDOM ? getDimensions() : viewport
      } );
    }

    componentWillUnmount() {
      EE.removeListener( RESIZE_EVENT, this.handleResize, this );
      if ( !EE.listeners( RESIZE_EVENT, true ) ) {
        W.removeEventListener( 'resize', handleWindowResize );
        W.removeEventListener( 'orientationchange', handleWindowResize );
        EE = null;
      }
    }

    render() {
      return (<ComposedComponent {...this.props} viewport={this.state.viewport} ref="innerComponent"/>);
    }

    handleResize( value ) {
      this.setState( { viewport: value } );
    }

  };
}

export default withViewport;
