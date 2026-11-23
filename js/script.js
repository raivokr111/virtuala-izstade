document.addEventListener("DOMContentLoaded", () => {
  const atteli = document.querySelectorAll(".karusela-attels");
  const ieprieksejais = document.getElementById("ieprieksejais");
  const nakamais = document.getElementById("nakamais");
  const automatika = document.getElementById("automatika");
  const atteluIetvars = document.querySelector(".karusela-atteli");

  if (atteli.length < 2 || !ieprieksejais || !nakamais || !automatika || !atteluIetvars) {
    return;
  }

  let pasreizejaisAttels = 0;
  let atskanosana = true;
  let taimeris;
  const intervals = 5000;

  function paraditAttelu(indekss) {
    // Pēc pēdējā attēla atkal rāda pirmo un otrādi.
    pasreizejaisAttels = (indekss + atteli.length) % atteli.length;

    atteli.forEach((attels, vieta) => {
      attels.hidden = vieta !== pasreizejaisAttels;
    });
  }

  function atjaunotTaimeri() {
    // Vispirms atceļ iepriekšējo taimeri, lai attēli nepārslēgtos vairākkārt.
    clearInterval(taimeris);

    if (atskanosana) {
      taimeris = setInterval(() => {
        paraditAttelu(pasreizejaisAttels + 1);
      }, intervals);
    }
  }

  ieprieksejais.addEventListener("click", () => {
    paraditAttelu(pasreizejaisAttels - 1);
    atjaunotTaimeri();
  });

  nakamais.addEventListener("click", () => {
    paraditAttelu(pasreizejaisAttels + 1);
    atjaunotTaimeri();
  });

  automatika.addEventListener("click", () => {
    atskanosana = !atskanosana;
    automatika.textContent = atskanosana ? "Apturēt" : "Atsākt";
    // Automātiskas izmaiņas netiek nepārtraukti nolasītas ekrānlasītājā.
    atteluIetvars.setAttribute("aria-live", atskanosana ? "off" : "polite");
    atjaunotTaimeri();
  });

  ieprieksejais.disabled = false;
  nakamais.disabled = false;
  automatika.disabled = false;
  automatika.textContent = "Apturēt";
  atteluIetvars.setAttribute("aria-live", "off");
  paraditAttelu(0);
  atjaunotTaimeri();
});
