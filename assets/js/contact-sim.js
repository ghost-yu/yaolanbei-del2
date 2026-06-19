// Contact page simulator
(function(){
function g(id){return document.getElementById(id)}

function cb(w){
  if(w<380)return "\u7d2b\u5916\uff08UV\uff09";
  if(w<=780)return "\u53ef\u89c1\u5149\uff08VIS\uff09";
  return "\u8fd1\u7ea2\u5916\uff08NIR\uff09"
}

function tr(w,l,s){
  if(s==="research"||w>1500||l>=12)return "\u9ad8\u7a33\u6001\u8f6c\u5149\u819c";
  if(s==="pv"||s==="agri"||l>=6)return "\u5b9a\u5236\u578b\u8f6c\u5149\u819c";
  return "\u901a\u7528\u578b\u8f6c\u5149\u819c"
}

function es(w,l,s){
  var b=280;
  if(w<380)b+=95;else if(w<=780)b+=65;else if(w<=1500)b+=145;else b+=220;
  b+=l*30;
  var f={pv:1.18,agri:1.12,research:1.26,industry:1.04};
  return Math.min(30,Math.round(b*f[s]))
}

function bc(t,e){
  var r=t/e;
  if(r>=1.08)return '<span class="chip ok">\u9884\u7b97\u5145\u8db3</span>';
  if(r>=0.92)return '<span class="chip warn">\u9884\u7b97\u504f\u7d27</span>';
  return '<span class="chip bad">\u9884\u7b97\u4e0d\u8db3</span>'
}

function rs(){
  var w=Number(g("wave").value||850),l=Number(g("life").value||8),
      p=Number(g("price").value||620),s=g("scene").value,e=es(w,l,s);
  g("outBand").textContent=cb(w);
  g("outTier").textContent=tr(w,l,s);
  g("outQuote").textContent="\u00a5"+e+"/\u33a1";
  g("outMatch").innerHTML=bc(p,e);
  g("outPlan").textContent= (p/e<0.92) ? "\u5efa\u8bae\u5206\u9636\u6bb5\u5b9e\u65bd\u3002" : "\u5efa\u8bae\u6309\u6807\u51c6\u6d41\u7a0b\u63a8\u8fdb\u3002";
  g("outValue").textContent=tr(w,l,s)+"\u3002\u9002\u914d\u4e2d\u77ed\u5468\u671f\u9a8c\u8bc1\u3002";
}

g("simulate").addEventListener("click",rs);
["wave","life","price","scene"].forEach(function(id){g(id).addEventListener("input",rs);g(id).addEventListener("change",rs)});
rs();
})();
