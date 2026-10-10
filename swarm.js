/* icon swarm: each icon is generated from its page's own source and links straight to it */
(function(){
"use strict";
var DATA=JSON.parse(document.getElementById("data").textContent),D=DATA.items,SEED=/seed=/.test(location.search)?seedFromURL():+document.body.dataset.seed,R=mulberry32(SEED);
var cv=document.getElementById("stage"),S=fitCanvas(cv,.58,1.15),g=S.g,W=S.W,H=S.H,tip=document.getElementById("tip"),hover=-1,tick=0,KC=DATA.keeper;
addEventListener("resize",function(){S=fitCanvas(cv,.58,1.15);g=S.g;W=S.W;H=S.H;});
function rgb(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
function pd(a,b){var x=rgb(a.pal[0]),y=rgb(b.pal[0]);return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2])/441;}
var r=Math.max(13,Math.min(34,Math.sqrt(W*H/(D.length+2))*.28));
var SEP=KC?.03:.01,COH=KC?.00012:.0008;
if(KC)r=Math.max(8,Math.min(18,Math.min(W,H)*.032));
var A=D.map(function(d){return {d:d,x:r+R()*(W-2*r),y:r+R()*(H-2*r),vx:R()-.5,vy:R()-.5,a:R()*6.283};});
if(A.length!==DATA.count)throw new Error("icon count "+A.length+" ≠ "+DATA.count);
function step(){tick++;A.forEach(function(p,i){var cx=0,cy=0,n=0;A.forEach(function(q,j){if(i===j)return;var dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy)||1;
  if(d<2.3*r){p.vx-=dx/d*(2.3*r-d)*SEP;p.vy-=dy/d*(2.3*r-d)*SEP;}
  var s=1-pd(p.d,q.d);if(d<W*.4){cx+=dx*s;cy+=dy*s;n+=s;}});
 if(n){p.vx+=cx/n*COH;p.vy+=cy/n*COH;}
 if(KC){var dx=W/2-p.x,dy=H/2-p.y,d=Math.hypot(dx,dy)||1,R0=Math.min(W,H)*.46,hole=Math.min(W,H)*.12;if(d>R0){p.vx+=dx/d*(d-R0)*.004;p.vy+=dy/d*(d-R0)*.004;}if(d<hole){p.vx-=dx/d*(hole-d)*.02;p.vy-=dy/d*(hole-d)*.02;}p.vx+=-dy/d*.01;p.vy+=dx/d*.01;}
 p.vx+=(R()-.5)*.06;p.vy+=(R()-.5)*.06;p.vx*=.96;p.vy*=.96;if(i!==hover){p.x+=p.vx;p.y+=p.vy;}
 if(p.x<r){p.x=r;p.vx*=-1;}if(p.x>W-r){p.x=W-r;p.vx*=-1;}if(p.y<r){p.y=r;p.vy*=-1;}if(p.y>H-r){p.y=H-r;p.vy*=-1;}
 if(p.d.raf)p.a+=.012;});}
function zero(s){g.lineWidth=2;g.strokeStyle="#ff8aa8";[[-1,-1],[1,-1]].forEach(function(v){g.beginPath();g.moveTo(v[0]*s*.7,v[1]*s*.7);g.lineTo(v[0]*s*.25,v[1]*s*.25);g.stroke();});
 g.strokeStyle="#7dffa8";[[-1,1],[1,1]].forEach(function(v){g.beginPath();g.moveTo(v[0]*s*.25,v[1]*s*.25);g.lineTo(v[0]*s*.75,v[1]*s*.75);g.stroke();});
 g.fillStyle="#f1ecff";g.beginPath();g.arc(-s*.18,0,s*.12,0,6.283);g.arc(s*.18,0,s*.12,0,6.283);g.fill();}
