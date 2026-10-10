
(function(){
var SEED=/seed=/.test(location.search)?seedFromURL():+document.body.dataset.seed,R=mulberry32(SEED),cv=document.getElementById("stage"),S=fitCanvas(cv,.6,1),g=S.g,W=S.W,H=S.H;
var P=[["dot",0,"#f1ecff"],["dot",0,"#f1ecff"],["vector",-1,"#ff8aa8"],["vector",-1,"#ff8aa8"],["edge",1,"#7dffa8"],["edge",1,"#7dffa8"]].map(function(d){var a=R()*6.283,r=40+R()*Math.min(W,H)*.35;return {k:d[0],q:d[1],c:d[2],x:W/2+Math.cos(a)*r,y:H/2+Math.sin(a)*r,vx:0,vy:0};});
var drag=-1,tick=0,E=0,trail=[];
function step(){tick++;var k=1800,cx=W/2,cy=H/2;E=0;
 for(var i=0;i<6;i++)for(var j=i+1;j<6;j++){var a=P[i],b=P[j],dx=b.x-a.x,dy=b.y-a.y;if(dx*dx+dy*dy<1){dx=R()-.5;dy=R()-.5;}var dr=Math.hypot(dx,dy),d2=dr*dr+40,d=Math.sqrt(d2),f=-k*a.q*b.q/d2;if(dr<36)f-=(36-dr)*1.5;a.vx+=dx/dr*f*.02;a.vy+=dy/dr*f*.02;b.vx-=dx/dr*f*.02;b.vy-=dy/dr*f*.02;E+=k*a.q*b.q/d;}
 P.forEach(function(p,i){if(p.k==="dot"){p.vx+=(cx+(i?14:-14)-p.x)*.004;p.vy+=(cy-p.y)*.004;}else{p.vx+=(cx-p.x)*.0004;p.vy+=(cy-p.y)*.0004;}
  p.vx*=.97;p.vy*=.97;var sp=Math.hypot(p.vx,p.vy);if(sp>6){p.vx*=6/sp;p.vy*=6/sp;}if(i!==drag){p.x+=p.vx;p.y+=p.vy;}p.x=Math.max(10,Math.min(W-10,p.x));p.y=Math.max(10,Math.min(H-10,p.y));});
 var q=P.reduce(function(s,p){return s+p.q;},0);if(q!==0)throw new Error("0-sphere net charge "+q);}
function draw(){g.clearRect(0,0,W,H);var cx=W/2,cy=H/2;g.strokeStyle="rgba(96,165,250,.35)";g.beginPath();g.arc(cx,cy,Math.min(W,H)*.42,0,6.283);g.stroke();
 for(var i=0;i<6;i++)for(var j=i+1;j<6;j++){var a=P[i],b=P[j];if(a.q*b.q<0){var d=Math.hypot(a.x-b.x,a.y-b.y);g.strokeStyle="rgba(244,199,64,"+Math.max(0,.6-d/300)+")";g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();}}
 P.forEach(function(p){g.fillStyle=p.c;g.shadowColor=p.c;g.shadowBlur=10;g.beginPath();g.arc(p.x,p.y,p.k==="dot"?7:6,0,6.283);g.fill();g.shadowBlur=0;g.fillStyle="#f1ecff";g.font="700 12px ui-monospace,monospace";g.textAlign="center";g.fillText(p.q>0?"+1":p.q<0?"\u22121":"0",p.x,p.y-12);});}
var hud=document.getElementById("hud");
function hudT(){var dx=0,dy=0;P.forEach(function(p){dx+=p.q*(p.x-W/2);dy+=p.q*(p.y-H/2);});hud.textContent="seed "+SEED+" · Σq = "+P.reduce(function(s,p){return s+p.q;},0)+" · energy "+E.toFixed(1)+" · dipole "+Math.hypot(dx,dy).toFixed(1);}
function pos(e){var r=cv.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];}
cv.addEventListener("pointerdown",function(e){var m=pos(e),bd=30;P.forEach(function(p,i){var d=Math.hypot(p.x-m[0],p.y-m[1]);if(d<bd){bd=d;drag=i;}});});
cv.addEventListener("pointermove",function(e){if(drag<0)return;var m=pos(e);P[drag].x=m[0];P[drag].y=m[1];P[drag].vx=P[drag].vy=0;});
addEventListener("pointerup",function(){drag=-1;});
document.getElementById("reseed").onclick=function(){location.search="?seed="+((Math.random()*1e9)|0);};
document.getElementById("kick").onclick=function(){P.forEach(function(p){p.vx+=(R()-.5)*12;p.vy+=(R()-.5)*12;});};
window.SIM={sig:function(){return P.map(function(p){return Math.round(p.x)+","+Math.round(p.y);}).join("|");},get tick(){return tick;},get E(){return E;}};
if(REDUCE){for(var s=0;s<1500;s++)step();draw();hudT();}else (function loop(){step();step();draw();if(tick%10===0)hudT();requestAnimationFrame(loop);})();
})();
