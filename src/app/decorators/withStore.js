/**
 * Inspired from: Reflux + React + ES7 decorators - https://gist.github.com/oriSomething/36492428024fb284bcdd
 */
import functionalMixin from '../../mixins/functionalMixin';
import _ from 'lodash';

const
  unsubscribes = new Map(),

  withStore = ( ...stores ) => {

    return function ( TargetClass ) {
      let componentWillMount = TargetClass.prototype.componentWillMount,
        componentDidMount = TargetClass.prototype.componentDidMount,
        componentWillUnmount = TargetClass.prototype.componentWillUnmount;

      functionalMixin( {

        subscribeToStore( Store, Actions ) {
          let that = this,
            store;

          that.store = store = Store.createStore( (that.actions = Actions.createActions()) );

          if ( !store.getInitialState ) {
            return;
          }
          that.state = that.state || {};
          Object.assign( that.state, store.getInitialState() );
        },

        componentWillMount() {
          if ( componentWillMount ) {
            componentWillMount.call( this );
          }

          this._handleStateFromStores();
        },

        componentDidMount() {
          this._handleStoreSubscriptions();

          if ( componentDidMount ) {
            componentDidMount.call( this );
          }
        },

        componentWillUnmount() {
          if ( componentWillUnmount ) {
            componentWillUnmount.call( this );
          }

          this._handleStoreUnsubscriptions();
        },

        _handleStateFromStores() {
          let that = this,
            storesState = _.chain( stores )
              .pluck( 'getInitialState' )
              .filter( _.isFunction )
              .map( f => f() )
              .value();

          that.state = that.state || {};
          Object.assign( that.state, ...storesState );
        },

        _handleStoreSubscriptions() {
          let that = this,
            storesUnsubscribes = _.map( stores, ( store ) => store.listen( that.setState.bind( that ) ) ),
            componentUnsubscribes;

          if ( that.store ) {
            storesUnsubscribes.push( that.store.listen( that.setState.bind( that ) ) );
          }

          componentUnsubscribes = (
            unsubscribes.has( that ) ? unsubscribes.get( that ).concat( storesUnsubscribes ) : storesUnsubscribes
          );

          unsubscribes.set( that, componentUnsubscribes );
        },

        _handleStoreUnsubscriptions() {
          _.forEach( unsubscribes.get( this ), f => f() );
        }

      } )( TargetClass );
    };
  };

export default withStore;
