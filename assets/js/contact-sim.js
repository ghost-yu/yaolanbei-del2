// Contact page simulator
(function(){
function g(id){return document.getElementById(id)}

function cb(w){
  if(w<380)return "\u7d2b\u5916\uff08UV\uff09";
  if(w<=780)return "\u53ef\u89c1\u5149\uff08VIS\uff09";
  return "\u8fd1\u7ea2\u5916\uff08NIR\uff09"
}

function tr(w,l,s){
  if(s==="research")return "\u7814\u53d1\u670d\u52a1\u578b\uff08L4\uff09";
  if(w>1500||l>=12)return "\u4e13\u5c5e\u4f18\u5316\u578b\u8f6c\u5149\u819c\uff08L3\uff09";
  if(s==="pv"||s==="agri"||l>=6)return "\u573a\u666f\u5b9a\u5236\u578b\u8f6c\u5149\u819c\uff08L2\uff09";
  return "\u57fa\u7840\u901a\u7528\u578b\u8f6c\u5149\u819c\uff08L1\uff09"
}

function es(w,l,s){
  if(s==="research")return null;
  if(w>1500||l>=12)return 13.8;
  if(s==="pv"||s==="agri"||l>=6)return 7.8;
  return 5.0
}

function bc(t,e){
  if(e===null)return '<span class="chip warn">\u9700\u4e13\u9879\u8bc4\u4f30</span>';
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
  g("outQuote").textContent=e===null ? "\u56fa\u5b9a\u7814\u53d1\u8d39 + \u91cf\u4ea7\u4ef7" : "\u00a5"+e.toFixed(1)+"/\u33a1";
  g("outMatch").innerHTML=bc(p,e);
  g("outPlan").textContent= e===null ? "\u5efa\u8bae\u5148\u660e\u786e\u7814\u53d1\u8303\u56f4\u4e0e\u91cf\u4ea7\u4ef7\u683c\u53e3\u5f84\u3002" : ((p/e<0.92) ? "\u5efa\u8bae\u5206\u9636\u6bb5\u5b9e\u65bd\u3002" : "\u5efa\u8bae\u6309\u6807\u51c6\u6d41\u7a0b\u63a8\u8fdb\u3002");
  g("outValue").textContent=tr(w,l,s)+"\u3002\u9002\u914d\u4e2d\u77ed\u5468\u671f\u9a8c\u8bc1\u3002";
}

g("simulate").addEventListener("click",rs);
["wave","life","price","scene"].forEach(function(id){g(id).addEventListener("input",rs);g(id).addEventListener("change",rs)});
rs();
})();
