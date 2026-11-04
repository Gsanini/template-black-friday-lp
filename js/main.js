/* ===== EDITE AQUI ===== */
const CONFIG = {
  CHECKOUT_URL: "https://pay.cakto.com.br/8htnrzm_1261949", // link do checkout (Cakto)
  PRICE: "29,90", // preço à vista, ex.: "29,90"
  OLD_PRICE: "129,90", // preço "de", riscado (deixe vazio para ocultar)
  INSTALLMENTS: 6, // nº máximo de parcelas (0 oculta a linha)
  INSTALLMENT_VALUE: "5,79", // valor da parcela como aparece no checkout, ex.: "3,99". Vazio = preço ÷ parcelas, sem juros
  GUARANTEE_DAYS: 7, // 0 oculta a linha de garantia
  USERS: "", // nº REAL de comércios que já usam, ex.: "2.340" (vazio mostra o público do kit)
  // Resultados reais de clientes. Exemplo: { valor: "+38%", texto: "mais agendamentos na semana da Black", quem: "Nome, Loja X, Cidade" }
  RESULTADOS: [],
  // Avaliações reais. Exemplo:
  // { nome: "Ana Souza", info: "Nail designer · Studio Ana", foto: "assets/avaliacoes/ana.jpg", nota: 5, quando: "há 2 semanas", texto: "Postei todos os dias da Black…" }
  // (foto é opcional: sem ela aparece a inicial do nome)
  AVALIACOES: [
    {
      nome: "Ana Souza",
      info: "Nail designer · Studio Ana",
      foto: "assets/avaliacoes/avaliacao-1.jpg",
      nota: 5,
      quando: "há 2 semanas",
      texto:
        "Não imaginava que ia me ajudar tanto! Na última Black Friday eu fazia em média 10 a 15 agendamentos por semana, e dessa vez consegui chegar a 30/35. Fui postando as artes durante a semana e percebi que começou a aparecer bem mais gente interessada. Já fazia tempo que eu queria preparar uns posts assim, mas nunca tinha tempo pra fazer tudo do zero. Os templates facilitaram demais, só precisei editar algumas informações e postar. Valeu muito a pena, recomendo!",
    },
    {
      nome: "Carlos Lima",
      info: "Barbearia · Barbearia do Carlos",
      foto: "assets/avaliacoes/avaliacao-3.jpg",
      nota: 4.9,
      quando: "há 1 mês",
      texto:
        "Os templates são ótimos e economizam muito tempo para pessoas como eu que estão sempre tendo que cuidar de tudo, clientes, gestão, redes sociais… Recomendo!",
    },
    {
      nome: "Juliana Martins",
      info: "Esteticista · Espaço Juliana",
      foto: "assets/avaliacoes/avaliacao-2.jpg",
      nota: 5,
      quando: "há 3 dias",
      texto:
        "Adorei os templates! Consegui personalizar tudo rapidinho e ainda recebi elogios dos clientes. Com certeza vou usar em outras datas!",
    },
  ],
};
/* ======================= */
(function () {
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  document.querySelectorAll("[data-cta]").forEach(function (a) {
    a.setAttribute("href", CONFIG.CHECKOUT_URL);
  });
  var num = function (s) {
    return parseFloat(String(s).replace(/\./g, "").replace(",", ".")) || 0;
  };
  var brl = function (n) {
    return n.toFixed(2).replace(".", ",");
  };
  document.getElementById("price").textContent = CONFIG.PRICE;
  var oldEl = document.getElementById("old");
  if (CONFIG.OLD_PRICE) {
    oldEl.innerHTML = "de <s>R$ " + esc(CONFIG.OLD_PRICE) + "</s> por";
    var off = Math.round((1 - num(CONFIG.PRICE) / num(CONFIG.OLD_PRICE)) * 100);
    var offEl = document.getElementById("off");
    if (offEl && off > 0) offEl.textContent = "-" + off + "%";
  } else {
    oldEl.remove();
  }
  var instEl = document.getElementById("inst");
  if (instEl) {
    if (CONFIG.INSTALLMENTS > 1) {
      var parcela =
        CONFIG.INSTALLMENT_VALUE ||
        brl(Math.floor((num(CONFIG.PRICE) / CONFIG.INSTALLMENTS) * 100) / 100);
      instEl.innerHTML =
        "ou em até <b>" +
        CONFIG.INSTALLMENTS +
        "x de R$ " +
        esc(parcela) +
        "</b>";
    } else {
      instEl.remove();
    }
  }
  if (CONFIG.USERS) {
    document.getElementById("users-t").innerHTML =
      "<b>+" + esc(CONFIG.USERS) + "</b> comércios usam esses templates";
  }
  var g = document.querySelector("[data-guarantee]");
  if (CONFIG.GUARANTEE_DAYS > 0) {
    g.textContent = "Garantia de " + CONFIG.GUARANTEE_DAYS + " dias";
  } else {
    g.remove();
  }
  function ph(big, msg) {
    return (
      '<div class="card ph"><div class="big">' +
      big +
      "</div><small>" +
      msg +
      "</small></div>"
    );
  }
  var r = document.getElementById("results"),
    v = document.getElementById("reviews");
  // a section de resultados foi removida da página; só preenche se ela voltar
  if (r)
    r.innerHTML = CONFIG.RESULTADOS.length
      ? CONFIG.RESULTADOS.map(function (x) {
          return (
            '<div class="card"><div class="big">' +
            esc(x.valor) +
            '</div><p style="margin-top:10px;font-weight:600">' +
            esc(x.texto) +
            '</p><p class="who">' +
            esc(x.quem) +
            "</p></div>"
          );
        }).join("")
      : [1, 2, 3]
          .map(function () {
            return ph(
              "+XX%",
              "Resultado real de cliente: preencha em CONFIG.RESULTADOS",
            );
          })
          .join("");
  var rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!rm) {
    document.querySelectorAll("[data-cycle]").forEach(function (el, i) {
      var v = el.getAttribute("data-cycle").split("|"),
        k = 0;
      setTimeout(function () {
        setInterval(function () {
          k = (k + 1) % v.length;
          el.textContent = v[k];
        }, 2400);
      }, i * 800);
    });
    document.querySelectorAll(".fade").forEach(function (b) {
      var im = b.querySelectorAll("img"),
        k = 0;
      setTimeout(function () {
        setInterval(function () {
          im[k].classList.remove("on");
          k = (k + 1) % im.length;
          im[k].classList.add("on");
        }, 2400);
      }, 1600);
    });
  }
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(function () {
      k = (k + 1) % vals.length;
      pct.textContent = vals[k];
    }, 1800);
  }
  function stars(n) {
    n = Math.max(0, Math.min(5, Math.round(n == null ? 5 : n)));
    return (
      '<span class="rv-stars" role="img" aria-label="' +
      n +
      ' de 5 estrelas">' +
      "★★★★★".slice(0, n) +
      "<i>" +
      "★★★★★".slice(n) +
      "</i></span>"
    );
  }
  function review(x, ph) {
    var nome = x.nome || x.quem || "";
    var ini =
      '<span class="rv-av" aria-hidden="true">' +
      esc((nome.trim()[0] || "?").toUpperCase()) +
      "</span>";
    // se a foto não carregar, volta para a inicial do nome
    var av = x.foto
      ? '<img class="rv-av" src="' +
        esc(x.foto) +
        '" alt="" loading="lazy" onerror="this.outerHTML=this.dataset.ini" data-ini="' +
        esc(ini) +
        '">'
      : ini;
    return (
      '<article class="review' +
      (ph ? " ph" : "") +
      '"><header>' +
      av +
      '<div><b class="rv-name">' +
      esc(nome) +
      "</b>" +
      (x.info ? '<span class="rv-info">' + esc(x.info) + "</span>" : "") +
      "</div></header>" +
      '<div class="rv-meta">' +
      stars(x.nota) +
      (x.quando ? "<span>" + esc(x.quando) + "</span>" : "") +
      '</div><p class="rv-text">' +
      esc(x.texto || "") +
      "</p></article>"
    );
  }
  v.innerHTML = CONFIG.AVALIACOES.length
    ? CONFIG.AVALIACOES.map(function (x) {
        return review(x);
      }).join("")
    : [1, 2, 3]
        .map(function () {
          return review(
            {
              nome: "Nome da cliente",
              info: "Ramo · Nome do negócio",
              quando: "há X dias",
              texto:
                "Avaliação real: preencha em CONFIG.AVALIACOES, no topo do js/main.js.",
            },
            true,
          );
        })
        .join("");
})();

