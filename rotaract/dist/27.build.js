(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{610:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return f}));var o=n(0),r=n.n(o);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=function(e){function t(){var e,n,o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,o=i(t).call(this),e=!o||"object"!==a(o)&&"function"!=typeof o?l(n):o,s(l(e),"handleInputChange",(function(t){var n=t.target,o=n.value,r=n.name;e.setState(s({},r,o))})),e.state={username:"",password:""},e.handleInputChange=e.handleInputChange.bind(l(e)),e.handleSubmit=e.handleSubmit.bind(l(e)),e}var n,o,f;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(t,e),n=t,(o=[{key:"handleSubmit",value:function(e){console.log(this.state.username),e.preventDefault(),fetch("/api/register",{method:"POST",body:JSON.stringify(this.state),headers:{"Content-Type":"application/json"}}).then((function(e){200===e.status&&console.log(e)})).catch((function(e){console.error(e)}))}},{key:"render",value:function(){return r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",null,"UserName:",r.a.createElement("input",{type:"text",name:"username",value:this.state.username,onChange:this.handleInputChange})),r.a.createElement("label",null,"Password:",r.a.createElement("input",{type:"text",name:"password",value:this.state.password,onChange:this.handleInputChange})),r.a.createElement("button",null,"Button"))}}])&&u(n.prototype,o),f&&u(n,f),t}(o.Component)}}]);