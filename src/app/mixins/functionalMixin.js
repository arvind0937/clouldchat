/**
 * Functional Mixin
 * A factory function to make functional mixins.
 *
 * http://raganwald.com/2015/06/17/functional-mixins.html
 */

const functionalMixin = ( behaviour ) => ( TargetClass ) => Object.assign( TargetClass.prototype, behaviour );

export default functionalMixin;
