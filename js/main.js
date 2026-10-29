/* ===== EDITE AQUI ===== */
const CONFIG = {
  CHECKOUT_URL: "#comprar",   // link do checkout (Kiwify, Hotmart, etc.)
  PRICE: "XX",                // preço, ex.: "27"
  OLD_PRICE: "",              // preço "de", ex.: "97" (deixe vazio para ocultar)
  GUARANTEE_DAYS: 7,          // 0 oculta a linha de garantia
  USERS: "",                 // nº REAL de comércios que já usam, ex.: "2.340" (vazio mostra o público do kit)
  // Resultados reais de clientes. Exemplo: { valor: "+38%", texto: "mais agendamentos na semana da Black", quem: "Nome, Salão X, Cidade" }
  RESULTADOS: [],
  // Depoimentos reais. Exemplo: { texto: "…", quem: "Nome, Studio X", img: "data:image/…" }
  AVALIACOES: []
};
/* ======================= */
(function(){
  var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
  document.querySelectorAll("[data-cta]").forEach(function(a){a.setAttribute("href",CONFIG.CHECKOUT_URL)});
  document.getElementById("price").textContent=CONFIG.PRICE;
  if(CONFIG.OLD_PRICE){document.getElementById("old").textContent="de R$ "+CONFIG.OLD_PRICE+" por"}
  if(CONFIG.USERS){document.getElementById("users-t").innerHTML="<b>+"+esc(CONFIG.USERS)+"</b> comércios usam esses templates"}
  var g=document.querySelector("[data-guarantee]");
  if(CONFIG.GUARANTEE_DAYS>0){g.textContent="Garantia de "+CONFIG.GUARANTEE_DAYS+" dias"}else{g.remove()}
  function ph(big,msg){return '<div class="card ph"><div class="big">'+big+'</div><small>'+msg+'</small></div>'}
  var r=document.getElementById("results"), v=document.getElementById("reviews");
  r.innerHTML=CONFIG.RESULTADOS.length?CONFIG.RESULTADOS.map(function(x){return '<div class="card"><div class="big">'+esc(x.valor)+'</div><p style="margin-top:10px;font-weight:600">'+esc(x.texto)+'</p><p class="who">'+esc(x.quem)+'</p></div>'}).join(""):[1,2,3].map(function(){return ph("+XX%","Resultado real de cliente: preencha em CONFIG.RESULTADOS")}).join("");
  var rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!rm){document.querySelectorAll("[data-cycle]").forEach(function(el,i){var v=el.getAttribute("data-cycle").split("|"),k=0;setTimeout(function(){setInterval(function(){k=(k+1)%v.length;el.textContent=v[k]},2400)},i*800)});
  document.querySelectorAll(".fade").forEach(function(b){var im=b.querySelectorAll("img"),k=0;setTimeout(function(){setInterval(function(){im[k].classList.remove("on");k=(k+1)%im.length;im[k].classList.add("on")},2400)},1600)})}
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches){setInterval(function(){k=(k+1)%vals.length;pct.textContent=vals[k]},1800)}
  v.innerHTML=CONFIG.AVALIACOES.length?CONFIG.AVALIACOES.map(function(x){return '<div class="card">'+(x.img?'<img src="'+esc(x.img)+'" alt="Print de avaliação de '+esc(x.quem)+'">':'')+'<q>“'+esc(x.texto||"")+'”</q><p class="who">'+esc(x.quem)+'</p></div>'}).join(""):[1,2,3].map(function(){return ph("“…”","Avaliação real: preencha em CONFIG.AVALIACOES")}).join("");
})();

/* mural do hero: repete as imagens de cada coluna para nunca ficar espaço vazio (o loop de -50% continua contínuo) */
(function(){
  document.querySelectorAll(".wall .col").forEach(function(col){
    var kids=Array.prototype.slice.call(col.children);
    for(var i=0;i<2;i++){kids.forEach(function(k){col.appendChild(k.cloneNode(true))})}
  });
})();

/* carrosséis de templates: setas que avançam uma "tela" e somem nas pontas */
(function(){
  document.querySelectorAll(".grid.stories, .grid.feed").forEach(function(g){
    var box=document.createElement("div");box.className="carousel";
    g.parentNode.insertBefore(box,g);box.appendChild(g);
    var mk=function(cls,label,txt,dir){var b=document.createElement("button");b.type="button";b.className="car-btn "+cls;b.setAttribute("aria-label",label);b.textContent=txt;
      b.addEventListener("click",function(){g.scrollBy({left:dir*g.clientWidth*0.85})});box.appendChild(b);return b};
    var prev=mk("prev","Templates anteriores","‹",-1),next=mk("next","Próximos templates","›",1);
    var upd=function(){prev.disabled=g.scrollLeft<=4;next.disabled=g.scrollLeft+g.clientWidth>=g.scrollWidth-4};
    g.addEventListener("scroll",upd,{passive:true});window.addEventListener("resize",upd);upd();
  });
})();

/* faixas "BLACK FRIDAY": repete o texto para preencher a tela toda e anima em loop contínuo */
(function(){
  document.querySelectorAll(".tape").forEach(function(t){
    var sp=t.querySelector("span");if(!sp)return;
    var txt=sp.textContent.replace(/\s+/g," ").trim()+" ✦ ";
    var unit=new Array(4).join(txt);
    var track=document.createElement("div");track.className="tape-track";
    for(var i=0;i<2;i++){var s=document.createElement("span");s.textContent=unit;track.appendChild(s)}
    t.innerHTML="";t.appendChild(track);
  });
})();
