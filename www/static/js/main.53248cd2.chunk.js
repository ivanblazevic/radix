(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{27:function(e,t,n){e.exports=n(68)},32:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){"use strict";n.r(t);var a,r=n(0),i=n.n(r),c=n(11),o=n.n(c),s=(n(32),n(1)),l=n(2),u=n(6),h=n(4),d=n(7),f=n(10),m=n(3),p="ITEMS_FETCH",E="ITEMS_FETCH_SUCCESS",v="ITEMS_FETCH_ERROR";!function(e){e[e.INIT=0]="INIT",e[e.LOADING=1]="LOADING",e[e.LOADED=2]="LOADED",e[e.ERROR=3]="ERROR"}(a||(a={}));var O={state:a.INIT,items:[],errorMessage:""};var b,g=n(12),y=n(25),S="PLAYER_INFO",I="PLAYER_INFO_SUCCESS",j="PLAYER_INFO_ERROR";!function(e){e[e.INIT=0]="INIT",e[e.LOADING=1]="LOADING",e[e.LOADED=2]="LOADED",e[e.ERROR=3]="ERROR"}(b||(b={}));var k={state:b.INIT,info:{},errorMessage:""};var C,N="SEARCH_ITEMS_FETCH",T="SEARCH_ITEMS_FETCH_SUCCESS",R="SEARCH_ITEMS_FETCH_ERROR",A="ACTIVATE_SEARCH";!function(e){e[e.INIT=0]="INIT",e[e.LOADING=1]="LOADING",e[e.LOADED=2]="LOADED",e[e.ERROR=3]="ERROR"}(C||(C={}));var D,w={state:C.INIT,items:[],errorMessage:"",searchActivated:!1};!function(e){e[e.INIT=0]="INIT",e[e.LOADING=1]="LOADING",e[e.LOADED=2]="LOADED",e[e.ERROR=3]="ERROR"}(D||(D={}));var L=Object(g.c)({items:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p:return Object(m.a)({},e,{items:t.items,state:a.LOADING});case E:return Object(m.a)({},e,{items:t.items,state:a.LOADED});case v:return Object(m.a)({},e,{errorMessage:t,state:a.ERROR});default:return e}},search:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case N:return Object(m.a)({},e,{items:t.items,state:C.LOADING});case T:return Object(m.a)({},e,{items:t.items,state:C.LOADED});case R:return Object(m.a)({},e,{errorMessage:t,state:C.ERROR});case A:return Object(m.a)({},e,{searchActivated:t.isActive});default:return e}},player:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case S:return Object(m.a)({},e,{state:b.LOADING});case I:return Object(m.a)({},e,{info:t.info,state:b.LOADED});case j:return Object(m.a)({},e,{errorMessage:t.errorMessage,state:b.ERROR});default:return e}}}),M=Object(g.d)(L,Object(g.a)(y.a)),F=(n(37),n(38),n(39),function(){function e(){Object(s.a)(this,e)}return Object(l.a)(e,null,[{key:"play",value:function(e){var t=this.HOST+"/play?url="+e.url+"&title="+e.title;return fetch(t).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()}).catch(function(e){throw Error(e)})}},{key:"info",value:function(){var e=this.HOST+"/info";return fetch(e).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()}).catch(function(e){throw Error("Offline or wrong address")})}},{key:"searchStations",value:function(e){var t=this.HOST+"/search?query="+e;return fetch(t).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()}).catch(function(e){throw Error("Offline or wrong address")})}},{key:"update",value:function(){var e=this.HOST+"/update";return fetch(e).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()}).catch(function(e){throw Error("Offline or wrong address")})}}]),e}());function H(e){return function(t){t(function(e){return{type:A,isActive:e}}(e))}}function x(e){return function(t){return t({type:N}),F.searchStations(e).then(function(e){return t({type:T,items:e})}).catch(function(e){return t(function(e){return{type:R,errorMessage:e.message}}(e))})}}F.HOST=localStorage.getItem("ip")||"";n(40);var _=function(e){function t(e,n){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e,n))).state={isSearching:!1},a.activateSearch=function(){a.setState({isSearching:!a.state.isSearching}),a.props.activateSearch(!a.state.isSearching)},a.onSearch=function(e){a.props.search(e.target.value)},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("header",null,i.a.createElement("div",{className:"header-background-container"},i.a.createElement("div",{className:"header-background"})),i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:this.state.isSearching?"search-visible":"search-hidden"},i.a.createElement("span",null,"STATIONS"),i.a.createElement("input",{type:"text",className:"form-control form-control-lg",placeholder:"Search...",onChange:this.onSearch})),i.a.createElement("i",{onClick:this.activateSearch,className:"fas fa-"+(this.state.isSearching?"times":"search")})))}}]),t}(i.a.Component),G=Object(f.b)(function(e){return{searchState:e.search}},function(e){return{search:function(t){return e(x(t))},activateSearch:function(t){return e(H(t))}}})(_),P=n(8),U="https://radix-83cd.restdb.io/rest/stations",W=function(){function e(){Object(s.a)(this,e)}return Object(l.a)(e,null,[{key:"getAll",value:function(){return fetch(U,{method:"GET",headers:new Headers({"x-apikey":"5ae89d7625a622ae4d528762"})}).then(function(e){return e.json()}).catch(function(e){return e})}},{key:"add",value:function(e){return fetch(U,{method:"POST",body:JSON.stringify(e),headers:new Headers({"Content-Type":"application/json","x-apikey":"5ae89d7625a622ae4d528762"})}).then(function(e){return e.json()}).catch(function(e){return e})}},{key:"removeFavorites",value:function(e){return fetch(U+"/"+e,{method:"DELETE",headers:new Headers({"Content-Type":"application/json","x-apikey":"5ae89d7625a622ae4d528762"})}).then(function(e){return e.json()}).catch(function(e){return e})}}]),e}();function Y(){return{type:S}}function J(e){return{type:j,errorMessage:e}}function q(){return function(e){return e(Y()),F.info().then(function(t){return e({type:I,info:t})}).catch(function(t){return e(J(t.toString()))})}}function B(e){return function(t){return t(Y()),F.play(e).then(function(e){return t(q())}).catch(function(e){return t(J(e.toString()))})}}var V=n(14),$=n.n(V),z={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",background:"rgba(0,0,0,0.7)",border:"none"},overlay:{background:"rgba(0,0,0,0.0)"}},K=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={modalIsOpen:!1,menuIsOpen:!1,title:"",url:""},n.node={},n.openMenu=function(){n.setState({menuIsOpen:!0})},n.onTitleChange=function(e){n.setState({title:e.target.value})},n.onUrlChange=function(e){n.setState({url:e.target.value})},n.play=function(){n.setState({modalIsOpen:!1});var e={title:n.state.title,url:n.state.url};n.props.play(e)},n.addToFavorites=function(){n.props.addToFavorites()},n.handleClick=function(e){n.node.contains(e.target)||n.setState({menuIsOpen:!1})},n.openModal=n.openModal.bind(Object(P.a)(n)),n.closeModal=n.closeModal.bind(Object(P.a)(n)),n.play=n.play.bind(Object(P.a)(n)),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){document.addEventListener("mousedown",this.handleClick,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.handleClick,!1)}},{key:"openModal",value:function(){this.setState({modalIsOpen:!0}),this.setState({menuIsOpen:!1})}},{key:"closeModal",value:function(){this.setState({modalIsOpen:!1})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"right"},i.a.createElement("i",{onClick:this.openMenu,className:"fas fa-ellipsis-v"}),i.a.createElement("div",{ref:function(t){return e.node=t},className:this.state.menuIsOpen?"menu display-block":"menu display-none"},i.a.createElement("div",{onClick:this.openModal},"Play From Url"),i.a.createElement("div",{onClick:this.addToFavorites},"Add To Favorites"),i.a.createElement($.a,{isOpen:this.state.modalIsOpen,onRequestClose:this.closeModal,style:z,contentLabel:"Example Modal"},i.a.createElement("div",null,i.a.createElement("input",{placeholder:"Title",type:"text",onChange:this.onTitleChange,value:this.state.title})),i.a.createElement("br",null),i.a.createElement("div",null,i.a.createElement("input",{placeholder:"Url",type:"text",onChange:this.onUrlChange,value:this.state.url})),i.a.createElement("br",null),i.a.createElement("div",null,i.a.createElement("button",{onClick:this.play,className:"full-width"},"Play")))))}}]),t}(i.a.Component),Q=(n(49),function(e){function t(e,n){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e,n))).play=a.play.bind(Object(P.a)(a)),a.addToFavorites=a.addToFavorites.bind(Object(P.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.state===D.INIT&&this.props.loadData()}},{key:"play",value:function(e){this.props.play(e)}},{key:"addToFavorites",value:function(){this.props.addToFavorites()}},{key:"render",value:function(){var e=this;return i.a.createElement("footer",null,i.a.createElement("div",{className:"header-background-container"},i.a.createElement("div",{className:"header-background"})),function(){switch(e.props.state){case D.LOADING:return i.a.createElement("span",null,i.a.createElement("i",{className:"fas fa-spinner"}),"Getting Info");case D.LOADED:return i.a.createElement("span",null,i.a.createElement("i",{className:"fas fa-music"}),e.props.info.title);case D.ERROR:return i.a.createElement("span",null,i.a.createElement("i",{className:"fas fa-unlink"}),e.props.errorMessage);default:return null}}(),i.a.createElement(K,{play:this.play,addToFavorites:this.addToFavorites}))}}]),t}(i.a.Component)),X=Object(f.b)(function(e){return e.player},function(e){return{loadData:function(){return e(q())},play:function(t){return e(B(t))},addToFavorites:function(){return e(function(e){var t=M.getState(),n={title:t.player.info.title,url:t.player.info.url};return W.add(n).then(function(e){return console.log(e),null}).catch(function(e){return null})})}}})(Q),Z=function(e){return i.a.createElement("li",{onClick:function(){return e.onClick(e.item)}},i.a.createElement("span",{className:e.selected?"hidden":""},e.index+1,". "),e.item.title,i.a.createElement("div",{id:"bars",className:e.selected?"selected":""},i.a.createElement("div",{className:"bar"}),i.a.createElement("div",{className:"bar"}),i.a.createElement("div",{className:"bar"}),i.a.createElement("div",{className:"bar"})))};function ee(){return function(e){return e({type:p}),W.getAll().then(function(t){return e({type:E,items:t})}).catch(function(t){return e(function(e){return{type:v,errorMessage:e.message}}(t))})}}n(50),n(51);var te=function(e){function t(e,n){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e,n))).onClick=function(e){a.props.play(e)},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.loadData()}},{key:"isPlaying",value:function(e){return this.props.currentPlayingUrl===e}},{key:"render",value:function(){var e=this;if(this.props.searchState.searchActivated)switch(this.props.searchState.state){case D.LOADING:return i.a.createElement("div",{id:"items-loading"},i.a.createElement("i",{className:"fas fa-spinner"}));case D.LOADED:return i.a.createElement("ul",null,this.props.searchState.items.map(function(t,n){return i.a.createElement(Z,{item:t,key:n,index:n,selected:e.isPlaying(t.url),onClick:e.onClick})}));default:return null}else switch(this.props.itemsState.state){case D.LOADING:return i.a.createElement("div",{id:"items-loading"},i.a.createElement("i",{className:"fas fa-spinner"}));case D.LOADED:return i.a.createElement("ul",null,this.props.itemsState.items.map(function(t,n){return i.a.createElement(Z,{item:t,key:n,index:n,selected:e.isPlaying(t.url),onClick:e.onClick})}));default:return null}}}]),t}(i.a.Component),ne=Object(f.b)(function(e){return{itemsState:e.items,currentPlayingUrl:e.player.info.url,searchState:e.search}},function(e){return{loadData:function(){return e(ee())},play:function(t){return e(B(t))}}})(te),ae=n(26),re=function(e){return i.a.createElement(ae.slide,{isOpen:e.isOpen,onStateChange:function(t){return e.handleStateChange(t)}},i.a.createElement("div",{className:"menu-item"},"Stations"),i.a.createElement("div",{className:"menu-item"},"YouTube"),i.a.createElement("div",{className:"menu-item",onClick:function(t){e.showSettings(),e.handleStateChange({isOpen:!1})}},"Settings"))},ie=(n(67),function(e){function t(e,n){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e,n))).onIPChange=function(e){a.setState({ip:e.target.value});var t=e.target.value;localStorage.setItem("ip",t)},a.state={ip:localStorage.getItem("ip")||"",oldIp:localStorage.getItem("ip")||""},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"ipHasChanged",value:function(){return this.state.oldIp!==this.state.ip}},{key:"update",value:function(){F.update()}},{key:"render",value:function(){var e=this.props.show?"modal display-block":"modal display-none";return i.a.createElement("div",{id:"settings",className:e},i.a.createElement("div",null,"Radix v",this.props.info.version),i.a.createElement("div",null,"Volume: ",this.props.info.volume),i.a.createElement("div",null,"Playing: ",this.props.info.title,i.a.createElement("div",null,i.a.createElement("i",null,this.props.info.url))),i.a.createElement("br",null),i.a.createElement("label",{htmlFor:"ip"},"IP Address:"),i.a.createElement("input",{id:"ip",placeholder:"http://radix.local",type:"text",value:this.state.ip,onChange:this.onIPChange}),this.ipHasChanged()&&i.a.createElement("span",null,"Restart for changes to take effect"),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("div",null,i.a.createElement("button",{onClick:this.update},"Update")),i.a.createElement("div",{id:"close",onClick:this.props.handleClose},"close"))}}]),t}(i.a.Component)),ce=Object(f.b)(function(e){return{searchState:e.search,info:e.player.info}},function(e){return{search:function(t){return e(x(t))},activateSearch:function(t){return e(H(t))}}})(ie);$.a.setAppElement("#root");var oe=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={show:!1,openSidebar:!1},n.show=function(){n.setState({show:!0})},n.hideModal=function(){n.setState({show:!1})},n.handleStateChange=function(e){n.setState({openSidebar:e.isOpen})},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement(f.a,{store:M},i.a.createElement("div",{className:"App"},i.a.createElement(re,{isOpen:this.state.openSidebar,handleStateChange:this.handleStateChange,showSettings:this.show}),i.a.createElement("div",null,i.a.createElement(G,{store:M}),i.a.createElement(ne,null),i.a.createElement(X,null))),i.a.createElement(ce,{show:this.state.show,handleClose:this.hideModal}))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(oe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[27,1,2]]]);
//# sourceMappingURL=main.53248cd2.chunk.js.map