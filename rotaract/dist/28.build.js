(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{612:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(34);function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.default=function(e){var t=i(Object(r.useState)(""),2),n=t[0],u=t[1],l=i(Object(r.useState)(""),2),c=l[0],s=l[1],p=Object(o.b)();return a.a.createElement("div",{className:"Login-form"},a.a.createElement("form",{onSubmit:function(t){t.preventDefault(),fetch("api/authenticate ",{method:"POST",body:JSON.stringify({username:n,password:c}),headers:{"Content-Type":"application/json"}}).then((function(t){if(200!==t.status)throw new Error(t.errror);p({type:"SIGNIN"}),e.history.push("/")})).catch((function(e){console.log(e),alert("Error logging in please try again")}))},className:"Login"},a.a.createElement("h1",null,"Login Below!",e.isLogged),a.a.createElement("input",{type:"text",name:"username",placeholder:"Username",value:n,onChange:function(e){u(e.target.value)},required:!0}),a.a.createElement("input",{type:"password",name:"password",placeholder:"Enter password",value:c,onChange:function(e){s(e.target.value)},required:!0}),a.a.createElement("input",{type:"submit",value:"Submit"})))}}}]);