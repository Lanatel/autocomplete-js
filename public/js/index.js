!function e(t,n,o){function r(a,s){if(!n[a]){if(!t[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[a]={exports:{}};t[a][0].call(u.exports,(function(e){return r(t[a][1][e]||e)}),u,u.exports,e,t,n,o)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<o.length;a++)r(o[a]);return r}({1:[function(e,t,n){let o=e("./location_autocomplete"),r=document.getElementsByClassName("location-autocomplete");Array.from(r).forEach(e=>o.autoComplete(e,{location:"ru_RU"}))},{"./location_autocomplete":3}],2:[function(e,t,n){let o;const r=e=>{let t=[],n=0;e=c(e);do{c(a[n]).startsWith(e)&&t.push(a[n]),n++}while(t.length<5&&a.length>n);return t},i=()=>{let e=new XMLHttpRequest;return new Promise((t,n)=>{e.onreadystatechange=function(){4===this.readyState&&200===this.status&&t(this.responseText)},e.open("GET",`${o}/cities.json`,!0),e.send()})};let a;const s={ru_RU:{q:"й",w:"ц",e:"у",r:"к",t:"е",y:"н",u:"г",i:"ш",o:"щ",p:"з","[":"х","{":"Х","]":"ь","}":"ь","|":"/","`":"е","~":"е",a:"ф",s:"ы",d:"в",f:"а",g:"п",h:"р",j:"о",k:"л",l:"д",";":"ж",":":"Ж","'":"э",'"':"Э",z:"я",x:"ч",c:"с",v:"м",b:"и",n:"т",m:"ь",",":"б","<":"Б",".":"ю",">":"Ю","/":".","?":",","@":'"',"#":"№",$:";","^":":","&":"?","ё":"е","ъ":"ь"},uk_UK:{q:"й",w:"ц",e:"у",r:"к",t:"е",y:"н",u:"г",i:"ш",o:"щ",p:"з","[":"х","{":"Х","]":"ї","}":"Ї","|":"/","`":"ё","~":"Ё",a:"ф",s:"і",d:"в",f:"а",g:"п",h:"р",j:"о",k:"л",l:"д",";":"ж",":":"Ж","'":"є",'"':"Є",z:"я",x:"ч",c:"с",v:"м",b:"и",n:"т",m:"ь",",":"б","<":"Б",".":"ю",">":"Ю","/":".","?":",","@":'"',"#":"№",$:";","^":":","&":"?"}},l={"-":" ","—":" "},c=e=>e.trim().toLowerCase().replace(/ +/g," ").replace(/./g,e=>s[s.hasOwnProperty(o)?o:defaultLocale][e]||l[e]||e);t.exports=(e="ru_RU")=>(o=e,i().then(e=>(e=>{let t=JSON.parse(e),n={};for(const e in t)for(const o in t[e])n.hasOwnProperty(o)||(n[o]=[]),t[e][o].forEach(t=>n[o].push(t+(t!==e?", "+e:"")));let o=[];return Object.keys(n).sort().reverse().forEach(e=>o=o.concat(n[e])),o})(e)).then(e=>a=e),{getCities:r,convert:c})},{}],3:[function(e,t,n){t.exports={autoComplete:function(t,{location:n="ru_RU"}={}){let o,r,i;t.addEventListener("focus",(function(t){this.value="",r||(r=e("./cities")(n))})),t.addEventListener("input",(function(e){let n,a=r.convert(this.value);if(c(),!a)return!1;o=-1,i=0,(n=document.createElement("DIV")).setAttribute("class","autocomplete-items"),this.parentNode.appendChild(n),r.getCities(a).forEach(e=>{let o=document.createElement("DIV");o.setAttribute("data-value",e),o.innerHTML=`<strong>${e.substr(0,a.length)}</strong>${e.substr(a.length)}`,o.addEventListener("click",(function(e){t.value=this.getAttribute("data-value")})),n.appendChild(o)}),u(n)})),t.addEventListener("keydown",(function(e){let t=this.parentNode.getElementsByClassName("autocomplete-items");if(t.length>0){let n=t[0].getElementsByTagName("div");switch(e.code){case"ArrowDown":s(n);break;case"ArrowUp":a(n);break;case"Enter":e.preventDefault(),o>=0&&n&&n[o].click()}}})),document.addEventListener("click",(function(e){c(e.target)}));const a=e=>{if(0===e.length)return!1;o>0&&(l(e),o>1&&(o!==e.length-1&&(i-=e[o].clientHeight),e[0].parentNode.scrollTop=i),e[--o].classList.add("autocomplete-active"))},s=e=>{if(0===e.length)return!1;o<e.length-1&&(l(e),e[++o].classList.add("autocomplete-active"),o>1&&(o!==e.length-1&&(i+=e[o].clientHeight),e[0].parentNode.scrollTop=i))},l=e=>Array.from(e).forEach(e=>e.classList.remove("autocomplete-active")),c=e=>{let t=document.getElementsByClassName("autocomplete-items");Array.from(t).forEach(t=>{e!==t&&t.parentNode.removeChild(t)})},u=e=>{let t,n=window.innerHeight-e.getBoundingClientRect().top,o=e.getBoundingClientRect().top,r=e.offsetHeight;n>r||n>o?t=n:(e.classList.add("autocomplete-top"),t=o);let i=e.childNodes;if((t-=15)<r&&i.length>3){let n=i[0].offsetHeight;e.style.height=n*Math.max(3,Math.floor(t/n))+"px",e.style.overflowY="scroll"}}}}},{"./cities":2}]},{},[1]);
