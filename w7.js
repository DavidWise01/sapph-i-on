/* SaPpH{{i}}on · World 7 — shared cartoon engine: hallway mesh, pixel-synth keepers, living 0-spheres, story captions */
(function(){
"use strict";
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches, DPR=Math.min(2,window.devicePixelRatio||1);
var D=JSON.parse(document.getElementById("w7").textContent);
/* 0-sphere law, fail-loud */
var Z={dots:[0,0],vectors:[-1,-1],edges:[1,1]};
var SUM=Z.dots.concat(Z.vectors,Z.edges).reduce(function(a,b){return a+b;},0);
if(SUM!==0) throw new Error("0-sphere does not balance");
function hx(h){h=h.replace("#","");return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function rgba(h,a){var c=hx(h);return "rgba("+c[0]+","+c[1]+","+c[2]+","+a+")";}
function ease(x){x=Math.max(0,Math.min(1,x));return 1-Math.pow(1-x,3);}
function cl(x){return Math.max(0,Math.min(1,x));}

/* ---- L0/L1 background mesh, as in the hallway ---- */
(function(){var cv=document.getElementById("hall"); if(!cv) return; var g=cv.getContext("2d"),P=[],MT=0;
 function seed(){P.length=0;var n=Math.max(30,Math.min(70,Math.round(innerWidth*innerHeight/26000)));for(var i=0;i<n;i++)P.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.24,vy:(Math.random()-.5)*.24});}
 function rs(){cv.width=innerWidth*DPR;cv.height=innerHeight*DPR;g.setTransform(DPR,0,0,DPR,0,0);seed();}
 addEventListener("resize",rs); rs();
 function fr(){var W=innerWidth,H=innerHeight,i,j;g.clearRect(0,0,W,H);MT+=.01;var Dd=Math.min(W,H)*(.12+.03*Math.sin(MT)),D2=Dd*Dd;
  for(i=0;i<P.length;i++){var p=P[i];p.x=(p.x+p.vx+W)%W;p.y=(p.y+p.vy+H)%H;}
  for(i=0;i<P.length;i++)for(j=i+1;j<P.length;j++){var dx=P[i].x-P[j].x,dy=P[i].y-P[j].y,d2=dx*dx+dy*dy;if(d2<D2){g.strokeStyle="rgba(47,198,192,"+(.04+.16*(1-Math.sqrt(d2)/Dd)).toFixed(3)+")";g.beginPath();g.moveTo(P[i].x,P[i].y);g.lineTo(P[j].x,P[j].y);g.stroke();}}
  for(i=0;i<P.length;i++){g.fillStyle="rgba(220,208,255,.55)";g.beginPath();g.arc(P[i].x,P[i].y,1.4,0,6.283);g.fill();}
  if(!reduce) requestAnimationFrame(fr);}
 fr();})();

/* ---- pixel synth keeper (World II drawSynth style), alive: bob, blink, wave ---- */
var STY=["two","visor","three","two","visor","three","two","visor"];
function synth(g,x,y,u,hex,style,t,wave){
 var bob=Math.sin(t*3+x*.01)*u*.5, blink=(Math.sin(t*1.7+x)>.97);
 g.save(); g.translate(Math.round(x-8*u),Math.round(y-8*u+bob)); g.imageSmoothingEnabled=false;
 function px(a,b,w,h,c){g.fillStyle=c;g.fillRect(a*u,b*u,Math.ceil(w*u),Math.ceil(h*u));}
 var m="#2a3340",d="#171d26",l="#3d4a5c";
 px(7,0,2,2,hex); px(7.4,2,1.2,2,l);
 px(3,4,10,10,m); px(3,4,10,1,l); px(3,13,10,1,d); px(12,4,1,10,d); px(3,4,1,10,l);
 px(4,6,8,6,"#0a0e12");
 if(blink) px(4,8,8,.6,hex);
 else if(style==="visor") px(4,7,8,2,hex);
 else if(style==="three"){px(4,7,2,2,hex);px(7,7,2,2,hex);px(10,7,2,2,hex);}
 else {px(5,7,2,2,hex);px(9,7,2,2,hex);}
 px(5,10,6,1,l); for(var i=0;i<3;i++) px(5+i*2,10,1,1,hex);
 var w=wave?Math.sin(t*6)*1.2:0;
 px(1,8-w,2,1,l); px(13,8+w,2,1,l); px(0.5,7-w,1,1,hex); px(14.5,7+w,1,1,hex);
 px(5,14,2,2,d); px(9,14,2,2,d);
 g.restore();
}

/* ---- a living 0-sphere: 2 dots (0,0) pulse, 2 vectors (−1,−1) point in, 2 edges (+1,+1) reach out ---- */
function arrow(g,x1,y1,x2,y2,c,w){g.strokeStyle=c;g.fillStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();var a=Math.atan2(y2-y1,x2-x1),h=w*3.2;g.beginPath();g.moveTo(x2,y2);g.lineTo(x2-h*Math.cos(a-.5),y2-h*Math.sin(a-.5));g.lineTo(x2-h*Math.cos(a+.5),y2-h*Math.sin(a+.5));g.closePath();g.fill();}
function zero(g,cx,cy,r,t,hex,grow,labels){
 grow=grow==null?1:grow; var gd=ease(grow*3),gv=ease(grow*3-1),ge=ease(grow*3-2),pul=.5+.5*Math.sin(t*4+cx*.03);
 g.save();
 g.strokeStyle=rgba(hex,.25+.2*gd); g.lineWidth=Math.max(1,r*.04); g.beginPath(); g.arc(cx,cy,r*gd,0,6.283); g.stroke();
 var dx=r*.22, lw=Math.max(1,r*.05), f=Math.max(9,r*.17)|0;
 if(gd>0){ [-1,1].forEach(function(s){ g.fillStyle=hex; g.shadowColor=hex; g.shadowBlur=r*.25*pul; g.beginPath(); g.arc(cx+s*dx,cy,(r*.09+r*.04*pul)*gd,0,6.283); g.fill(); g.shadowBlur=0; }); }
 if(gv>0){ [-1,1].forEach(function(s){ var ox=cx+s*r*1.0, oy=cy-s*r*.62, k=.15*Math.sin(t*3); arrow(g, ox+(cx+s*dx-ox)*(1-gv)*0, oy, ox+(cx+s*dx*1.6-ox)*gv*(0.85+k), oy+(cy-oy)*gv*(0.85+k), "#ff8aa8", lw); }); }
 if(ge>0){ [-1,1].forEach(function(s){ var reach=r*(.75+.25*Math.sin(t*2.4+s))*ge; g.strokeStyle="#7dffa8"; g.lineWidth=lw; g.setLineDash([lw*2,lw*1.4]); g.beginPath(); g.moveTo(cx+s*dx,cy); g.lineTo(cx+s*(dx+reach),cy+reach*.55); g.stroke(); g.setLineDash([]); g.fillStyle="#7dffa8"; g.beginPath(); g.arc(cx+s*(dx+reach),cy+reach*.55,lw*1.2,0,6.283); g.fill(); }); }
 if(labels){ g.font="700 "+f+"px ui-monospace,monospace"; g.textAlign="center";
  if(gd>.5){g.fillStyle="#f1ecff"; g.fillText("0",cx-dx,cy-r*.2); g.fillText("0",cx+dx,cy-r*.2);}
  if(gv>.5){g.fillStyle="#ff8aa8"; g.textAlign="right"; g.fillText("\u22121",cx-r*1.05,cy+r*.7); g.textAlign="center"; g.fillText("\u22121",cx+r*.95,cy-r*.78);}
  if(ge>.5){g.fillStyle="#7dffa8"; g.fillText("+1",cx-r*.9,cy+r*.95); g.fillText("+1",cx+r*.9,cy+r*.95);} }
 g.restore();
}

/* ---- stage + loop + story captions + clickable regions ---- */
var cv=document.getElementById("stage"), g=cv.getContext("2d"), W=0,H=0, HIT=[], t0=performance.now(), END=D.end||20;
var cap=document.getElementById("cap"), lastCap=-1;
function size(){var w=cv.parentNode.clientWidth;W=w;H=Math.round(w*(w<560?(D.tall||1.15):(D.ratio||.62)));cv.width=W*DPR;cv.height=H*DPR;cv.style.height=H+"px";g.setTransform(DPR,0,0,DPR,0,0);}
addEventListener("resize",function(){size(); if(reduce) frame(END);}); size();
function caption(t){var s=D.story||[],k=-1;for(var i=0;i<s.length;i++) if(t>=s[i].at) k=i; if(k!==lastCap&&cap&&k>=0){lastCap=k;cap.innerHTML="";var b=document.createElement("span");b.className="who";b.style.color=s[k].c||"#2fc6c0";b.textContent=s[k].who+" \u00b7 ";cap.appendChild(b);cap.appendChild(document.createTextNode(s[k].text));}}
function hitAt(e){var r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;for(var i=HIT.length-1;i>=0;i--){var h=HIT[i];if((x-h.x)*(x-h.x)+(y-h.y)*(y-h.y)<=h.r*h.r) return h;}return null;}
cv.addEventListener("click",function(e){var h=hitAt(e); if(h) location.href=h.href;});
cv.addEventListener("mousemove",function(e){var h=hitAt(e); cv.style.cursor=h?"pointer":"default"; cv.title=h?h.label:"";});
var rb=document.getElementById("replay"); if(rb) rb.addEventListener("click",function(){t0=performance.now();lastCap=-1;if(reduce)frame(END);});
var sb=document.getElementById("skip"); if(sb) sb.addEventListener("click",function(){t0=performance.now()-END*1000;});
window.W7={frames:0,t:0,hit:HIT,zero:zero,synth:synth};
function frame(t){HIT.length=0; g.clearRect(0,0,W,H); SCENES[D.type](t); caption(t); window.W7.frames++; window.W7.t=t;}
function loop(){frame((performance.now()-t0)/1000); requestAnimationFrame(loop);}

/* ---- scenes ---- */
var SCENES={
 world:function(t){
  var C={x:W/2,y:H/2}, M=Math.min(W,H), R=M*.37, K=D.keepers, u=Math.max(1.6,M*.0105);
  var live=t>16;
  // birth
  var b=ease(t/3), cr=M*.09*b;
  if(live){ K.forEach(function(k,i){ var a=-Math.PI/2+i*Math.PI/4, x=C.x+R*Math.cos(a), y=C.y+R*Math.sin(a), w=Math.sin(t*1.3+i)*M*.05;
    g.strokeStyle=rgba(k.accent,.35+.25*Math.sin(t*2+i)); g.lineWidth=2+1.5*Math.sin(t*3+i); g.beginPath(); g.moveTo(C.x,C.y); g.quadraticCurveTo((C.x+x)/2-w*Math.sin(a),(C.y+y)/2+w*Math.cos(a),x,y); g.stroke(); }); }
  zero(g,C.x,C.y,cr,t,"#60a5fa",cl(t/3),false);
  g.strokeStyle="rgba(244,199,64,"+(.5*b)+")"; g.lineWidth=2; g.beginPath(); g.arc(C.x,C.y,cr*1.25+Math.sin(t*2)*2,0,6.283); g.stroke();
  g.fillStyle="#f1ecff"; g.font="700 "+Math.max(11,M*.03)+"px ui-monospace,monospace"; g.textAlign="center"; g.globalAlpha=b; g.fillText("SaPpH{{i}}on",C.x,C.y+cr*1.25+M*.045); g.globalAlpha=1;
  // keepers arrive, domains open, spheres populate
  K.forEach(function(k,i){
   var a=-Math.PI/2+i*Math.PI/4, tx=C.x+R*Math.cos(a), ty=C.y+R*Math.sin(a), p=ease((t-3-i*.4)/1.4);
   if(p<=0) return;
   var sx=C.x+M*1.1*Math.cos(a), sy=C.y+M*1.1*Math.sin(a), x=sx+(tx-sx)*p, y=sy+(ty-sy)*p;
   // domain grid fans out behind the keeper
   var open=Math.min(64,Math.max(0,Math.floor((t-7-i*.2)*18))), c=Math.max(2,M*.011), gx=x+Math.cos(a)*M*.1-4*c*1.25, gy=y+Math.sin(a)*M*.1-4*c*1.25;
   for(var j=0;j<open;j++){ var dd=k.domains[j], cx2=gx+(j%8)*c*1.25, cy2=gy+Math.floor(j/8)*c*1.25, popd=t>11+i*.3+j*.02;
    g.fillStyle=dd.lit&&popd?k.accent:rgba(k.accent,.18+(popd?.12*Math.sin(t*3+j):0)); g.fillRect(cx2,cy2,c,c); }
   // 0-spheres travelling from the centre to the keeper (populate)
   if(t>11){ for(var q=0;q<3;q++){ var ph=((t*.5+q/3+i*.11)%1); var px=C.x+(x-C.x)*ph, py=C.y+(y-C.y)*ph; zero(g,px,py,M*.018,t,k.accent,1,false);} }
   synth(g,x,y,u,k.accent,STY[i],t,p<1||live);
   g.fillStyle=k.accent; g.font="700 "+Math.max(10,M*.024)+"px ui-monospace,monospace"; g.textAlign="center"; g.globalAlpha=p; g.fillText(k.appeal,x,y+u*11); g.globalAlpha=1;
   if(p>.9) HIT.push({x:x,y:y,r:u*11,href:k.href,label:k.appeal+" \u2014 follow this keeper"});
  });
  if(t>11){ g.fillStyle="#bcabe4"; g.font=Math.max(10,M*.022)+"px ui-monospace,monospace"; g.textAlign="left";
   var n=Math.min(D.counts.zero_spheres,Math.floor((t-11)/5*D.counts.zero_spheres)); g.fillText("0-spheres "+n+"  \u03a3 = 0",10,H-12); }
 },
 keeper:function(t){
  var C={x:W/2,y:H/2}, M=Math.min(W,H), R=M*.4, k=D.keeper, u=Math.max(2,M*.016), walk=Math.sin(t*.7)*M*.03;
  synth(g,C.x+walk,C.y-M*.02,u,k.accent,k.style,t,true);
  g.fillStyle=k.accent; g.font="700 "+Math.max(12,M*.04)+"px ui-monospace,monospace"; g.textAlign="center"; g.fillText(k.appeal,C.x+walk,C.y+u*11);
  var open=Math.min(64,Math.floor(t*6)), r=Math.max(5,M*.024);
  for(var j=0;j<64;j++){ var a=-Math.PI/2+j/64*6.283, x=C.x+R*Math.cos(a), y=C.y+R*.92*Math.sin(a), d=k.domains[j];
   if(j>=open){ g.strokeStyle=rgba(k.accent,.15); g.beginPath(); g.arc(x,y,r*.4,0,6.283); g.stroke(); continue; }
   if(j===open-1&&open<64){ arrow(g,C.x+walk,C.y,x,y,rgba(k.accent,.6),1.5); }
   if(d.lit){ zero(g,x,y,r*1.3,t,k.accent,1,false); } else { g.strokeStyle=rgba(k.accent,.4+.3*Math.sin(t*3+j)); g.lineWidth=1.2; g.beginPath(); g.arc(x,y,r*.55,0,6.283); g.stroke(); g.fillStyle=k.accent; g.beginPath(); g.arc(x,y,1.6,0,6.283); g.fill(); }
   HIT.push({x:x,y:y,r:r*1.4,href:d.href,label:"domain "+d.n+" \u00b7 "+d.name});
  }
 },
 domain:function(t){
  var M=Math.min(W,H), k=D.keeper, d=D.domain, u=Math.max(2,M*.013), n=d.spheres.length;
  var kx=W*.12+(W*.76)*(.5+.5*Math.sin(t*.35)), ky=H-u*10;
  if(!n){ var gr=cl((t-1)/4); zero(g,W/2,H*.45,M*.28,t,k.accent,gr,true); HIT.push({x:W/2,y:H*.45,r:M*.3,href:d.zhref,label:"open this 0-sphere"}); }
  else { var cols=W<560?6:10, show=Math.min(n,60), cw=W/(cols+1), rr=Math.min(cw*.32,M*.06), born=Math.min(show,Math.floor(t*4));
   for(var i=0;i<born;i++){ var x=cw*(1+i%cols), y=cw*.8+Math.floor(i/cols)*cw*.95, pop=ease((t-i/4)*2);
    zero(g,x,y,rr*pop,t,k.accent,1,false); HIT.push({x:x,y:y,r:rr*1.3,href:d.spheres[i].h,label:d.spheres[i].t}); }
   if(n>show&&born>=show){ g.fillStyle="#bcabe4"; g.font="12px ui-monospace,monospace"; g.textAlign="right"; g.fillText("+"+(n-show)+" more below",W-10,14); }
   if(born<show){ var i2=born, x2=cw*(1+i2%cols), y2=cw*.8+Math.floor(i2/cols)*cw*.95; arrow(g,kx,ky-u*8,x2,y2,rgba(k.accent,.55),1.5); } }
  synth(g,kx,ky,u,k.accent,k.style,t,true);
 },
 tale:function(t){ var M=Math.min(W,H); window.W7T.scenes[D.tale](g,W,H,M,t,D); },
 zero:function(t){
  var M=Math.min(W,H), k=D.keeper, gr=cl(t/6), r=M*.3, cx=W/2, cy=H*.44;
  zero(g,cx,cy,r,t,k.accent,gr,true);
  var parts=["0","+ 0","+ (\u22121)","+ (\u22121)","+ (+1)","+ (+1)"], vals=[0,0,-1,-1,1,1], n=Math.min(6,Math.floor(t/1.1)), s=0;
  for(var i=0;i<n;i++) s+=vals[i];
  var txt=parts.slice(0,n).join(" ")+(n===6?" = 0":""); g.fillStyle="#f1ecff"; g.font="700 "+Math.max(11,M*.04)+"px ui-monospace,monospace"; g.textAlign="center"; g.fillText(txt||"\u2026",cx,H-M*.08);
  g.fillStyle=n===6?"#7dffa8":"#bcabe4"; g.font=Math.max(10,M*.03)+"px ui-monospace,monospace"; g.fillText("running \u03a3 = "+s,cx,H-M*.03);
  synth(g,W*.1+M*.05,H*.2,Math.max(1.6,M*.009),k.accent,k.style,t,n===6);
 }
};
if(!SCENES[D.type]) throw new Error("unknown scene");
if(reduce){ frame(END); } else { loop(); }
})();
