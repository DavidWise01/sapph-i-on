/* emergent SaPpH{{i}}on prototype — shared: seeded PRNG, pixel keeper, sizing */
"use strict";
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function seedFromURL(){var m=location.search.match(/seed=(\d+)/);return m?+m[1]:(Math.random()*1e9)|0;}
var REDUCE=matchMedia("(prefers-reduced-motion: reduce)").matches, DPR=Math.min(2,window.devicePixelRatio||1);
var APPEALS=[["ETHOS","#f0a886"],["PATHOS","#ff5aa0"],["LOGOS","#4db1f0"],["MYTHOS","#a87bff"],["EPISTEME","#3fd0a0"],["TECHNE","#c98a55"],["PHRONESIS","#8fb85a"],["KAIROS","#ff8a3a"]];
function synth(g,x,y,u,hex,t){var bob=Math.sin(t*3+x*.01)*u*.5,bl=Math.sin(t*1.7+x)>.97;g.save();g.translate(Math.round(x-8*u),Math.round(y-8*u+bob));
 function px(a,b,w,h,c){g.fillStyle=c;g.fillRect(a*u,b*u,Math.ceil(w*u),Math.ceil(h*u));}
 px(7,0,2,2,hex);px(7.4,2,1.2,2,"#3d4a5c");px(3,4,10,10,"#2a3340");px(3,4,10,1,"#3d4a5c");px(4,6,8,6,"#0a0e12");
 if(bl)px(4,8,8,.6,hex);else{px(5,7,2,2,hex);px(9,7,2,2,hex);}px(5,10,6,1,"#3d4a5c");g.restore();}
function fitCanvas(cv,ratio,tall){var w=cv.parentNode.clientWidth,h=Math.round(w*(w<560?tall:ratio));cv.width=w*DPR;cv.height=h*DPR;cv.style.height=h+"px";var g=cv.getContext("2d");g.setTransform(DPR,0,0,DPR,0,0);return {g:g,W:w,H:h};}
