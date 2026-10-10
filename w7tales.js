/* SaPpH{{i}}on · the ten tales — scenes rebuilt from the old 7^3 door. Each proves its count on load and throws if it fails. */
(function(){
"use strict";
var T=window.W7T={};
function cube(){var c={corner:0,edge:0,face:0,interior:0},sh=[0,0,0,0,0,0,0,0,0,0],x,y,z;
 for(z=0;z<7;z++)for(y=0;y<7;y++)for(x=0;x<7;x++){var f=(x%6?0:1)+(y%6?0:1)+(z%6?0:1);c[["interior","face","edge","corner"][f]]++;sh[Math.abs(x-3)+Math.abs(y-3)+Math.abs(z-3)]++;}
 return {c:c,sh:sh};}
var CB=cube(), BASE=342*343/2;
if(CB.c.corner!==8||CB.c.edge!==60||CB.c.face!==150||CB.c.interior!==125) throw new Error("cube census failed");
if(BASE!==58653||BASE+343*171!==117306) throw new Error("world sum failed");
if(CB.sh.reduce(function(a,b){return a+b;},0)!==343||CB.sh[0]!==1||CB.sh[9]!==8) throw new Error("keeper distance failed");
if(+("24".split("").reverse().join(""))!==42||"420024".split("").reverse().join("")!=="420024") throw new Error("mirror failed");
function gcd(a,b){return b?gcd(b,a%b):a;} if(27*4/gcd(27,4)!==108||107-27+1!==81) throw new Error("stitch failed");
if(250+751!==1001) throw new Error("atmospheres failed");
T.cube=CB;
function iso(W,H,M,t,spin){var s=M*.045,a=spin?t*.25:0.6,ca=Math.cos(a),sa=Math.sin(a);return function(x,y,z){var X=(x-3)*ca-(z-3)*sa,Z=(x-3)*sa+(z-3)*ca;return {x:W/2+X*s,y:H*.5+(y-3)*s*.82+Z*s*.38,z:Z};};}
function txt(g,s,x,y,sz,c,al){g.fillStyle=c||"#f1ecff";g.font="700 "+sz+"px ui-monospace,monospace";g.textAlign=al||"center";g.fillText(s,x,y);}
var KC={corner:"#f4c740",edge:"#2fc6c0",face:"#a87bff",interior:"#ff8aa8",keeper:"#60a5fa"};
function kind(x,y,z){if(x===3&&y===3&&z===3)return "keeper";var f=(x%6?0:1)+(y%6?0:1)+(z%6?0:1);return ["interior","face","edge","corner"][f];}
function drawCube(g,P,M,n,col){var L=[],x,y,z,i=0;for(y=0;y<7;y++)for(z=0;z<7;z++)for(x=0;x<7;x++){if(i++>=n)break;var p=P(x,y,z);L.push([p,x,y,z]);}
 L.sort(function(a,b){return a[0].z-b[0].z;});L.forEach(function(e){var k=kind(e[1],e[2],e[3]);g.fillStyle=col?col(e[1],e[2],e[3],k):KC[k];g.globalAlpha=k==="interior"?.35:.85;g.beginPath();g.arc(e[0].x,e[0].y,M*.011+(k==="keeper"?M*.012:0),0,6.283);g.fill();});g.globalAlpha=1;}
T.scenes={
 "cube-of-7":function(g,W,H,M,t,A){var n=Math.min(343,Math.floor(t*30));drawCube(g,iso(W,H,M,t,true),M,n);
  var c={corner:0,edge:0,face:0,interior:0,keeper:0},i=0,x,y,z;for(y=0;y<7;y++)for(z=0;z<7;z++)for(x=0;x<7;x++){if(i++>=n)break;c[kind(x,y,z)]++;}
  txt(g,"layer "+Math.min(7,Math.ceil(n/49))+" of 7 · "+n+" / 343",W/2,M*.07,Math.max(11,M*.035));
  txt(g,"corner "+c.corner+"  edge "+c.edge+"  face "+c.face+"  interior "+(c.interior+c.keeper),W/2,H-M*.04,Math.max(10,M*.028),"#bcabe4");},
 "one-center":function(g,W,H,M,t,A){var P=iso(W,H,M,t,true);drawCube(g,P,M,343,function(x,y,z,k){return k==="keeper"?"#60a5fa":"rgba(188,171,228,.5)";});
  var p=P(3,3,3),r=M*.05+Math.sin(t*3)*M*.008;W7.zero(g,p.x,p.y,r,t,"#60a5fa",1,false);
  var k=Math.min(171,Math.floor(t*25));txt(g,"58653 + 343 × "+k+" = "+(58653+343*k),W/2,H-M*.05,Math.max(11,M*.036),k===171?"#7dffa8":"#f1ecff");txt(g,"(3,3,3) · key 171",W/2,M*.07,Math.max(10,M*.03),"#bcabe4");},
 "eight-seats":function(g,W,H,M,t,A){var P=iso(W,H,M,t,true),K=A.keepers,i=0;drawCube(g,P,M,343,function(){return "rgba(188,171,228,.25)";});
  for(var b=0;b<8;b++){var x=b&1?6:0,y=b&2?6:0,z=b&4?6:0,p=P(x,y,z),ar=Math.min(1,Math.max(0,t-b*.6)/1.2);if(ar<=0)continue;var k=K[b];
   W7.synth(g,p.x,p.y-M*.03,Math.max(1.4,M*.006),k.accent,k.style,t,ar<1);
   for(var s=0;s<3;s++){var ph=t*1.5+s*2.094+b,sp=Math.min(1,Math.max(0,t-4-b*.3));if(sp>0){W7.zero(g,p.x+Math.cos(ph)*M*.07*sp,p.y+Math.sin(ph)*M*.035*sp,M*.012,t,k.accent,1,false);i++;}}}
  txt(g,"seats 8 · spheres "+i+" / 24",W/2,M*.07,Math.max(11,M*.035),i===24?"#7dffa8":"#f1ecff");},
 "twenty-four-cats":function(g,W,H,M,t,A){var cols=W<560?4:8,cw=W/(cols+.5),n=Math.min(24,Math.floor(t*3)),parts=0;
  for(var i=0;i<n;i++){var x=cw*(.75+i%cols),y=cw*.75+Math.floor(i/cols)*cw*.95,s=Math.min(cw*.32,M*.07),c=A.keepers[Math.floor(i/3)].accent,tail=Math.sin(t*4+i)*.6;
   g.save();g.translate(x,y);g.fillStyle=c;g.strokeStyle=c;g.lineWidth=Math.max(1.5,s*.12);
   g.beginPath();g.ellipse(0,s*.35,s*.5,s*.32,0,0,6.283);g.fill();g.beginPath();g.arc(0,-s*.2,s*.32,0,6.283);g.fill();
   g.beginPath();g.moveTo(-s*.3,-s*.35);g.lineTo(-s*.2,-s*.68);g.lineTo(-s*.05,-s*.45);g.moveTo(s*.3,-s*.35);g.lineTo(s*.2,-s*.68);g.lineTo(s*.05,-s*.45);g.fill();
   g.beginPath();g.moveTo(s*.45,s*.45);g.quadraticCurveTo(s*.9,s*.2,s*.75+tail*s*.3,-s*.25);g.stroke();
   var bl=Math.sin(t*1.3+i*2)>.95;g.fillStyle="#120a26";if(bl){g.fillRect(-s*.18,-s*.22,s*.12,s*.03);g.fillRect(s*.06,-s*.22,s*.12,s*.03);}else{g.beginPath();g.arc(-s*.12,-s*.22,s*.06,0,6.283);g.arc(s*.12,-s*.22,s*.06,0,6.283);g.fill();}
   g.restore();parts+=25;}
  txt(g,"cats "+n+" / 24 · parts "+parts+" / 600",W/2,H-M*.04,Math.max(11,M*.034),n===24?"#7dffa8":"#f1ecff");},
 "keeper-distance":function(g,W,H,M,t,A){var P=iso(W,H,M,t,true),ring=(t*1.2)%11;drawCube(g,P,M,343,function(x,y,z){var d=Math.abs(x-3)+Math.abs(y-3)+Math.abs(z-3);var on=Math.abs(d-ring)<.6;return on?"#f4c740":(d<ring?"rgba(47,198,192,.6)":"rgba(188,171,228,.3)");});
  var sh=CB.sh,bw=W*.8/10,shown=Math.min(10,Math.floor(ring)+1),tot=0;for(var d=0;d<10;d++){var h=sh[d]/sh[6]*M*.12,x=W*.1+d*bw;g.fillStyle=d<shown?"#2fc6c0":"rgba(47,198,192,.2)";g.fillRect(x+2,H-M*.06-h,bw-4,h);if(d<shown)tot+=sh[d];txt(g,String(sh[d]),x+bw/2,H-M*.06-h-4,Math.max(9,M*.022),"#bcabe4");}
  txt(g,"shell "+Math.min(9,Math.floor(ring))+" · Σ "+tot+" / 343",W/2,M*.07,Math.max(11,M*.035),tot===343?"#7dffa8":"#f1ecff");},
 "shelves":function(g,W,H,M,t,A){var S=A.shelves,n=S.length,cols=W<560?5:8,cw=W/(cols+.5),rh=Math.min(cw*.55,(H-M*.15)/Math.ceil(n/cols)),shown=Math.min(n,Math.floor(t*4)),files=0;
  for(var i=0;i<shown;i++){var x=cw*(.25+i%cols),y=M*.1+Math.floor(i/cols)*rh,sl=Math.min(1,(t-i/4)*2),c=A.keepers[i%8].accent;g.globalAlpha=sl;
   for(var b=0;b<S[i].n;b++){g.fillStyle=b%2?c:"rgba(241,236,255,.7)";g.fillRect(x+b*(cw*.85/24)*(1-(1-sl)*2),y,Math.max(1,cw*.85/24-1),rh*.55);}
   g.globalAlpha=1;txt(g,S[i].name,x,y+rh*.85,Math.max(8,Math.min(11,cw*.11)),c,"left");files+=S[i].n;}
  txt(g,"shelves "+shown+" / "+n+" · files "+files,W/2,H-M*.03,Math.max(11,M*.032),shown===n?"#7dffa8":"#f1ecff");},
 "strip":function(g,W,H,M,t,A){var ph=Math.floor(t/1.6)%6,steps=["24","42","240042","420024","420024 \u2194 420024","offset 1 \u2192 402 · offset 2 \u2192 204"],y=H*.42,w=Math.min(W*.8,M*1.2);
  for(var i=0;i<12;i++){var x=W/2-w/2+i*w/12,up=(i%2?1:-1)*Math.sin(t*2+i)*M*.03;g.fillStyle=i%2?"#ff8aa8":"#7dffa8";g.fillRect(x+2,y-M*.05+up,w/12-4,M*.1);txt(g,i%2?"+":"\u2212",x+w/24,y+M*.015+up,Math.max(12,M*.045),"#120a26");}
  g.strokeStyle="rgba(244,199,64,.7)";g.lineWidth=2;for(var m=0;m<4;m++){var mx=W/2+(m-1.5)*w*.25;g.beginPath();g.moveTo(mx,y-M*.12);g.lineTo(mx,y+M*.12);g.stroke();}
  txt(g,steps[ph],W/2,H*.72,Math.max(13,M*.05),ph>=3?"#7dffa8":"#f1ecff");txt(g,"\u2212+ and +\u2212 · offsets 1, 2, 1, 2, 1, 2",W/2,H*.85,Math.max(10,M*.028),"#bcabe4");},
 "kernel-stitch":function(g,W,H,M,t,A){var tick=Math.min(108,Math.floor(t*9)),R5=[5,0,0,5],cx=W/2,cy=H*.45,r=M*.3;
  g.strokeStyle="rgba(47,198,192,.25)";g.lineWidth=2;g.beginPath();g.arc(cx,cy,r,0,6.283);g.stroke();
  for(var i=0;i<27;i++){var a=-Math.PI/2+i/27*6.283,on=i===tick%27;g.fillStyle=on?"#f4c740":"rgba(241,236,255,.45)";g.beginPath();g.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),on?M*.018:M*.008,0,6.283);g.fill();}
  for(var j=0;j<4;j++){var a2=-Math.PI/2+j/4*6.283,on2=j===tick%4;g.fillStyle=on2?"#ff8aa8":"rgba(255,138,168,.35)";g.beginPath();g.arc(cx+r*.45*Math.cos(a2),cy+r*.45*Math.sin(a2),M*.03,0,6.283);g.fill();txt(g,String(R5[j]),cx+r*.45*Math.cos(a2),cy+r*.45*Math.sin(a2)+M*.012,Math.max(10,M*.032),"#120a26");}
  txt(g,"tick "+tick+(tick>=27?" · carry "+(Math.min(tick,107)-27+1)+" / 81":""),cx,cy+M*.012,Math.max(11,M*.04),tick===108?"#7dffa8":"#f1ecff");
  txt(g,tick===108?"cross 27 and rhythm 4 meet again at 108":"cross 27 · rhythm 5, 0, 0, 5",cx,H-M*.04,Math.max(10,M*.03),"#bcabe4");},
 "atmospheres":function(g,W,H,M,t,A){var v=Math.max(0,1000-Math.floor(t*90)),y=M*.08+(1-v/1000)*(H-M*.2),x=W/2+Math.sin(t*2)*M*.08;
  for(var i=0;i<40;i++){var yy=M*.08+i/40*(H-M*.2);g.fillStyle="rgba(96,165,250,"+(.03+.12*(1-i/40))+")";g.fillRect(0,yy,W,(H-M*.2)/40);}
  g.strokeStyle="rgba(244,199,64,.6)";g.setLineDash([4,4]);var y75=M*.08+.25*(H-M*.2);g.beginPath();g.moveTo(0,y75);g.lineTo(W,y75);g.stroke();g.setLineDash([]);txt(g,"750 · the fall begins",8,y75-4,Math.max(9,M*.024),"#f4c740","left");
  var k=A.keepers[(Math.floor(t)%8)];W7.synth(g,x,y,Math.max(1.6,M*.008),k.accent,k.style,t,true);
  txt(g,v+" atm",W/2,H-M*.06,Math.max(13,M*.05),v===0?"#7dffa8":"#f1ecff");txt(g,"250 elements + 751 elements = 1001 steps, 1000 → 0",W/2,H-M*.02,Math.max(9,M*.026),"#bcabe4");},
 "world-in-a-cell":function(g,W,H,M,t,A){var key=Math.floor(t/3)%343,ph=(t%3)/3,P=iso(W,H,M,t,false),x=key%7,y=Math.floor(key/49),z=Math.floor(key/7)%7;
  drawCube(g,P,M,343,function(a,b,c){return a===x&&b===y&&c===z?"#f4c740":"rgba(188,171,228,.25)";});var p=P(x,y,z),R=M*.04+ph*M*.22;
  g.fillStyle="rgba(14,7,34,"+(.6*ph)+")";g.beginPath();g.arc(p.x+(W/2-p.x)*ph,p.y+(H/2-p.y)*ph,R,0,6.283);g.fill();g.strokeStyle="#f4c740";g.lineWidth=2;g.stroke();
  var cx=p.x+(W/2-p.x)*ph,cy=p.y+(H/2-p.y)*ph,L=Math.floor(ph*7.99);for(var l=0;l<=L;l++){g.strokeStyle="rgba(47,198,192,"+(.3+.1*l)+")";g.beginPath();g.arc(cx,cy,R*(l+1)/8,0,6.283);g.stroke();}
  txt(g,"cell ("+x+","+y+","+z+") · key "+key+" · world "+(58653+343*key),W/2,M*.07,Math.max(10,M*.032),"#f1ecff");txt(g,"layer "+(L+1)+" of 7 builds inside",W/2,H-M*.04,Math.max(10,M*.028),"#bcabe4");}
};
})();
(function(){
"use strict";
var T=window.W7T, D=JSON.parse(document.getElementById("w7").textContent);
T.scenes.artifact=function(g,W,H,M,t,A){var k=A.keepers[0],c=A.cells,s=M*.09,cx=W/2,cy=H*.48,rot=Math.sin(t*.8)*.25,pop=Math.min(1,t/2);
 g.save();g.translate(cx,cy);g.rotate(rot);g.scale(pop,pop);g.strokeStyle=k.accent;g.lineWidth=2;g.setLineDash([6,4]);g.lineDashOffset=-t*20;g.beginPath();g.arc(0,0,s*3.6,0,6.283);g.stroke();g.setLineDash([]);
 c.forEach(function(p,i){var b=.75+.25*Math.sin(t*3+i);g.fillStyle=k.accent;g.globalAlpha=b;g.fillRect((p[0]-2.5)*s,(p[1]-2.5)*s,s*.9,s*.9);});g.globalAlpha=1;g.restore();
 var hx=A.sha||"",n=Math.min(64,Math.floor(t*12));g.fillStyle="#7dffa8";g.font=Math.max(9,M*.028)+"px ui-monospace,monospace";g.textAlign="center";g.fillText(hx.slice(0,n),cx,H-M*.05);
 W7.synth(g,W*.14+Math.sin(t*.6)*M*.05,H*.7,Math.max(1.6,M*.01),k.accent,k.style,t,true);};
if(D.verify&&D.sha){var st=function(x,c){var e=document.getElementById("sealst");if(e){e.textContent=x;e.style.color=c;}};
 if(!(window.crypto&&crypto.subtle)){st("not checked: this browser has no crypto.subtle here","#f4c740");return;}
 fetch(D.verify).then(function(r){if(!r.ok)throw new Error("seal: file missing");return r.arrayBuffer();}).then(function(b){return crypto.subtle.digest("SHA-256",b);}).then(function(h){
  var x=Array.prototype.map.call(new Uint8Array(h),function(v){return("0"+v.toString(16)).slice(-2);}).join("");
  if(x!==D.sha){st("MISMATCH","#ff6b6b");throw new Error("seal mismatch: "+x);} st("verified on load:","#7dffa8");});}
})();
