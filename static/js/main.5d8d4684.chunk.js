(this.webpackJsonpdescent_web=this.webpackJsonpdescent_web||[]).push([[0],{33:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),r=a(14),i=a.n(r),c=a(6),o=(a(33),a(2)),l=a(20),u=a.n(l),j=(a(52),a(7)),d=a(8),h=a(10),b=a(9),p=(a(53),a(1)),m=function(e){Object(h.a)(a,e);var t=Object(b.a)(a);function a(){return Object(j.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return Object(p.jsx)(c.b,{to:this.props.route,children:Object(p.jsx)("div",{className:"menulink",children:this.props.label})})}}]),a}(s.Component),O=m,g=(a(55),function(e){Object(h.a)(a,e);var t=Object(b.a)(a);function a(){return Object(j.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"startmenu background",children:[Object(p.jsx)(O,{route:"/campaign",label:"Start Campaign"}),Object(p.jsx)(O,{route:"/campaign",label:"Join Campaign"}),Object(p.jsx)(O,{route:"/settings",label:"Settings"}),Object(p.jsx)(O,{route:"/logout",label:"Logout"})]})}}]),a}(s.Component)),x=g;function f(){var e=!1;return sessionStorage.getItem("sessionData")&&(e=!0),e}a(56);var v=function(e){Object(h.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(j.a)(this,a),(s=t.call(this,e)).state={redirect:""},s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){console.log("start:componentDidMount"),f||this.setState({redirect:"/login"})}},{key:"render",value:function(){return this.state.redirect?(console.log("redirect to: ",this.state.redirect),Object(p.jsx)(o.a,{replace:!0,to:this.state.redirect})):Object(p.jsx)("div",{className:"startpage",children:Object(p.jsx)("div",{className:"startcover",children:Object(p.jsx)(x,{})})})}}]),a}(n.a.Component),w=a(17),C=a(11),N=a(13);function y(){var e=u.a.create({baseURL:"https://europe-west3-extended-line-332107.cloudfunctions.net/descent_app"});return e.defaults.headers.post["Content-Type"]="application/json",e.defaults.headers.put["Content-Type"]="application/json",e}function S(e,t,a){return y().post(e,t,a)}a(59);var k=function(e){Object(h.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(j.a)(this,a),(s=t.call(this,e)).state={email:"",username:"",password:"",password_confirmation:"",errors:{},redirect:""},s.handleSubmit=s.handleSubmit.bind(Object(C.a)(s)),s.handleChange=s.handleChange.bind(Object(C.a)(s)),s}return Object(d.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(w.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){var t,a=this,s={};this.formIsValid()&&(console.log("Submit form"),(t={email:this.state.email,username:this.state.username,password:this.state.password},S("/users",t)).then((function(e){console.log("Registration response",e.data),a.setState({redirect:"/login"}),N.a.success("Registration successful. Please log in.")})).catch((function(e){console.log(e.response.data),s.register=e.response.data.errorMessage,N.a.error(e.response.data.errorMessage)})),this.setState({email:"",username:"",password:"",password_confirmation:""})),e.preventDefault()}},{key:"formIsValid",value:function(){var e=!0,t={};return this.state.password&&this.state.password_confirmation&&this.state.password!==this.state.password_confirmation&&(t.password="No match!",e=!1),this.setState({errors:t}),e}},{key:"render",value:function(){return this.state.redirect?Object(p.jsx)(o.a,{replace:!0,to:this.state.redirect}):Object(p.jsx)("div",{className:"box",children:Object(p.jsxs)("form",{className:"registrationform",onSubmit:this.handleSubmit,children:[Object(p.jsx)("input",{className:"input",type:"email",name:"email",placeholder:"Email",value:this.state.email,onChange:this.handleChange,required:!0}),Object(p.jsx)("input",{className:"input",type:"text",name:"username",placeholder:"Username",value:this.state.username,onChange:this.handleChange,required:!0}),Object(p.jsx)("input",{className:"input",type:"password",name:"password",placeholder:"Password",value:this.state.password,onChange:this.handleChange,required:!0}),Object(p.jsx)("span",{className:"errortext",children:this.state.errors.password}),Object(p.jsx)("input",{className:"input",type:"password",name:"password_confirmation",placeholder:"Password Confirmation",value:this.state.password_confirmation,onChange:this.handleChange,required:!0}),Object(p.jsx)("span",{className:"errortext",children:this.state.errors.password}),Object(p.jsx)("button",{className:"registerbutton",type:"submit",children:"Register"})]})})}}]),a}(s.Component);a(60);var _=function(){return Object(p.jsx)("div",{className:"registerpage",children:Object(p.jsx)("div",{className:"registercover",children:Object(p.jsx)(k,{})})})};a(61);var D=function(e){Object(h.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(j.a)(this,a),(s=t.call(this,e)).state={email:"",password:"",loginErrors:"",redirect:""},s.handleSubmit=s.handleSubmit.bind(Object(C.a)(s)),s.handleChange=s.handleChange.bind(Object(C.a)(s)),s}return Object(d.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(w.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){var t,a=this;console.log("Login attempt"),(t={email:this.state.email,password:this.state.password},S("/sessions",t)).then((function(e){var t;e.data&&(console.log("Login response",e.data),t=e.data,sessionStorage.setItem("sessionData",t),a.setState({redirect:"/start"}),N.a.success("Welcome "+e.data.username+"!"))})).catch((function(e){console.log(e.response.data),N.a.error(e.response.data.errorMessage)})),e.preventDefault(),this.setState({email:"",password:""})}},{key:"render",value:function(){return this.state.redirect?Object(p.jsx)(o.a,{replace:!0,to:this.state.redirect}):Object(p.jsxs)("div",{className:"box",children:[Object(p.jsxs)("form",{className:"loginform",onSubmit:this.handleSubmit,children:[Object(p.jsx)("input",{className:"input",type:"email",name:"email",placeholder:"Email",value:this.state.email,onChange:this.handleChange,required:!0}),Object(p.jsx)("input",{className:"input",type:"password",name:"password",placeholder:"Password",value:this.state.password,onChange:this.handleChange,required:!0}),Object(p.jsx)("button",{type:"submit",className:"loginbutton",children:"Login"})]}),Object(p.jsx)(c.b,{to:"/register",children:Object(p.jsx)("div",{className:"label-register",children:"Register"})})]})}}]),a}(s.Component);a(62);var q=function(){return Object(p.jsx)("div",{className:"loginpage",children:Object(p.jsx)("div",{className:"logincover",children:Object(p.jsx)(D,{})})})},I=function(e){Object(h.a)(a,e);var t=Object(b.a)(a);function a(){return Object(j.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return sessionStorage.removeItem("sessionData"),Object(p.jsx)(o.a,{replace:!0,to:"/login"})}}]),a}(s.Component);a(63);var L=function(){return Object(p.jsxs)("div",{className:"campaign",children:[Object(p.jsx)("h3",{children:"Campain"}),"Campaign"]})};function M(e){var t=e.children;return f()?t:Object(p.jsx)(o.a,{to:"/login",replace:!0})}var R=function(){return Object(p.jsx)("div",{})};function E(){return Object(p.jsxs)("div",{children:[Object(p.jsx)("h2",{children:"Nothing to see here!"}),Object(p.jsx)("p",{children:Object(p.jsx)(c.b,{to:"/",children:"Go to the start page"})})]})}var P=function(){return Object(p.jsx)("div",{className:"app",children:Object(p.jsxs)(o.d,{children:[Object(p.jsx)(o.b,{path:"/",element:Object(p.jsx)(q,{}),children:Object(p.jsx)(o.b,{path:"*",element:Object(p.jsx)(E,{})})}),Object(p.jsx)(o.b,{path:"/login",element:Object(p.jsx)(q,{})}),Object(p.jsx)(o.b,{path:"/logout",element:Object(p.jsx)(I,{})}),Object(p.jsx)(o.b,{path:"/register",element:Object(p.jsx)(_,{})}),Object(p.jsx)(o.b,{path:"/start",element:Object(p.jsx)(M,{children:Object(p.jsx)(v,{})})}),Object(p.jsx)(o.b,{path:"/campaign",element:Object(p.jsx)(M,{children:Object(p.jsx)(L,{})})}),Object(p.jsx)(o.b,{path:"/test",element:Object(p.jsx)(R,{})})]})})};i.a.render(Object(p.jsx)(c.a,{children:Object(p.jsx)(P,{})}),document.getElementById("root"))}},[[64,1,2]]]);
//# sourceMappingURL=main.5d8d4684.chunk.js.map