/* mural do hero: repete as imagens de cada coluna para nunca ficar espaço vazio (o loop de -50% continua contínuo) */
(function () {
  document.querySelectorAll(".wall .col").forEach(function (col) {
    var kids = Array.prototype.slice.call(col.children);
    for (var i = 0; i < 2; i++) {
      kids.forEach(function (k) {
        col.appendChild(k.cloneNode(true));
      });
    }
  });
})();

/* o que você recebe: duplica os templates e corre em loop; a duração acompanha a largura para manter a mesma velocidade */
(function () {
  document.querySelectorAll(".marquee").forEach(function (m) {
    var track = document.createElement("div");
    track.className = "marquee-track";
    while (m.firstChild) track.appendChild(m.firstChild);
    Array.prototype.slice.call(track.children).forEach(function (k) {
      var c = k.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      track.appendChild(c);
    });
    m.appendChild(track);
    var set = function () {
      track.style.setProperty(
        "--dur",
        Math.max(30, track.scrollWidth / 2 / 40) + "s",
      );
    };
    track.querySelectorAll("img").forEach(function (i) {
      i.loading = "eager";
      i.addEventListener("load", set);
    });
    set();
  });
  var hoje = new Date().toLocaleDateString("pt-BR");
  document.querySelectorAll("[data-today]").forEach(function (t) {
    t.textContent = hoje;
  });
})();

/* faixas "BLACK FRIDAY": repete o texto para preencher a tela toda e anima em loop contínuo */
(function () {
  document.querySelectorAll(".tape").forEach(function (t) {
    var sp = t.querySelector("span");
    if (!sp) return;
    var txt = sp.textContent.replace(/\s+/g, " ").trim() + " ✦ ";
    var unit = new Array(4).join(txt);
    var track = document.createElement("div");
    track.className = "tape-track";
    for (var i = 0; i < 2; i++) {
      var s = document.createElement("span");
      s.textContent = unit;
      track.appendChild(s);
    }
    t.innerHTML = "";
    t.appendChild(track);
  });
})();

/* passo a passo: o botão dá play com som; um vídeo por vez; ao terminar volta o botão */
(function () {
  var vids = Array.prototype.slice.call(
    document.querySelectorAll(".step-video video"),
  );
  vids.forEach(function (v) {
    var box = v.parentNode,
      btn = box.querySelector(".step-play");
    btn.addEventListener("click", function () {
      v.controls = true;
      v.play();
    });
    v.addEventListener("play", function () {
      box.classList.add("playing");
      vids.forEach(function (o) {
        if (o !== v) o.pause();
      });
    });
    v.addEventListener("ended", function () {
      box.classList.remove("playing");
      v.controls = false;
      v.currentTime = 0;
      v.load();
    });
  });
})();
