"use client";

import { useState } from "react";

type Language = "en" | "es";

const copy = {
  en: {
    skip: "Skip to content",
    nav: ["Approach", "How it works", "Plans", "Questions"],
    navIds: ["approach", "process", "plans", "faq"],
    toggle: "ES",
    toggleLabel: "Cambiar a español",
    eyebrow: "Private online English classes",
    titleA: "You know more English",
    titleB: "than you’re saying.",
    intro: "Build the confidence to speak through one-to-one classes shaped around your goals, pace, and real life.",
    cta: "Start your intake on WhatsApp",
    secondary: "See how it works",
    note: "100% online · Private classes · Personal plan",
    photoAlt: "A student taking part in an online class from her workspace",
    quote: "Progress looks different for everyone.",
    quoteSub: "Your classes should, too.",
    approachKicker: "A different way to move forward",
    approachTitle: "Less waiting to speak. More speaking that matters.",
    approachBody: "If you studied grammar before but still freeze in conversation, you are not starting over. We begin with what you already know and create space to use it.",
    cards: [
      ["One person, one plan", "Your goals shape the focus. You are not placed into a standard lesson path."],
      ["Conversation at the center", "You practice speaking extensively while grammar and other skills support the conversation."],
      ["A steady rhythm", "Work with an assigned teacher at a consistent weekly time, completely online through Zoom."],
    ],
    processKicker: "How it works",
    processTitle: "A clear start. A plan that stays personal.",
    steps: [
      ["01", "Talk with us", "Start on WhatsApp and arrange an intake conversation about your English, goals, and schedule."],
      ["02", "Get your plan", "Your learning plan is shaped around where you are now and what you need English to help you do."],
      ["03", "Keep talking", "Meet your teacher on Zoom at a consistent weekly time and build confidence through practice."],
    ],
    plansKicker: "Choose your weekly rhythm",
    plansTitle: "More practice, at the pace that fits.",
    plansBody: "The supplied plan details are shown for review. Final pricing and terms must be confirmed before this site is published.",
    plans: [
      ["Plan One", "1 hour / week", "4 private classes", "₡36,000", "₡9,000 per hour"],
      ["Plan Two", "2 hours / week", "8 private classes", "₡68,000", "₡8,500 per hour"],
      ["Plan Three", "3 hours / week", "12 private classes", "₡96,000", "₡8,000 per hour"],
      ["Plan Four", "4 hours / week", "16 private classes", "₡120,000", "₡7,500 per hour"],
    ],
    pending: "Pending client confirmation",
    enrollment: "The supplied material also lists a ₡15,000 enrollment fee. Billing period and policies are still to be confirmed.",
    faqKicker: "Good to know",
    faqTitle: "Questions before you start",
    faqs: [
      ["Are the classes private?", "Yes. Every class is one-to-one and built around the individual student."],
      ["Where do classes happen?", "Classes are 100% online through Zoom, so you can join from a suitable workspace."],
      ["Is this only conversation?", "Conversation is central. Grammar and other skills are reinforced as part of helping you communicate."],
      ["Do I need to be advanced?", "No fixed level is stated. The intake conversation helps identify your current foundation and goals."],
    ],
    closingKicker: "Your next conversation can start here",
    closingTitle: "Tell us where you want your English to take you.",
    closingBody: "Send a WhatsApp message to begin the intake process and ask any questions about the program.",
    footer: "Private online English classes",
  },
  es: {
    skip: "Ir al contenido",
    nav: ["Enfoque", "Cómo funciona", "Planes", "Preguntas"],
    navIds: ["approach", "process", "plans", "faq"],
    toggle: "EN",
    toggleLabel: "Switch to English",
    eyebrow: "Clases privadas de inglés en línea",
    titleA: "Sabes más inglés",
    titleB: "del que estás hablando.",
    intro: "Desarrolla la confianza para hablar con clases uno a uno diseñadas según tus metas, tu ritmo y tu vida real.",
    cta: "Inicia tu entrevista por WhatsApp",
    secondary: "Conoce cómo funciona",
    note: "100% en línea · Clases privadas · Plan personal",
    photoAlt: "Una estudiante participando en una clase en línea desde su espacio de trabajo",
    quote: "El progreso es diferente para cada persona.",
    quoteSub: "Tus clases también deberían serlo.",
    approachKicker: "Una forma diferente de avanzar",
    approachTitle: "Menos espera para hablar. Más conversación que importa.",
    approachBody: "Si estudiaste gramática antes pero todavía te paralizas al conversar, no estás empezando de cero. Partimos de lo que ya sabes y creamos el espacio para usarlo.",
    cards: [
      ["Una persona, un plan", "Tus metas definen el enfoque. No sigues una ruta de lecciones estandarizada."],
      ["La conversación al centro", "Practicas ampliamente el habla mientras la gramática y otras destrezas apoyan la conversación."],
      ["Un ritmo constante", "Trabaja con un docente asignado en un horario semanal constante, completamente en línea por Zoom."],
    ],
    processKicker: "Cómo funciona",
    processTitle: "Un inicio claro. Un plan siempre personal.",
    steps: [
      ["01", "Conversemos", "Escríbenos por WhatsApp y coordina una entrevista sobre tu inglés, tus metas y tu horario."],
      ["02", "Recibe tu plan", "Tu plan de aprendizaje se diseña según tu punto de partida y lo que necesitas lograr con el inglés."],
      ["03", "Sigue hablando", "Reúnete con tu docente por Zoom en un horario semanal constante y gana confianza con la práctica."],
    ],
    plansKicker: "Elige tu ritmo semanal",
    plansTitle: "Más práctica, al ritmo que te funciona.",
    plansBody: "Los detalles suministrados se muestran para revisión. Los precios y términos finales deben confirmarse antes de publicar el sitio.",
    plans: [
      ["Plan Uno", "1 hora / semana", "4 clases privadas", "₡36.000", "₡9.000 por hora"],
      ["Plan Dos", "2 horas / semana", "8 clases privadas", "₡68.000", "₡8.500 por hora"],
      ["Plan Tres", "3 horas / semana", "12 clases privadas", "₡96.000", "₡8.000 por hora"],
      ["Plan Cuatro", "4 horas / semana", "16 clases privadas", "₡120.000", "₡7.500 por hora"],
    ],
    pending: "Pendiente de confirmación del cliente",
    enrollment: "El material suministrado también indica una matrícula de ₡15.000. El periodo de facturación y las políticas aún deben confirmarse.",
    faqKicker: "Información útil",
    faqTitle: "Preguntas antes de comenzar",
    faqs: [
      ["¿Las clases son privadas?", "Sí. Cada clase es uno a uno y se diseña alrededor de la persona."],
      ["¿Dónde se realizan las clases?", "Las clases son 100% en línea por Zoom, para que te conectes desde un espacio adecuado."],
      ["¿Es solamente conversación?", "La conversación es central. La gramática y otras destrezas se refuerzan para ayudarte a comunicarte."],
      ["¿Necesito tener un nivel avanzado?", "No se indica un nivel fijo. La entrevista ayuda a identificar tu base actual y tus metas."],
    ],
    closingKicker: "Tu próxima conversación puede comenzar aquí",
    closingTitle: "Cuéntanos adónde quieres llegar con tu inglés.",
    closingBody: "Envía un mensaje por WhatsApp para iniciar el proceso de entrevista y resolver tus preguntas.",
    footer: "Clases privadas de inglés en línea",
  },
} as const;

