(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(t,e,n){"use strict";(function(r){n.d(e,"a",function(){return t});var t={sidebar:{isOpen:!0,modify:function(t){return!t.isOpen}},numItems:1,data:{},state:{url:"",route:""},reqs:{urls:["/posts","/comments","/albums","/photos","/todos","/users"].reduce(function(t,e){return t[e]="https://jsonplaceholder.typicode.com".concat(e),t},{}),http:function(n){return function(e){return function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;return r.request({url:n,method:e,data:t})}}}},userVm:function(t){return{address:t.address,key:t.key}},itemVm:function(t){return{item:t.item,key:t.key}}}}).call(this,n(0))},function(t,e){},function(t,e){},function(t,e,n){"use strict";n.r(e);var r,a=n(0),o=n(1),u=function(){var u={onhover:!1},i=function(t){t.stopPropagation(),u.onhover=!u.onhover};return{view:function(t){var e=t.attrs,n=e.active,r=e.tab,o=e.idx;return Object(a.default)("a.grid-item",{id:o,href:"".concat(r),oncreate:a.default.route.link,onmouseover:i,onmouseout:i,style:{textDecoration:"none",flexBasis:"20%",borderTop:n?"4px solid rgba(41,128,185 ,1)":!n&&u.onhover?"4px solid rgba(41,128,185 ,.5)":"",justifyContent:"center"}},r.split("/")[1])}}},i=function(t){var e=t.attrs.model,r=Object.keys(e.reqs.urls);return{view:function(t){var n=t.attrs.model;return Object(a.default)("header",{style:{display:"flex",alignContent:"center",justifyContent:"flex-start",height:"10vh",padding:"35px 20%"}},r.map(function(t,e){return Object(a.default)(u,{key:e,active:n.state.route==t,tab:t,idx:e})}))}}},d=function(){return{view:function(t){var e=t.attrs.model;return Object(a.default)("footer",{style:{height:"20vh"}},Object(a.default)("pre",JSON.stringify(e.data,null,4)))}}},c=function(t){var e=t.attrs.model;return{view:function(){return Object(a.default)("aside.slide-left",{style:{backgroundColor:"rgba(41,128,185 ,0.9)",flexGrow:1,width:e.sidebar.isOpen?"200px":"60px",height:"75vh"}},[Object(a.default)("button",{style:{width:"100%",height:"40px"},onclick:function(){e.sidebar.isOpen=!e.sidebar.isOpen}},e.sidebar.isOpen?"<<":">>"),Object(a.default)("button",{style:{width:"100%",height:"40px"},onclick:function(){e.numItems++}},e.sidebar.isOpen?"ADD":"+"),Object(a.default)("button",{style:{width:"100%",height:"40px"},onclick:function(){e.numItems--}},e.sidebar.isOpen?"REMOVE":"-")])}}},l=function(){return{view:function(t){var e=t.attrs,n=e.model,r=e.children;return Object(a.default)("section.body",{style:{display:"flex"}},[Object(a.default)(c,{model:n}),Object(a.default)(".container",{id:"container",style:{width:"100%",height:"80vh"}},r)])}}},s=function(t){var e=t.children,n=t.attrs.model;return console.log(e),{view:function(t){var e=t.children;return[Object(a.default)(i,{model:n}),Object(a.default)(l,{model:n,children:e}),Object(a.default)(d,{model:n})]}}},f=function(o){return function(t){var e,n,r;return o.state.route=t,o.data[t]?o.data[t]:o.data[t]=[],0==o.data[t].length&&(n=(r=o).reqs.urls[t],e=t,a.default.request({url:n,method:"GET"}).then(function(t){r.data[e]=t})),o}},m=function(t){var e=t.attrs,n=(t.idx,JSON.stringify(e,null,4));return{view:function(t){t.attrs,t.idx,t.model;return Object(a.default)("",{style:{flexGrow:1,margin:"10px",backgroundColor:"rgba(41,18,185 ,.2)",width:"150px",height:"150px"}},n)}}},h=function(){return{view:function(t){var e=t.attrs.model;return Object(a.default)("section.container",{style:{display:"flex",flexFlow:"wrap",justifyContent:"space-around",overflowY:"scroll",overflowX:"hidden",padding:"10px",backgroundColor:"rgba(41,128,185 ,.1)",height:"75vh"}},e.data[e.state.route].map(function(t,e){return Object(a.default)(m,{key:e,item:t})}))}}},b=(n(2),n(3),document.getElementById("app"));a.default.route(b,"/posts",(r=o.a,{"/posts":{onmatch:function(t,e){return f(r)(e)},render:function(){return Object(a.default)(s,{model:r},Object(a.default)(h,{model:r}))}},"/comments":{onmatch:function(t,e){return f(r)(e)},render:function(){return Object(a.default)(s,{model:r},Object(a.default)(h,{model:r}))}},"/albums":{onmatch:function(t,e){return f(r)(e)},render:function(){return Object(a.default)(s,{model:r},Object(a.default)(h,{model:r}))}},"/photos":{onmatch:function(t,e){return f(r)(e)},render:function(){return Object(a.default)(s,{model:r},Object(a.default)(h,{model:r}))}},"/todos":{onmatch:function(t,e){return f(r)(e)},render:function(t){return console.log("????",t),Object(a.default)(s,{model:r},Object(a.default)(h,{model:r}))}},"/users":{onmatch:function(t,e){return f(r)(e)},render:function(){return Object(a.default)(s,{model:r},Object(a.default)(h,{model:r}))}}}))}],[[4,1,2]]]);
//# sourceMappingURL=main-chunk.js.map