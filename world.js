
(function(){
var SEED=seedFromURL(), R=mulberry32(SEED), cv=document.getElementById("stage"), S=fitCanvas(cv,.62,1.2), g=S.g, W=S.W, H=S.H;
addEventListener("resize",function(){S=fitCanvas(cv,.62,1.2);g=S.g;W=S.W;H=S.H;});
var FULL=-1,A=[],B=[],K=[],T=1.0,tick=0,K_CAP=Math.round(Math.min(380,W*H/900)),r0=6,SEEK=52,KT=0,BOND=12,BREAK=30;
var PORTS=[{q:-1,da:Math.PI-0.7},{q:-1,da:Math.PI+0.7},{q:1,da:-0.7},{q:1,da:0.7}]; // 2 vectors, 2 edges; dots sit at the core (q=0)
function spawn(x,y){A.push({x:x==null?R()*W:x,y:y==null?R()*H:y,vx:(R()-.5),vy:(R()-.5),a:R()*6.283,w:0,bond:[-1,-1,-1,-1],k:-1,id:A.length});}
KT=Math.max(7,Math.min(9,Math.round(K_CAP/24)));for(var i=0;i<Math.round(K_CAP*.2);i++)spawn();
function portXY(p,j){var a=p.a+PORTS[j].da;return [p.x+Math.cos(a)*r0,p.y+Math.sin(a)*r0];}
function charge(p){return 0+0+PORTS.reduce(function(s,P){return s+P.q;},0);}
var CELL=SEEK,grid={};
function gkey(x,y){return ((x/CELL)|0)+","+((y/CELL)|0);}
function build(){grid={};for(var i=0;i<A.length;i++){var k=gkey(A[i].x,A[i].y);(grid[k]||(grid[k]=[])).push(i);}}
function near(p,f){var cx=(p.x/CELL)|0,cy=(p.y/CELL)|0;for(var dx=-1;dx<=1;dx++)for(var dy=-1;dy<=1;dy++){var L=grid[(cx+dx)+","+(cy+dy)];if(L)for(var n=0;n<L.length;n++)f(L[n]);}}
function step(){
 tick++; build();
 // logistic arrival: r·(1 − N/K)
 if(R()<1.0*(1-A.length/K_CAP))spawn();
 for(var i=0;i<A.length;i++){var p=A[i];
  near(p,function(j){if(j<=i)return;var q=A[j],dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy)||1e-3;if(d<2.2*r0){var f=(2.2*r0-d)*.05;p.vx-=dx/d*f;p.vy-=dy/d*f;q.vx+=dx/d*f;q.vy+=dy/d*f;}});
  for(var a=0;a<4;a++){if(p.bond[a]>=0)continue;var pp=portXY(p,a),best=-1,bd=SEEK,bb=-1;
   near(p,function(j){if(j===i)return;var q=A[j];if(p.k>=0&&q.k>=0&&p.k!==q.k)return;for(var b=0;b<4;b++){if(q.bond[b]>=0||PORTS[b].q!==-PORTS[a].q)continue;var qq=portXY(q,b),d=Math.hypot(qq[0]-pp[0],qq[1]-pp[1]);if(d<bd){bd=d;best=j;bb=b;}}});
   if(best>=0){var q=A[best],qq=portXY(q,bb),dx=qq[0]-pp[0],dy=qq[1]-pp[1],d=Math.hypot(dx,dy)||1e-3,f=.012;p.vx+=dx/d*f;p.vy+=dy/d*f;q.vx-=dx/d*f;q.vy-=dy/d*f;
    p.w+=((dy*Math.cos(p.a)-dx*Math.sin(p.a))>0?1:-1)*.002;
    if(d<BOND-r0){p.bond[a]=B.length;q.bond[bb]=B.length;B.push({i:i,a:a,j:best,b:bb,on:true});}}}
 }
 for(var n=0;n<B.length;n++){var e=B[n];if(!e.on)continue;var p=A[e.i],q=A[e.j],P1=portXY(p,e.a),P2=portXY(q,e.b),dx=P2[0]-P1[0],dy=P2[1]-P1[1],d=Math.hypot(dx,dy);
  if(d>BREAK||R()<0.0006*T*T){e.on=false;p.bond[e.a]=-1;q.bond[e.b]=-1;continue;}
  var f=(d-BOND*.5)*.02;p.vx+=dx/(d||1)*f;p.vy+=dy/(d||1)*f;q.vx-=dx/(d||1)*f;q.vy-=dy/(d||1)*f;
  if(PORTS[e.a].q+PORTS[e.b].q!==0)throw new Error("bond is not a −1/+1 pair");}
 // keepers draw free 0-spheres in
 K.forEach(function(k){near(k,function(){});for(var i=0;i<A.length;i++){var p=A[i];if(p.k===k.n)continue;var dx=k.x-p.x,dy=k.y-p.y,d=Math.hypot(dx,dy);if(d<k.reach&&d>10){p.vx+=dx/d*.003;p.vy+=dy/d*.003;}}});
 var bonded=0;
 for(var i=0;i<A.length;i++){var p=A[i];p.vx+=(R()-.5)*.25*T;p.vy+=(R()-.5)*.25*T;p.vx*=.9;p.vy*=.9;p.w*=.95;p.a+=p.w;p.x+=p.vx;p.y+=p.vy;
  if(p.x<8){p.x=8;p.vx=Math.abs(p.vx);}if(p.x>W-8){p.x=W-8;p.vx=-Math.abs(p.vx);}if(p.y<8){p.y=8;p.vy=Math.abs(p.vy);}if(p.y>H-8){p.y=H-8;p.vy=-Math.abs(p.vy);}
  if(charge(p)!==0)throw new Error("0-sphere does not balance");for(var a=0;a<4;a++)if(p.bond[a]>=0)bonded++;}
 // homeostasis: bonding cools the world toward a setpoint
 var frac=bonded/(A.length*4||1);T+=((1-frac)*1.1+.05-T)*.02;
 if(tick%12===0){B=B.filter(function(e){return e.on;});A.forEach(function(p){p.bond=[-1,-1,-1,-1];});B.forEach(function(e,n){A[e.i].bond[e.a]=n;A[e.j].bond[e.b]=n;});components();}
}
function components(){var par=A.map(function(_,i){return i;});function f(x){while(par[x]!==x)x=par[x]=par[par[x]];return x;}
 B.forEach(function(e){par[f(e.i)]=f(e.j);});var C={};A.forEach(function(p,i){var r=f(i);(C[r]||(C[r]={m:[],bonds:0})).m.push(i);});B.forEach(function(e){C[f(e.i)].bonds++;});
 var used={};Object.keys(C).forEach(function(r){var c=C[r];if(c.m.length<3)return;var vote={};c.m.forEach(function(i){var k=A[i].k;if(k>=0)vote[k]=(vote[k]||0)+1;});
  var best=-1,bv=0;for(var k in vote)if(vote[k]>bv&&!used[k]){bv=vote[k];best=+k;}
  if(best<0&&c.m.length>=KT){var dead=K.filter(function(k){return !k.size&&!used[k.n];})[0];if(dead){best=dead.n;dead.x=0;dead.born=tick;}else if(K.length<8){best=K.length;K.push({n:best,name:APPEALS[best][0],c:APPEALS[best][1],x:0,y:0,reach:0,dom:0,born:tick});}}
  if(best<0)return;used[best]=1;var k=K[best],sx=0,sy=0;c.m.forEach(function(i){A[i].k=best;sx+=A[i].x;sy+=A[i].y;});
  k.tx=sx/c.m.length;k.ty=sy/c.m.length;if(!k.x){k.x=k.tx;k.y=k.ty;}k.size=c.m.length;k.reach=Math.min(100,30+Math.sqrt(c.m.length)*9);k.dom=Math.min(64,Math.floor(c.bonds/8));});
 K.forEach(function(k){if(!used[k.n]){k.size=0;}});var alive=K.filter(function(k){return k.size;}).length;if(alive===8&&FULL<0)FULL=tick;}
function draw(){var t=tick/60;g.clearRect(0,0,W,H);
 g.lineWidth=1.2;B.forEach(function(e){if(!e.on)return;var P1=portXY(A[e.i],e.a),P2=portXY(A[e.j],e.b);var k=A[e.i].k;g.strokeStyle=k>=0?K[k].c:"rgba(241,236,255,.45)";g.beginPath();g.moveTo(P1[0],P1[1]);g.lineTo(P2[0],P2[1]);g.stroke();});
 A.forEach(function(p){var c=p.k>=0?K[p.k].c:"#bcabe4";for(var a=0;a<4;a++){var pp=portXY(p,a);g.strokeStyle=PORTS[a].q<0?"#ff8aa8":"#7dffa8";g.globalAlpha=p.bond[a]>=0?.9:.45;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(pp[0],pp[1]);g.stroke();}
  g.globalAlpha=1;g.fillStyle=c;g.beginPath();g.arc(p.x-1.6*Math.cos(p.a+1.57),p.y-1.6*Math.sin(p.a+1.57),1.5,0,6.283);g.arc(p.x+1.6*Math.cos(p.a+1.57),p.y+1.6*Math.sin(p.a+1.57),1.5,0,6.283);g.fill();});
 K.forEach(function(k){if(!k.size)return;k.x+=(k.tx-k.x)*.08;k.y+=(k.ty-k.y)*.08;var u=Math.max(1.5,Math.min(3,1+k.size/40));
  for(var d=0;d<k.dom;d++){var a=d/64*6.283+t*.2,rr=k.reach*.75+((d%8)*1.5);g.fillStyle=k.c;g.globalAlpha=.75;g.fillRect(k.x+Math.cos(a)*rr-1.5,k.y+Math.sin(a)*rr-1.5,3,3);}g.globalAlpha=1;
  synth(g,k.x,k.y,u,k.c,t);g.fillStyle=k.c;g.font="700 11px ui-monospace,monospace";g.textAlign="center";g.fillText(k.name+" · "+k.dom,k.x,k.y+u*11);});}
var hud=document.getElementById("hud");
function hudTxt(){var on=B.filter(function(e){return e.on;}).length,dom=K.reduce(function(s,k){return s+k.dom;},0),tot=A.reduce(function(s,p){return s+charge(p);},0);
 if(tot!==0)throw new Error("world does not balance");hud.textContent="seed "+SEED+" · 0-spheres "+A.length+" · bonds "+on+" · keepers "+K.filter(function(k){return k.size;}).length+" · domains "+dom+" · T "+T.toFixed(2)+" · Σ "+tot;}
var KP=JSON.parse(document.getElementById("data").textContent).keepers;
cv.addEventListener("mousemove",function(e){var r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;cv.style.cursor=K.some(function(k){return k.size&&Math.hypot(k.x-x,k.y-y)<26;})?"pointer":"default";});
cv.addEventListener("click",function(e){var r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;for(var n=0;n<K.length;n++){var k=K[n];if(k.size&&Math.hypot(k.x-x,k.y-y)<26){location.href=KP[k.n].href;return;}}A.forEach(function(p){var dx=p.x-x,dy=p.y-y,d=Math.hypot(dx,dy);if(d<90){p.vx+=dx/(d||1)*3;p.vy+=dy/(d||1)*3;}});T+=.3;});
document.getElementById("reseed").onclick=function(){location.search="?seed="+((Math.random()*1e9)|0);};
document.getElementById("heat").onclick=function(){T+=.8;};
window.SIM={get keepers(){return K.filter(function(k){return k.size;}).map(function(k){return k.name+":"+k.dom;});},get full(){return FULL;},get born(){return K.map(function(k){return k.born;});},get tick(){return tick;},get n(){return A.length;},sig:function(){return A.slice(0,20).map(function(p){return Math.round(p.x)+","+Math.round(p.y);}).join("|");},seed:SEED,keeperAt:function(n){var k=K.filter(function(k){return k.n===n&&k.size;})[0];return k?[k.x,k.y]:null;},_run:function(n){for(var i=0;i<n;i++)step();}};
if(REDUCE){for(var s=0;s<2400;s++)step();draw();hudTxt();}
else{(function loop(){for(var s=0;s<2;s++)step();draw();if(tick%10===0)hudTxt();requestAnimationFrame(loop);})();}
})();
