const planData = {
  en: [
    ["Plan One", "1 hour / week", "4 private classes", "₡36,000", "₡9,000 per hour"],
    ["Plan Two", "2 hours / week", "8 private classes", "₡68,000", "₡8,500 per hour"],
    ["Plan Three", "3 hours / week", "12 private classes", "₡96,000", "₡8,000 per hour"],
    ["Plan Four", "4 hours / week", "16 private classes", "₡120,000", "₡7,500 per hour"]
  ],
  es: [
    ["Plan Uno", "1 hora / semana", "4 clases privadas", "₡36.000", "₡9.000 por hora"],
    ["Plan Dos", "2 horas / semana", "8 clases privadas", "₡68.000", "₡8.500 por hora"],
    ["Plan Tres", "3 horas / semana", "12 clases privadas", "₡96.000", "₡8.000 por hora"],
    ["Plan Cuatro", "4 horas / semana", "16 clases privadas", "₡120.000", "₡7.500 por hora"]
  ]
};

let language = "en";
const button = document.querySelector("#language");
const grid = document.querySelector("#plan-grid");

function renderPlans() {
  const cta = language === "en" ? "Start your intake" : "Inicia tu entrevista";
  const savings = language === "en" ? ["", "Save ₡500 / class", "Save ₡1,000 / class", "Save ₡1,500 / class"] : ["", "Ahorra ₡500 / clase", "Ahorra ₡1.000 / clase", "Ahorra ₡1.500 / clase"];
  grid.innerHTML = planData[language].map((plan, index) => `<article class="plan-card"><div class="plan-top"><span>${String(index + 1).padStart(2, "0")}</span></div><h3>${plan[0]}</h3><strong>${plan[1]}</strong><p>${plan[2]}</p><div class="price">${savings[index] ? `<small class="savings">${savings[index]}</small>` : ""}<b>${plan[3]}</b><span>${plan[4]}</span></div><a class="whatsapp" href="https://wa.me/50686858056" target="_blank" rel="noreferrer">${cta}</a></article>`).join("");
}

function setLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-en]").forEach(element => { element.textContent = element.dataset[language]; });
  document.querySelectorAll("[data-alt-en]").forEach(element => { element.alt = element.dataset[`alt${language[0].toUpperCase()}${language.slice(1)}`]; });
  button.textContent = language === "en" ? "ES" : "EN";
  button.setAttribute("aria-label", language === "en" ? "Cambiar a español" : "Switch to English");
  renderPlans();
  const message = language === "en" ? "Hi! I’d like to learn more about the intake process." : "¡Hola! Quisiera conocer más sobre el proceso de entrevista.";
  document.querySelectorAll(".whatsapp").forEach(link => { link.href = `https://wa.me/50686858056?text=${encodeURIComponent(message)}`; });
}

button.addEventListener("click", () => setLanguage(language === "en" ? "es" : "en"));
setLanguage("en");
