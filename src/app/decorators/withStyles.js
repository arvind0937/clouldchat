import functionalMixin from '../mixins/functionalMixin';
import invariant from 'invariant';
import ExecutionEnvironment from 'exenv';
import _ from 'lodash';

const canUseDOM = ExecutionEnvironment.canUseDOM;
let count = 0;

/**
 * decorator to render static styles and provide utility function to render styles dynamically
 * @param stylesList List of static styles to be added
 * @param removeAnimationDuration duration after which the styles should be removed. Used for examples in facetFilters in planner where it animates before being removed from DOM
 * @returns {Function}
 */
function withStyles( stylesList, removeAnimationDuration ) {
  if ( stylesList && !_.isArray( stylesList ) ) {
    stylesList = [ stylesList ];
  }

  return function ( TargetClass ) {
    let componentWillMount = TargetClass.prototype.componentWillMount,
      componentWillUnmount = TargetClass.prototype.componentWillUnmount;

    functionalMixin( {
      renderCss( css, skipIfPresent ) {
        let style;
        if ( canUseDOM ) {
          //Check if a static property exists on class being decorated to avoid creating duplicate styles when not required
          let styleId = TargetClass.styleId || this.styleId;
          if ( styleId ) {
            this.userDefinedStyleId = true;
          }
          if ( styleId && (style = document.getElementById( styleId )) ) {
            if ( skipIfPresent ) {
              return;
            }
            if ( 'textContent' in style ) {
              style.textContent = css;
            } else {
              style.styleSheet.cssText = css;
            }
          } else {
            this.createNewStyle( css );
          }
        } else {
          this.onInsertCss( css );
        }
      },

      componentWillMount() {
        if ( canUseDOM ) {
          if ( stylesList ) {
            stylesList.forEach( styles => {
              invariant( styles.use, `The style-loader must be configured with reference-counted API.` );
              styles.use();
            } );
          }
        } else {
          this.onInsertCss( stylesList.toString() );
        }
        if ( componentWillMount ) {
          componentWillMount.call( this );
        }
      },

      componentWillUnmount() {
        if ( componentWillUnmount ) {
          componentWillUnmount.call( this );
        }

        if ( removeAnimationDuration ) {
          setTimeout( ()=> {
            this.removeStyles();
          }, removeAnimationDuration );
        } else {
          this.removeStyles();
        }

      },

      removeStyles() {
        if ( stylesList ) {
          stylesList.forEach( styles => {
            styles.unuse();
          } );
        }

        if ( this.styleId ) {
          if ( _.isUndefined( this.refCount ) ) {
            this.refCount = 0;
          }
          this.refCount--; // eslint-disable-line space-unary-ops
          if ( this.refCount < 1 && !this.userDefinedStyleId ) {
            let style = document.getElementById( this.styleId );
            if ( style ) {
              style.parentNode.removeChild( style );
            }
          }
        }
      },

      createNewStyle( css ) {
        let style = document.createElement( 'style' ),
          styleId = this.styleId;

        if ( !styleId ) {
          this.styleId = styleId = TargetClass.styleId || `dynamic-css-${count++}`;
        }

        style.setAttribute( 'id', styleId );
        style.setAttribute( 'type', 'text/css' );

        if ( 'textContent' in style ) {
          style.textContent = css;
        } else {
          style.styleSheet.cssText = css;
        }

        document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );
        if ( _.isUndefined( this.refCount ) ) {
          this.refCount = 0;
        }
        this.refCount++; // eslint-disable-line space-unary-ops
      }

    } )( TargetClass );
  };

}

export default withStyles;
