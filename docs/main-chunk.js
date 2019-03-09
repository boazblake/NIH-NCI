(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(t,e,n){"use strict";(function(r){n.d(e,"a",function(){return t});var t={limits:[30,40,50,60,70,80,90,100],data:{},state:{url:"",route:"",scrollPos:1,limit:30,profile:""},reqs:{urls:["/posts","/comments","/albums","/photos","/todos","/users"].reduce(function(t,e){var n;return t[e]=(n=e,function(t,e){return"https://jsonplaceholder.typicode.com".concat(n,"?_start=").concat(t,"&_limit=").concat(e)}),t},{}),http:function(n){return function(e){return function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;return r.request({url:n,method:e,data:t})}}}},showModes:!1,showLimits:!1,showTabs:function(t){t.tabsShowing=!t.tabsShowing},tabsShowing:!1}}).call(this,n(0))},,,function(t,e,n){"use strict";(function(n){var t={view:function(t){var e=t.attrs.children;return n("section.content",{id:"content"},e)}};e.a=t}).call(this,n(0))},function(t,e,n){"use strict";(function(n){var t={view:function(t){var e=t.children;return n(".navigationModal",e)}};e.a=t}).call(this,n(0))},,,,function(t,e){},function(t,e){},function(t,e){},function(t,e,n){"use strict";n.r(e);var r=n(0),l=n.n(r),o=n(1),i=function(t){var e=t.attrs.model,n="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z",r="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z",o=function(t){return l.a.render(t,l()("path",{xmlns:"http://www.w3.org/2000/svg",d:e.tabsShowing?n:r}))};return{oncreate:function(t){var e=t.dom;return o(e)},onupdate:function(t){var e=t.dom;return o(e)},view:function(t){var e=t.attrs.model;return l()("svg.hamburger",{onclick:function(){return e.showTabs(e)}})}}},a=n(3);function s(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.n(a).a;var c=function(t){var e=t.dom;e.style.opacity=0,e.classList.toggle("slideRight"),e.style.opacity=1},u={onbeforeremove:function(t){var e=t.dom;return new Promise(function(){s(e.children).reverse().map(function(t,e){return setTimeout(function(){t.style.display="none"},100*e)})})},view:function(t){var r=t.attrs.model;return l()(".limits",r.limits.map(function(t,e){return l()("button.btn.limit",{oncreate:(n=e,function(t){var e=t.dom;e.style.opacity=0,setTimeout(function(){e.classList.toggle("slideDown"),e.style.opacity=1},200*(n+1))}),onclick:function(){r.state.limit=t,r.showLimits=!1},key:e},t);var n}))}},d={view:function(t){var e=t.attrs.model;return l()(".changeLimits",[l()("button.changeLimitBtn",{onclick:function(){return e.showLimits=!e.showLimits}},"Change Limit"),e.showLimits&&l()(u,{model:e})])}},m={view:function(t){var e=t.attrs.model;return l()("header.header",{id:"header"},[l()(i,{model:e}),l()(d,{model:e})])}},f={view:function(){return l()("footer.footer",{id:"footer"},"Footer")}},h=n(4),p=function(t){var n=t.attrs.key;return{view:function(t){var e=t.attrs.tab;return l()("a.tab",{key:n,id:"".concat(e),href:"".concat(e),oncreate:l.a.route.link},e.split("/")[1])}}},v=function(t){var e=t.attrs.model,r=Object.keys(e.reqs.urls);return{oncreate:c,view:function(t){var n=t.attrs.model;return l()("aside.sidebar slide-left",{id:"sidebar"},r.map(function(t,e){return l()(p,{key:e,active:n.state.route==t,tab:t})}))}}},w=n(5),g=function(t){var n=t.attrs.model;return{view:function(t){var e=t.children;return l()("section.layout",{id:"layout"},e?[l()(m,{model:n}),"phone"==n.state.profile?n.tabsShowing?l()(w.a,l()(v,{model:n})):null:l()(v,{model:n}),l()(h.a,{model:n,children:e}),l()(f,{model:n})]:[])}}},y=function(i){return function(t){i.state.route=t,i.data[t]?i.data[t]:i.data[t]={data:[],limit:1};var e,n,r,o=i.data[t].data.length;n=(r=i).reqs.urls[t](o,i.state.limit),e=t,l.a.request({url:n,method:"GET",extract:function(t){return r.data[e].limit=parseInt(t.getResponseHeader("x-total-count")),JSON.parse(t.responseText)}}).then(function(t){return r.data[e].data=r.data[e].data.concat(t),r})}},b=l()(".holder",{style:{width:"100%",height:"100%"}},[l()(".preloader",[l()("div"),l()("div"),l()("div"),l()("div"),l()("div"),l()("div"),l()("div")])]),k={view:function(t){var e=t.attrs,n=e.key,r=e.item,o=r.title,i=r.body;return l()(".grid-item.row.post",{style:{flexFlow:"row wrap",width:"60vw",display:"flex"},id:"post-".concat(n)},[l()("h1.left",o),l()("p.right",i)])}},L={view:function(t){var e=t.attrs,n=e.key,r=e.item,o=r.email,i=r.name,a=r.body;return l()(".grid-item.row.comment",{id:"comment-".concat(n),style:{flexFlow:"column wrap",width:"60vw",display:"flex"}},[l()("h1.left",i),l()("p.left",o),l()("p.left",a)])}},x={view:function(t){var e=t.attrs,n=e.key,r=e.item.title;return l()(".grid-item.album",{id:"album-".concat(n)},[l()("h1",r)])}},T={view:function(t){var e=t.attrs,n=e.key,r=e.item,o=r.title,i=r.thumbnailUrl;return l()(".grid-item.photo",{id:"photo-".concat(n),style:{flexFlow:"row wrap",width:"60vw",display:"flex"}},[l()("h1",{style:{padding:"4px",right:"auto",flex:3}},o),l()("img.left",{src:i})])}},S=function(t){var o=t.attrs.item.completed;return{view:function(t){var e=t.attrs,n=e.key,r=e.item.title;return l()(".grid-item.todo",{id:"todo-".concat(n),key:n},[l()("h1.left",r),l()("input[type=checkbox].right",{onclick:function(){o=!o},checked:o},"Done")])}}},q={view:function(){return l()("")},oncreate:function(t){var e=t.dom,n=t.attrs,r=n.key,o=n.item,i=o.email,a=o.name,s=o.phone,c=o.username,u=o.website;l.a.render(e,l()(".grid-item.user",{id:"user-".concat(r),key:r},[l()(".row",[l()("p.left",{for:"name"},"name"),l()("p.right",{name:"name"},a)]),l()(".row",[l()("p.left",{for:"email"},"email"),l()("p.right",{name:"email"},i)]),l()(".row",[l()("p.left",{for:"phone"},"phone"),l()("p.right",{name:"phone"},s)]),l()(".row",[l()("p.left",{for:"username"},"username"),l()("p.right",{name:"username"},c)]),l()(".row",[l()("p.left",{for:"website"},"website"),l()("p.right",{name:"website"},u)])]))}},A={view:function(t){var o,r=t.attrs.model,e=r.state.route,i=function(t){switch(t){case"/posts":return k;case"/comments":return L;case"/albums":return x;case"/photos":return T;case"/todos":return S;case"/users":return q}}(e),n=r.data[e].data;return l()("section.component",{id:"component",route:r.state.route,onscroll:(o=r,function(t){var e=o.state.route,n=o.data[e].data.length,r=10*n*o.state.scrollPos;t.target.scrollTop-o.state.scrollPos>=r&&(o.state.scrollPos++,t.target.scrollTop,n<o.data[e].limit&&y(o)(e))})},0==n.length?l()(".loader",b):n.map(function(t,e){return l()(i,{oncreate:(n=e,function(t){var e=t.dom;return e.style.opacity=0,setTimeout(function(){e.classList.toggle("stretchRight"),e.style.opacity=1},100*n+20)}),key:e,item:t,model:r});var n}))}},P=function(o){return{onmatch:function(t,e){return n=e,(r=o).state.scrollPos=1,r.tabsShowing=!1,y(r)(n);var n,r},render:function(){return l()(g,{model:o},l()(A,{model:o}))}}},j=(n(9),n(10),n(11),document.body);function F(t){return t<668?"phone":t<920?"tablet":"desktop"}var z,H=window.innerWidth;o.a.state.profile=F(H),function t(){var e=window.innerWidth;if(H!==e){H=e;var n=o.a.state.profile;o.a.state.profile=F(e),n!=o.a.state.profile&&l.a.redraw()}requestAnimationFrame(t)}(),l.a.route(j,"/posts",(z=o.a,{"/posts":P(z),"/comments":P(z),"/albums":P(z),"/photos":P(z),"/todos":P(z),"/users":P(z)}))}],[[12,1,2]]]);
//# sourceMappingURL=main-chunk.js.map