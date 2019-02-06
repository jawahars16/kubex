(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,n){},108:function(e,t,n){},163:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(10),o=n.n(i),c=(n(101),n(3)),u=n(4),l=n(7),s=n(5),m=n(8),p=n(38),d=n.n(p),h=n(13),f=n(20),g=n(84),y=(n(108),n(19)),E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SVC_ADDED":return Object(y.a)(e).concat([t.payload]);case"SVC_DELETED":return e.filter(function(e){return e.meta.name!==t.payload.meta.name});case"SVC_MODIFIED":return e.map(function(e){return e.meta.name===t.payload.meta.name?t.payload:e});default:return e}},v=n(26),b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"POD_ADDED":var n=t.payload;return n.state=O[t.payload.status.phase],Object(y.a)(e).concat([n]);case"POD_DELETED":return e.filter(function(e){return e.meta.name!==t.payload.meta.name});case"POD_MODIFIED":var a=t.payload;return a.state=O[t.payload.status.phase],e.map(function(e){return e.meta.name===t.payload.meta.name?a:e});case"SVC_DELETED":return e.filter(function(e){return e.service!==t.payload.meta.name});case"EVENT":var r=t.payload.reason,i=O[r];return i?e.map(function(e){return e.meta.name===t.payload.involved_object_name?Object(v.a)({},e,{state:i}):e}):e;case"METRICS":var o={cpu:t.payload.cpu,memory:t.payload.memory};return e.map(function(e){return e.meta.name===t.payload.pod?Object(v.a)({},e,{usage:o}):e});default:return e}},O={Running:"Running",FailedScheduling:"Failed",Unhealthy:"Failed",Failed:"Failed",BackOff:"Failed",CrashLoopBackOff:"Failed",Pending:"Pending",Killing:"NProgress",Pulling:"PProgress",Scheduled:"Running",Started:"Running"},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"NODE_ADDED":var n=t.payload;return Object(y.a)(e).concat([n]);case"NODE_DELETED":return e.filter(function(e){return e.name!==t.payload.name});case"NODE_MODIFIED":var a=t.payload;return e.map(function(e){return e.name===t.payload.name?a:e});default:return e}},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"DEP_ADDED":return Object(y.a)(e).concat([t.payload]);case"DEP_DELETED":return e.filter(function(e){return e.meta.name!==t.payload.meta.name});case"DEP_MODIFIED":return e.map(function(e){return e.meta.name===t.payload.meta.name?t.payload:e});default:return e}},D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"META":return Object(v.a)({},e,{resource:t.payload});default:return e}},w=Object(f.c)({meta:D,services:E,pods:b,nodes:j,deployments:k}),S=n(168),C=n(169),M=n(165),T=n(46),x="#F44336",W="#FF9800",P="#4CAF50",N="#9E9E9E",z="#8BC34A",A="#666666",_="#F7F7F7",F=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"getWidth",value:function(){return Math.max(document.body.scrollWidth,document.documentElement.scrollWidth,document.body.offsetWidth,document.documentElement.offsetWidth,document.documentElement.clientWidth)}},{key:"getHeight",value:function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.documentElement.clientHeight)}},{key:"componentDidMount",value:function(){var e=Object.assign({},this.props,{renderTo:this.el,units:this.props.displayValue,width:this.getWidth()/6*.9,height:200,minValue:0,startAngle:70,ticksAngle:220,valueBox:!1,maxValue:1,minorTicks:1,strokeTicks:!1,highlights:this.props.sections,highlightsWidth:30,ticksWidth:0,colorPlate:"#fff",borderShadowWidth:0,borders:!1,needleType:"arrow",needleColor:"black",needleWidth:1,needleCircleSize:10,needleCircleOuter:!0,needleCircleInner:!1,animationDuration:1500,animationRule:"linear",value:this.props.value,colorMajorTicks:"transparent",colorMinorTicks:"transparent",title:this.props.title,colorTitle:A,colorUnits:A,colorNumbers:"transparent"});this.gauge=new T.RadialGauge(e).draw()}},{key:"render",value:function(){var e=this;return this.gauge&&this.gauge.update({highlights:this.props.sections,value:this.props.value,units:this.props.displayValue}),r.a.createElement("canvas",{ref:function(t){e.el=t}})}}]),t}(a.Component),q=function(e,t){var n;try{var a=e();n=a||t}catch(r){n=t}return n},I=function(e){var t=e.request/e.capacity;return isNaN(t)?0:t},R=function(e){var t=e.usage/e.capacity,n=isNaN(t)?0:t;return n>1?1:n},V=function(e){var t=I(e),n=function(e){var t=e.limit/e.capacity,n=I(e);return t=t<n?n:t,isNaN(t)?0:t}(e),a=R(e);return{sections:[{from:0,to:t=t>=1?1:t,color:P},{from:t,to:n=(n=n>=1?1:n)<=0&&t<=0?1:n,color:W},{from:n,to:1,color:x}],usage:a}},B=function(e){var t,n=I(e),a=R(e);return{sections:[{from:0,to:n=n>=1?1:n,color:(t=n,t<=.7?P:t<=.9?W:x)},{from:n,to:1,color:_}],usage:a}},L=function(e,t){var n=0;return!e||e.length<=0?n:(e.forEach(function(e){return n+=q(function(n){return t(e)},0)}),n)},U=n(167),H=n(12),J={Running:P,Failed:x,Pending:N,PProgress:z,NProgress:W},G=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(s.a)(t).call(this,e))).state={ts:d()(n.props.created).fromNow()},n.classes=H({circle:!0,"inner-shadow":!0}),n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;setInterval(function(t){e.setState({ts:d()(e.props.created).fromNow()})},6e4)}},{key:"render",value:function(){return r.a.createElement(U.a,{title:this.props.name},r.a.createElement("div",{className:this.classes,style:{backgroundColor:J[this.props.status],margin:1}}))}}]),t}(a.Component),X=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:Object(v.a)({flex:1,flexDirection:"row",display:"flex"},this.props.style)},this.props.data.map(function(e){return r.a.createElement(G,{key:e.meta.id,name:e.meta.name,created:e.meta.created,status:e.state,request:e.request,limit:e.limit,usage:e.usage})}))}}]),t}(a.Component),K=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.cpu,n=e.memory,a=e.name,i=(e.ip,e.pods),o=V(t),c=V(n);i.filter(function(e){return"Running"===e.state}).length,i.length;return r.a.createElement("div",null,r.a.createElement(C.a,{span:8,style:{padding:3}},r.a.createElement("div",{style:{background:"white"}},r.a.createElement(S.a,null,r.a.createElement("div",{style:{fontSize:18,fontWeight:500,textAlign:"center",textTransform:"uppercase",marginTop:15,marginBottom:5}},a)),r.a.createElement(S.a,null,r.a.createElement(M.a,null,r.a.createElement(X,{data:i}))),r.a.createElement(S.a,{style:{marginTop:10}},r.a.createElement(C.a,{span:12},r.a.createElement(F,{sections:o.sections,value:o.usage,title:"CPU"})),r.a.createElement(C.a,{span:12},r.a.createElement(F,{sections:c.sections,value:c.usage,title:"Memory"}))),r.a.createElement(S.a,{style:{top:-80,left:-10}},r.a.createElement(C.a,{span:12,style:{textAlign:"center",fontSize:18}},"".concat(Math.round(100*o.usage),"%")),r.a.createElement(C.a,{span:12,style:{textAlign:"center",fontSize:18}},"".concat(Math.round(100*c.usage),"%"))))))}}]),t}(a.Component),$=function(e,t){return!t||t.length<=0?[]:t.filter(function(t){return e.pods.includes(t.meta.name)})},Q=function(e,t){if(e&&!(e.length<=0)&&t)return e.find(function(e){return t.node===e.name})},Y=function(e,t){if(t&&!(t.length<=0)&&e)return t.filter(function(t){return t.node===e.name})},Z=function(e,t,n){var a={capacity:0,request:0,limit:0,usage:0};if(!t||t.length<=0)return a;if(!n||n.length<=0)return a;var r=function(e){var t;return!e||e.length<=0?t:(e.reduce(function(e,n){var a=e.usage||{cpu:0},r=n.usage||{cpu:0};return a.cpu>r.cpu?(t=e,e):(t=n,n)}),t)}($(e,t)),i=Q(n,r),o=Y(i,t),c=function(e,t,n){var a=0;return!n||n.length<=0?0:e?(n.forEach(function(e){e.meta.name!==t.meta.name&&(a+=e.request.cpu||0)}),e.cpu-a):0}(i,r,o);return{capacity:q(function(e){return c},0),request:q(function(e){return r.request.cpu},0),limit:q(function(e){return r.limit.cpu},0),usage:q(function(e){return r.usage.cpu},0)}},ee=function(e,t,n){var a={capacity:0,request:0,limit:0,usage:0};if(!t||t.length<=0)return a;if(!n||n.length<=0)return a;var r=function(e){var t;return!e||e.length<=0?t:(e.reduce(function(e,n){var a=e.usage||{memory:0},r=n.usage||{memory:0};return a.cpu>r.cpu?(t=e,e):(t=n,n)}),t)}($(e,t)),i=Q(n,r),o=Y(i,t),c=function(e,t,n){var a=0;return!n||n.length<=0?0:e?(n.forEach(function(e){e.meta.name!==t.meta.name&&(a+=e.request.memory||0)}),e.memory-a):0}(i,r,o);return{capacity:q(function(e){return c},0),request:q(function(e){return r.request.memory},0),limit:q(function(e){return r.limit.memory},0),usage:q(function(e){return r.usage.memory},0)}},te=Object(h.b)(function(e,t){var n=e.services.find(function(e){return e.meta.name===t.name}),a=Z(n,e.pods,e.nodes),r=ee(n,e.pods,e.nodes),i=$(n,e.pods),o=i.filter(function(e){return"Running"===e.state}).length;return{name:n.meta.name,ip:n.ip,cpu:a,memory:r,hasWarning:i.length-o>0,podAvailability:"".concat(o," out of ").concat(i.length," pods available"),pods:i}})(K),ne=n(164),ae=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{width:"100%",height:"100%",backgroundColor:"white"}},r.a.createElement(C.a,{span:8}),r.a.createElement(C.a,{span:8},r.a.createElement(ne.a,{style:{marginTop:"45%"},description:r.a.createElement("h3",{style:{color:"gray"}},"Loading cluster data...")})),r.a.createElement(C.a,{span:8}))}}]),t}(a.Component),re=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.initialize()}},{key:"render",value:function(){return this.props.data&&0!==this.props.data.length?r.a.createElement("div",null,r.a.createElement(S.a,null,this.props.data.map(function(e){return r.a.createElement(te,{key:e.meta.key,name:e.meta.name})}))):r.a.createElement(ae,null)}}]),t}(a.Component),ie=function(e,t){var n=new WebSocket("ws://".concat(window.location.host,"/").concat(t));n.onopen=function(e){return console.log("Connected Socket")},n.onmessage=function(t){return oe(e,t)}},oe=function(e,t){var n=JSON.parse(t.data),a=n.resource;e({type:n.action,payload:a})},ce=Object(h.b)(function(e){return{data:e.services}},function(e){return{initialize:function(t){return ie(e,"service")}}})(re),ue=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=Object.assign({},this.props,{renderTo:this.el,width:150,height:230,minValue:0,maxValue:1,majorTicks:["0","0.95"],valueBox:!1,minorTicks:3,strokeTicks:!1,colorPlate:"#fff",borderShadowWidth:0,borders:!1,borderOuterWidth:0,borderInnerWidth:0,barBeginCircle:!1,tickSide:"right",numberSide:"right",needleSide:"left",needleShadow:!0,needleType:"arrow",needleWidth:15,needleStart:-70,needleEnd:20,colorNeedle:"#222",colorNeedleEnd:"#222",animationDuration:1500,animationRule:"linear",animationTarget:"plate",barWidth:6,ticksWidth:60,highlightsWidth:60,colorNumbers:"white, red",title:"CPU",fontNumbersSize:1,ticksWidthMinor:0,animateOnInit:!0,highlights:this.props.sections,value:this.props.value,fontTitleSize:1,colorBarProgress:this.props.value<.6?P:W});this.gauge=new T.LinearGauge(e).draw()}},{key:"render",value:function(){var e=this;return this.gauge&&this.gauge.update({highlights:this.props.sections,value:this.props.value,colorBarProgress:this.props.value<.6?P:W}),r.a.createElement("div",null,r.a.createElement("canvas",{style:{marginTop:0},ref:function(t){e.el=t}}))}}]),t}(a.Component),le=n(12),se=r.a.createElement("img",{src:"https://img.icons8.com/ios-glyphs/30/ffffff/exclamation-mark.png",alt:"warning",style:{width:20}}),me=r.a.createElement("img",{src:"https://img.icons8.com/ios-glyphs/30/ffffff/checkmark.png",alt:"success",style:{width:20}}),pe=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.cpu,n=e.memory,a=e.readyStatus,i=e.name,o=B(t),c=B(n);return this.classes=le({"circle-lg":!0,"inner-shadow":!0}),r.a.createElement("div",null,r.a.createElement(C.a,{span:8,style:{padding:3}},r.a.createElement("div",{style:{background:"white"}},r.a.createElement(S.a,{style:{top:10}},r.a.createElement("div",{className:this.classes,style:{backgroundColor:a?P:x,margin:"auto"}},a?me:se)),r.a.createElement(S.a,null,r.a.createElement(M.a,{style:{marginTop:0,top:15}},r.a.createElement("span",{style:{fontSize:14,fontWeight:500,textAlign:"center",textTransform:"uppercase",marginTop:15,marginBottom:5}},i))),r.a.createElement(S.a,{style:{top:10,zIndex:10}},r.a.createElement(C.a,{span:12,style:{textAlign:"center",fontSize:20}},r.a.createElement("b",null,Math.round(t.usage/t.capacity*100),"%")),r.a.createElement(C.a,{span:12,style:{textAlign:"center",fontSize:20}},r.a.createElement("b",null,Math.round(n.usage/n.capacity*100),"%"))),r.a.createElement(S.a,{style:{top:-15}},r.a.createElement(C.a,{span:12},r.a.createElement(ue,{sections:o.sections,value:o.usage,displayValue:"".concat(Math.round(100*o.usage),"%"),title:"CPU"})),r.a.createElement(C.a,{span:12},r.a.createElement(ue,{sections:c.sections,value:c.usage,displayValue:"".concat(Math.round(100*c.usage),"%"),title:"Memory"}))),r.a.createElement(S.a,{style:{top:-20}},r.a.createElement(C.a,{span:12,style:{textAlign:"center",fontSize:16}},"CPU"),r.a.createElement(C.a,{span:12,style:{textAlign:"center",fontSize:16}},"Memory")))))}}]),t}(a.Component),de=Object(h.b)(function(e,t){var n=Q(e.nodes,{node:t.name}),a=Y(n,e.pods);return{cpu:{request:L(a,function(e){return e.request.cpu}),capacity:n.cpu,usage:L(a,function(e){return e.usage.cpu})},memory:{request:L(a,function(e){return e.request.memory}),capacity:n.memory,usage:L(a,function(e){return e.usage.memory})},name:t.name,readyStatus:n.readyStatus}})(pe),he=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.initialize()}},{key:"render",value:function(){return this.props.data&&0!==this.props.data.length?r.a.createElement("div",null,r.a.createElement(S.a,null,this.props.data.map(function(e){return r.a.createElement(de,{key:e.name,name:e.name})}))):r.a.createElement(ae,null)}}]),t}(a.Component),fe=Object(h.b)(function(e){return{data:e.nodes}},function(e){return{initialize:function(t){return ie(e,"node")}}})(he),ge=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.cpu,n=e.memory,a=e.name,i=(e.ip,e.pods),o=V(t),c=V(n);return r.a.createElement("div",null,r.a.createElement(C.a,{span:8,style:{padding:3}},r.a.createElement("div",{style:{background:"white"}},r.a.createElement(S.a,null,r.a.createElement("div",{style:{fontSize:18,fontWeight:500,textAlign:"center",textTransform:"uppercase",marginTop:15,marginBottom:5}},a)),r.a.createElement(S.a,null,r.a.createElement(M.a,null,r.a.createElement(X,{data:i}))),r.a.createElement(S.a,{style:{marginTop:10}},r.a.createElement(C.a,{span:12},r.a.createElement(F,{sections:o.sections,value:o.usage,title:"CPU"})),r.a.createElement(C.a,{span:12},r.a.createElement(F,{sections:c.sections,value:c.usage,title:"Memory"}))),r.a.createElement(S.a,{style:{top:-80,left:-10}},r.a.createElement(C.a,{span:12,style:{textAlign:"center",fontSize:18}},"".concat(Math.round(100*o.usage),"%")),r.a.createElement(C.a,{span:12,style:{textAlign:"center",fontSize:18}},"".concat(Math.round(100*c.usage),"%"))))))}}]),t}(a.Component),ye=Object(h.b)(function(e,t){var n=e.deployments.find(function(e){return e.meta.name===t.name}),a=Z(n,e.pods,e.nodes),r=ee(n,e.pods,e.nodes),i=$(n,e.pods),o=i.filter(function(e){return"Running"===e.state}).length;return{name:n.meta.name,ip:n.ip,cpu:a,memory:r,hasWarning:i.length-o>0,podAvailability:"".concat(o," out of ").concat(i.length," pods available"),pods:i}})(ge),Ee=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.initialize()}},{key:"render",value:function(){return this.props.data&&0!==this.props.data.length?r.a.createElement("div",null,r.a.createElement(S.a,null,this.props.data.map(function(e){return r.a.createElement(ye,{key:e.meta.key,name:e.meta.name})}))):r.a.createElement(ae,null)}}]),t}(a.Component),ve=Object(h.b)(function(e){return{data:e.deployments}},function(e){return{initialize:function(t){return ie(e,"deployment")}}})(Ee),be=n(166),Oe=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.initialize()}},{key:"render",value:function(){if(!this.props.resource)return r.a.createElement(ae,null);switch(this.props.resource){case"deployment":return r.a.createElement("div",{style:je},r.a.createElement(ve,null));case"service":return r.a.createElement("div",{style:je},r.a.createElement(ce,null));case"node":return r.a.createElement("div",{style:je},r.a.createElement(fe,null));default:return r.a.createElement("div",null,r.a.createElement(be.a,{message:"Resource not supported",description:"Requested resource not supported by kubex.",type:"error"}))}}}]),t}(a.Component),je={backgroundColor:"lightgray",height:"100%"},ke=Oe,De=Object(h.b)(function(e){return e&&e.meta&&e.meta.resource},function(e){return{initialize:function(t){return ie(e,"meta")}}})(ke),we=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||f.d,Se=Object(f.e)(w,we(Object(f.a)(g.a)));d.a.locale("en",{relativeTime:{future:"in %s",past:"%s",s:"1s",m:"1m",mm:"%dm",h:"1h",hh:"%dh",d:"1d",dd:"%dd",M:"1M",MM:"%dM",y:"1y",yy:"%dy"}});var Ce=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,{store:Se},r.a.createElement(De,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Ce,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},96:function(e,t,n){e.exports=n(163)}},[[96,2,1]]]);
//# sourceMappingURL=main.d7457d5c.chunk.js.map