function icon(p,hv){var d=p.d,s=hv?r*1.15:r;g.save();g.translate(p.x,p.y);g.rotate(p.a);
 g.fillStyle=d.bg;g.beginPath();g.arc(0,0,s,0,6.283);g.fill();g.lineWidth=Math.max(1,s/14);
 var rings=Math.max(1,Math.min(4,d.canvas||1));for(var i=0;i<rings;i++){g.strokeStyle=d.pal[i%d.pal.length];g.beginPath();g.arc(0,0,s*(.92-i*.16),0,6.283);g.stroke();}
 if(d.kind==="zero")zero(s);else{var sp=Math.min(12,d.scripts||0);g.strokeStyle=d.pal[1%d.pal.length];for(var j=0;j<sp;j++){var a=j/sp*6.283;g.beginPath();g.moveTo(Math.cos(a)*s*.25,Math.sin(a)*s*.25);g.lineTo(Math.cos(a)*s*.55,Math.sin(a)*s*.55);g.stroke();}
  if(d.svg){g.fillStyle=d.pal[2%d.pal.length];g.beginPath();g.arc(0,0,s*.18,0,6.283);g.fill();}
  if(d.n){g.rotate(-p.a);g.fillStyle="#f1ecff";g.font="700 "+Math.round(s*.55)+"px ui-monospace,monospace";g.textAlign="center";g.textBaseline="middle";g.fillText(d.n,0,0);}}
 if(d.audio){g.strokeStyle=d.pal[0];g.beginPath();for(var k=0;k<=40;k++){var a2=k/40*6.283,rr=s*(1.08+.06*Math.sin(a2*6+tick*.1));g[k?"lineTo":"moveTo"](Math.cos(a2)*rr,Math.sin(a2)*rr);}g.stroke();}
 g.restore();if(hv){g.strokeStyle="#fff";g.lineWidth=2;g.beginPath();g.arc(p.x,p.y,s+4,0,6.283);g.stroke();}}
function draw(){g.clearRect(0,0,W,H);for(var i=0;i<A.length;i++)for(var j=i+1;j<A.length;j++){var s=1-pd(A[i].d,A[j].d),dd=Math.hypot(A[i].x-A[j].x,A[i].y-A[j].y);if(s>.7&&dd<r*4){g.strokeStyle="rgba(188,171,228,"+(s-.7)*1.4+")";g.lineWidth=1;g.beginPath();g.moveTo(A[i].x,A[i].y);g.lineTo(A[j].x,A[j].y);g.stroke();}}
 if(KC)synth(g,W/2,H/2,Math.max(2,Math.min(5,W/200)),KC.c,tick/60);
 A.forEach(function(p,i){icon(p,i===hover);});}
function at(e){var b=cv.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;for(var i=A.length-1;i>=0;i--)if(Math.hypot(A[i].x-x,A[i].y-y)<r+2)return i;return -1;}
cv.addEventListener("mousemove",function(e){hover=at(e);cv.style.cursor=hover>=0?"pointer":"default";if(hover>=0){var d=A[hover].d;tip.innerHTML="";var b=document.createElement("b");b.textContent=d.t;var s=document.createElement("small");s.textContent=d.cap;tip.appendChild(b);tip.appendChild(s);tip.style.left=e.clientX+"px";tip.style.top=e.clientY+"px";tip.style.opacity=1;}else tip.style.opacity=0;});
cv.addEventListener("mouseleave",function(){hover=-1;tip.style.opacity=0;});
cv.addEventListener("click",function(e){var i=at(e);if(i>=0)location.href=A[i].d.href;});
var mini=document.getElementById("mini");D.forEach(function(d){var li=document.createElement("li"),a=document.createElement("a");a.href=d.href;a.textContent=d.t;li.appendChild(a);mini.appendChild(li);});
document.getElementById("hud").textContent="seed "+SEED+" · "+D.length+" "+(DATA.unit||"pages")+" · tap an icon to open it";
window.SIM={sig:function(){return A.map(function(p){return Math.round(p.x)+","+Math.round(p.y);}).join("|");},icons:function(){return A.map(function(p){return [p.x,p.y,p.d.href];});},get tick(){return tick;}};
if(REDUCE){for(var s=0;s<600;s++)step();draw();}else (function loop(){step();draw();requestAnimationFrame(loop);})();
})();
