!function e(t,n,o){function r(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};t[a][0].call(l.exports,(function(e){return r(t[a][1][e]||e)}),l,l.exports,e,t,n,o)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<o.length;a++)r(o[a]);return r}({1:[function(e,t,n){console.log("Hello"),e("./location_autocomplete")},{"./location_autocomplete":3}],2:[function(e,t,n){t.exports.getCities=function(e){e=a(e);let t=[],n=0;do{a(o[n]).startsWith(e)&&t.push(o[n]),n++}while(t.length<5&&o.length>n);return t};let o=void function(){let e=new XMLHttpRequest;return new Promise((t,n)=>{e.onreadystatechange=function(){4===this.readyState&&200===this.status&&t(this.responseText)},e.open("GET","cities.json",!0),e.send()})}().then(e=>{let t=JSON.parse(e),n={};for(const e in t)if(t.hasOwnProperty(e))for(const o in t[e])n.hasOwnProperty(o)||(n[o]=[]),t[e].hasOwnProperty(o)&&t[e][o].forEach((function(t){n[o].push(t+(t!==e?", "+e:""))}));let r=[];Object.keys(n).sort().reverse().forEach((function(e){r=r.concat(n[e])})),o=r});const r={q:"й",w:"ц",e:"у",r:"к",t:"е",y:"н",u:"г",i:"ш",o:"щ",p:"з","[":"х","{":"Х","]":"ъ","}":"Ъ","|":"/","`":"ё","~":"Ё",a:"ф",s:"ы",d:"в",f:"а",g:"п",h:"р",j:"о",k:"л",l:"д",";":"ж",":":"Ж","'":"э",'"':"Э",z:"я",x:"ч",c:"с",v:"м",b:"и",n:"т",m:"ь",",":"б","<":"Б",".":"ю",">":"Ю","/":".","?":",","@":'"',"#":"№",$:";","^":":","&":"?"},i={"ё":"е","ъ":"ь"},a=e=>e.toLowerCase().replace(/./g,(function(e){return r[e]||i[e]||e}))},{}],3:[function(e,t,n){let o=document.getElementsByClassName("location-autocomplete");Array.from(o).forEach((function(t){!function(t){let n,o;function r(e){if(0===e.length)return!1;!function(e){Array.from(e).forEach((function(e){e.classList.remove("autocomplete-active")}))}(e),n>=e.length&&(n=0),n<0&&(n=e.length-1),e[n].classList.add("autocomplete-active")}function i(e){let t=document.getElementsByClassName("autocomplete-items");Array.from(t).forEach((function(t){e!==t&&t.parentNode.removeChild(t)}))}t.addEventListener("focus",(function(){this.value="",o||(o=e("./cities"))})),t.addEventListener("input",(function(e){let r,a=this.value;if(i(),!a)return!1;var s;n=-1,(r=document.createElement("DIV")).setAttribute("class","autocomplete-items"),this.parentNode.appendChild(r),o.getCities(a).forEach((function(e){let n=document.createElement("DIV");n.setAttribute("data-value",e),n.innerHTML=`<strong>${e.substr(0,a.length)}</strong>`,n.innerHTML+=e.substr(a.length),r.appendChild(n),n.addEventListener("click",(function(e){t.value=this.getAttribute("data-value")}))})),s=r,window.innerHeight-s.getBoundingClientRect().top<s.offsetHeight&&s.classList.add("autocomplete-top")})),t.addEventListener("keydown",(function(e){let t=this.parentNode.getElementsByClassName("autocomplete-items");if(t.length>0){let o=t[0].getElementsByTagName("div");switch(e.code){case"ArrowDown":n++,r(o);break;case"ArrowUp":n--,r(o);break;case"Enter":e.preventDefault(),n>-1&&o&&o[n].click()}}})),document.addEventListener("click",(function(e){i(e.target)}))}(t)}))},{"./cities":2}]},{},[1]);
