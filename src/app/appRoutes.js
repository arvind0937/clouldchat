import { Route } from "react-router";
import React from "react";
import _ from 'lodash';
import App from "./components/app";


let
  getComponents = (componentId, params,callback) => {
  if (componentId === 'brandSearch'){
        require.ensure( [], function ( require ) {
             callback( null, require( './components/brandSearch' ) );
           }, 'brandSearch' )
      }
  };

export default (
  <Route component={App} path="/ui">
    <Route path="brandSearch" getComponents={_.partial(getComponents,'brandSearch')} />
  </Route>
);
