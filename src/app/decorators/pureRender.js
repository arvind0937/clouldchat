/**
 * Alternative to using PureRenderMixin with ES6 classes.
 * https://www.reddit.com/r/reactjs/comments/2ty0fd/react_v0130_beta_1_define_components_with_es6/
 * https://gist.github.com/AndrewIngram/089ce89a8c60f96317c0
 * https://gist.github.com/acdlite/453f227f5e5cbbf105f8
 *
 * Usage:
 * | class MyComponent extends React.Component {}
 * |
 * | pureRenderMixin(MyComponent);
 * |
 * | export default MyComponent;
 */
import mixin from 'app/mixins/decoratorMixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default mixin( PureRenderMixin );
