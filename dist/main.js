!function(e){var t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=2)}([function(e,t){e.exports=React},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.upperFirst=function(e){return null!=e?e.charAt(0).toUpperCase()+e.slice(1):null}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(0),i=s(3),a=s(4);i.render(n.createElement(a.App,null),document.getElementById("yessir"))},function(e,t){e.exports=ReactDOM},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(0),i=s(5),a=s(6),r=s(1);class l extends n.Component{constructor(e){super(e),this.state={min:1,max:21,pop:!1,popId:null,searchTerm:"",pokeNames:null},this.handlePrevious=this.handlePrevious.bind(this),this.handleNext=this.handleNext.bind(this),this.enterTerm=this.enterTerm.bind(this),this.clickSearch=this.clickSearch.bind(this),this.enterSearch=this.enterSearch.bind(this),this.pokeSearch=this.pokeSearch.bind(this),this.pokeClick=this.pokeClick.bind(this),this.pokeClose=this.pokeClose.bind(this)}handlePrevious(){this.state.min>=this.state.max-this.state.min&&this.setState({min:this.state.min-(this.state.max-this.state.min),max:this.state.max-(this.state.max-this.state.min)})}handleNext(){this.setState({min:this.state.max,max:2*this.state.max-this.state.min})}enterTerm(e){this.setState({searchTerm:e.currentTarget.value.toLowerCase()})}clickSearch(e){e.preventDefault(),this.pokeSearch()}enterSearch(e){"Enter"===e.key&&this.pokeSearch()}pokeSearch(){let e=this.state.pokeNames.find(e=>e.name==this.state.searchTerm);null!=e?this.setState({pop:!0,popId:e.id}):alert("No Pokemon found with that name!")}pokeClick(e){this.setState({min:this.state.min,max:this.state.max,pop:!0,popId:e})}pokeClose(){this.setState({min:this.state.min,max:this.state.max,pop:!1,popId:null})}componentDidMount(){fetch("https://pokeapi.co/api/v2/pokemon?limit=1000").then(e=>e.json()).then(e=>{const t=e.results;let s=Object.entries(t).map((e,t)=>({name:e[1].name.split("-")[0],id:t+1}));this.setState({pokeNames:s})})}render(){let e=Array.from(Array(this.state.max-this.state.min).keys()).map(e=>e+this.state.min),t=Array(this.state.max-this.state.min);return null!=this.state.pokeNames&&(t=this.state.pokeNames.slice(this.state.min-1,this.state.max).map(e=>r.upperFirst(e.name))),n.createElement("div",{className:"App"},n.createElement("header",null,n.createElement("div",{className:"title"},n.createElement("h1",null," Pokedex "),n.createElement("p",null," A project made with Typescript + React")),n.createElement("div",{className:"search_form"},n.createElement("input",{type:"text",value:this.state.searchTerm,placeholder:"Search for a pokemon!",onKeyDown:this.enterSearch,onChange:this.enterTerm}),n.createElement("button",{id:"search_btn",onClick:this.clickSearch}," Search "))),n.createElement(i.PokeList,{min:this.state.min,max:this.state.max,pokeIdx:e,pokeNames:t,handler:this.pokeClick}),this.state.pop&&n.createElement(a.Popup,{id:this.state.popId,closer:this.pokeClose}),n.createElement("div",{className:"buttons"},n.createElement("button",{id:"prev",onClick:this.handlePrevious}," Previous "),n.createElement("button",{id:"next",onClick:this.handleNext}," Next")))}}t.App=l},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(0);class i extends n.Component{render(){return n.createElement("div",{className:"pokeList"},this.props.pokeIdx.map((e,t)=>n.createElement(a,{key:e,id:e,name:this.props.pokeNames[t],handleClick:this.props.handler})))}}function a(e){const t="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+e.id.toString()+".png";return n.createElement("div",{className:"pokemon",id:e.id.toString(),onClick:()=>e.handleClick(e.id)},n.createElement("img",{src:t,alt:e.name,id:e.id.toString()}),n.createElement("h3",null," ",e.name))}t.PokeList=i},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(0),i=s(1),a=s(7),r=s(8);class l extends n.Component{constructor(e){super(e),this.propUpRef=n.createRef(),this.state={name:null,height:null,weight:null,img:[null,null,null,null],type:null,games:null,abilities:null},this.handleOutsideClick=this.handleOutsideClick.bind(this)}componentDidMount(){document.addEventListener("click",this.handleOutsideClick,!1),fetch("https://pokeapi.co/api/v2/pokemon/"+this.props.id.toString()).then(e=>e.json()).then(e=>{let t=Object.entries(e.types).map(e=>i.upperFirst(e[1].type.name)),s=Object.entries(e.game_indices).map(e=>i.upperFirst(e[1].version.name)),n=Object.entries(e.abilities).map(e=>i.upperFirst(e[1].ability.name));this.setState({name:i.upperFirst(e.name),height:e.height,weight:e.weight,img:[e.sprites.front_default,e.sprites.back_default,e.sprites.front_shiny,e.sprites.back_shiny],type:t.join(", "),games:s.join(", "),abilities:n.join(", ")})})}componentWillUnmount(){document.removeEventListener("click",this.handleOutsideClick,!1)}handleOutsideClick(e){this.propUpRef.current.contains(e.target)||this.props.closer()}render(){return n.createElement("div",{className:"popup"},n.createElement("div",{className:"popup_inner"},n.createElement("div",{ref:this.propUpRef,className:"content"},n.createElement(a.Sprites,{name:this.state.name,front:this.state.img[0],back:this.state.img[1],shiny_front:this.state.img[2],shiny_back:this.state.img[3]}),n.createElement(r.Description,{name:this.state.name,height:this.state.height,weight:this.state.weight,type:this.state.type,games:this.state.games,abilities:this.state.abilities}),n.createElement("button",{id:"closeButton",onClick:()=>this.props.closer()}," Close "))))}}t.Popup=l},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(0);class i extends n.Component{constructor(e){super(e),this.state={hasFront:null!=this.props.front,hasBack:null!=this.props.back,hasShinyFront:null!=this.props.shiny_front,hasShinyBack:null!=this.props.shiny_back}}componentDidUpdate(e,t,s){this.props.front!=e.front&&this.setState({hasFront:null!=this.props.front,hasBack:null!=this.props.back,hasShinyFront:null!=this.props.shiny_front,hasShinyBack:null!=this.props.shiny_back})}render(){return n.createElement("div",{className:"images"},n.createElement("div",{id:"default_imgs"},n.createElement("h4",null," Default: "),this.state.hasFront?n.createElement("img",{src:this.props.front,alt:this.props.name+" front"}):n.createElement("p",null," Loading "),this.state.hasBack&&n.createElement("img",{src:this.props.back,alt:this.props.name+"back"})),n.createElement("div",{id:"shiny_imgs"},n.createElement("h4",null," Shiny: "),this.state.hasShinyFront?n.createElement("img",{src:this.props.shiny_front,alt:this.props.name+" shiny front"}):n.createElement("p",null," loading "),this.state.hasBack&&n.createElement("img",{src:this.props.shiny_back,alt:this.props.name+"shiny back"})))}}t.Sprites=i},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(0);t.Description=function(e){let t;return console.log(e.games),t=e.games?n.createElement("p",null,n.createElement("span",{className:"desc_head"},"Games: "),e.games):n.createElement("p",null,n.createElement("span",{className:"desc_head"},"Games: "),"No information available"),n.createElement("div",{className:"description"},n.createElement("h3",null,n.createElement("span",{className:"desc_head"},"  Name: "),e.name),n.createElement("h4",null," ",n.createElement("span",{className:"desc_head"}," Type: ")," ",e.type),n.createElement("h4",null,n.createElement("span",{className:"desc_head"},"  Height: ")," ",Math.round(10*e.height).toString()+"cm",",",n.createElement("span",{className:"desc_head"}," Weight: "),Math.round(.1*e.weight)+"kg"),n.createElement("p",null,n.createElement("span",{className:"desc_head"}," Abilities: "),e.abilities,n.createElement("br",null)),t)}}]);
//# sourceMappingURL=main.js.map