const whatsapp = "https://wa.me/50686858056";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];
  const message = language === "en" ? "Hi! I’d like to learn more about the intake process." : "¡Hola! Quisiera conocer más sobre el proceso de entrevista.";
  const whatsappUrl = `${whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="site-shell" lang={language}>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="header">
        <a href="#top" aria-label="Just Keep Talking home"><img className="logo" src="/brand/logo.png" alt="Just Keep Talking" /></a>
        <nav aria-label="Main navigation">
          {t.nav.map((item, index) => <a key={item} href={`#${t.navIds[index]}`}>{item}</a>)}
        </nav>
        <button className="language" onClick={() => setLanguage(language === "en" ? "es" : "en")} aria-label={t.toggleLabel}>{t.toggle}</button>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.titleA}<br /><em>{t.titleB}</em></h1>
            <p className="intro">{t.intro}</p>
            <div className="actions">
              <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">{t.cta}<span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#process">{t.secondary}<span aria-hidden="true">↓</span></a>
            </div>
            <p className="micro">{t.note}</p>
          </div>
          <div className="hero-visual">
            <div className="shape shape-a" aria-hidden="true" />
            <img src="/brand/student.jpg" alt={t.photoAlt} />
            <div className="shape shape-b" aria-hidden="true" />
          </div>
        </section>

        <section className="quote-band" aria-label="Brand promise">
          <p>“{t.quote}”</p><span>{t.quoteSub}</span>
        </section>

        <section className="section approach" id="approach">
          <div className="section-heading"><p className="eyebrow">{t.approachKicker}</p><h2>{t.approachTitle}</h2><p>{t.approachBody}</p></div>
          <div className="card-grid">{t.cards.map((card, index) => <article className="feature-card" key={card[0]}><span>0{index + 1}</span><h3>{card[0]}</h3><p>{card[1]}</p></article>)}</div>
        </section>

        <section className="section process" id="process">
          <div className="process-photo"><img src="/brand/teacher.jpg" alt="" /><div className="photo-caption">JUST KEEP TALKING <span>↗</span></div></div>
          <div className="process-content"><p className="eyebrow">{t.processKicker}</p><h2>{t.processTitle}</h2><ol>{t.steps.map(step => <li key={step[0]}><span>{step[0]}</span><div><h3>{step[1]}</h3><p>{step[2]}</p></div></li>)}</ol></div>
        </section>

        <section className="section plans" id="plans">
          <div className="section-heading"><p className="eyebrow">{t.plansKicker}</p><h2>{t.plansTitle}</h2><p>{t.plansBody}</p></div>
          <div className="plan-grid">{t.plans.map((plan, index) => <article className={`plan-card ${index === 1 ? "featured" : ""}`} key={plan[0]}><div className="plan-top"><span>{String(index + 1).padStart(2, "0")}</span><small>{t.pending}</small></div><h3>{plan[0]}</h3><strong>{plan[1]}</strong><p>{plan[2]}</p><div className="price"><b>{plan[3]}</b><span>{plan[4]}</span></div><a href={whatsappUrl} target="_blank" rel="noreferrer">{t.cta} ↗</a></article>)}</div>
          <p className="enrollment">{t.enrollment}</p>
        </section>

        <section className="section faq" id="faq">
          <div><p className="eyebrow">{t.faqKicker}</p><h2>{t.faqTitle}</h2></div>
          <div className="faq-list">{t.faqs.map((faq, index) => <details key={faq[0]} open={index === 0}><summary>{faq[0]}<span aria-hidden="true">+</span></summary><p>{faq[1]}</p></details>)}</div>
        </section>

        <section className="closing">
          <div><p className="eyebrow">{t.closingKicker}</p><h2>{t.closingTitle}</h2><p>{t.closingBody}</p></div>
          <a className="button light" href={whatsappUrl} target="_blank" rel="noreferrer">{t.cta}<span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer><img src="/brand/logo-white.png" alt="Just Keep Talking" /><p>{t.footer}</p><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp · +506 8685 8056</a></footer>
    </div>
  );
}
