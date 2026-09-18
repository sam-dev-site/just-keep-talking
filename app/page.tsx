"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const whatsapp = "https://wa.me/50686858056";
const email = "justkeeptalkingcr@gmail.com";
// Owner-confirmed two-plan offer supersedes the older pricing graphics.
const tuition = {
  adults: {
    private: { CRC: [65000, 125000], USD: [150, 285] },
    group: {
      "2": { CRC: [48000, 92000], USD: [110, 210] },
      "3": { CRC: [41000, 79000], USD: [95, 180] },
      "4+": { CRC: [35000, 67000], USD: [80, 150] },
    },
  },
  kids: {
    private: { CRC: [33000, 63000], USD: [75, 145] },
    group: {
      "2": { CRC: [26000, 50000], USD: [60, 110] },
      "3": { CRC: [22000, 42000], USD: [50, 95] },
      "4+": { CRC: [18000, 36000], USD: [42, 80] },
    },
  },
};
const portraits: Record<string, string> = {
  Audrey: "/brand/audrey-teacher.webp",
  Cristian: "/brand/cristian-teacher.webp",
  Monique: "/brand/monique-teacher.webp",
};
const pages = ["home", "classes", "about", "policies", "teach"] as const;
type Page = typeof pages[number];

// Source: September 2026 website information and owner-labelled portraits.
const team = [
  { name: "Audrey", en: "From Michigan, Audrey studied Spanish and Linguistics and has experience both teaching and learning languages. She knows how challenging it can feel to speak a new language. She moved to Costa Rica in 2021 and founded Just Keep Talking. Away from class, she enjoys travel, reading, cooking, and hiking.", es: "Audrey es de Michigan, estudió Español y Lingüística y tiene experiencia enseñando y aprendiendo idiomas. Conoce el reto de hablar una nueva lengua. Se mudó a Costa Rica en 2021 y fundó Just Keep Talking. Fuera de clase, disfruta viajar, leer, cocinar y hacer senderismo." },
  { name: "Iain", en: "Originally from the United Kingdom, Iain moved to Costa Rica in 2020. He particularly enjoys teaching beginner adults and is also learning Spanish himself. His interests extend from sports and fitness to wildlife photography and conservation travel, giving him plenty of real-life topics to bring to a conversation.", es: "Iain es del Reino Unido y se mudó a Costa Rica en 2020. Disfruta especialmente enseñar a adultos principiantes y también está aprendiendo español. Le interesan los deportes, el ejercicio, la fotografía de vida silvestre y los viajes de conservación: muchos temas de la vida real para compartir en una conversación." },
  { name: "Shay", en: "Shay comes from Canada and moved to Costa Rica in 2023. Travel and discovering new places are important to him, and he believes that exploring the world broadens the mind. An athlete at heart, he enjoys many sports, along with video games, film, entertainment, and learning new things.", es: "Shay es de Canadá y se mudó a Costa Rica en 2023. Le encanta viajar y descubrir nuevos lugares, y cree que explorar el mundo amplía nuestra perspectiva. Es deportista de corazón y disfruta muchos deportes, además de los videojuegos, el cine, el entretenimiento y aprender cosas nuevas." },
  { name: "Monique", en: "Monique’s teaching experience spans preschool, university, parent education, and online Math, English, and Yoga classes. Reading and learning fuel her love of sharing knowledge. Outside teaching, she enjoys outdoor adventures, yoga, cooking, gardening, and time at the beach, as well as catching up with friends over coffee.", es: "Monique ha enseñado en preescolar y en la universidad, ha acompañado a padres en temas de desarrollo infantil y ha impartido Matemáticas, Inglés y Yoga en línea. Leer y aprender alimentan su pasión por compartir conocimientos. Disfruta las aventuras al aire libre, el yoga, la cocina, la jardinería, la playa y el café con amigos." },
  { name: "Cristian", en: "Cristian brings more than 15 years of experience teaching Spanish to learners from around the world. His background centers on connecting cultures and helping people communicate naturally and confidently. Conversation and cultural exploration are central to his teaching experience, with an emphasis on learning through close, dynamic, and meaningful interaction.", es: "Cristian aporta más de 15 años de experiencia enseñando español a personas de todo el mundo. Su trayectoria se centra en conectar culturas y ayudar a las personas a comunicarse con naturalidad y confianza. La conversación y la exploración cultural son parte esencial de su experiencia docente, con un aprendizaje cercano, dinámico y significativo." },
  { name: "Charlie", en: "Originally from London, Charlie worked as a social worker with children and families before beginning his teaching journey in Costa Rica in 2026. His experience includes primary school, preschool, and teaching adults online. He enjoys playing and watching football, spending time in nature, reading, music, food, and travel.", es: "Charlie es de Londres, donde trabajó con niños y familias como trabajador social antes de comenzar su trayectoria docente en Costa Rica en 2026. Su experiencia incluye primaria, preescolar y clases en línea para adultos. Disfruta jugar y ver fútbol, estar en la naturaleza, leer, escuchar música, la comida y viajar." },
];

export default function Home() {
  const params = useSearchParams();
  const language = params.get("lang") === "es" ? "es" : "en";
  const l = (en: string, es: string) => language === "en" ? en : es;
  const requestedPage = params.get("page");
  const page: Page = pages.includes(requestedPage as Page) ? requestedPage as Page : "home";
  const titles = {
    home: l("Online English for Adults & Kids", "Inglés en línea para adultos y niños"),
    classes: l("Classes & Pricing", "Clases y precios"),
    about: l("Our Story & Team", "Nuestra historia y equipo"),
    policies: l("Upcoming 2027 Policy", "Próxima política de 2027"),
    teach: l("Teach With Us", "Enseña con nosotros"),
  };
  const title = `Just Keep Talking | ${titles[page]}`;
  const description = l("Personalized online English for adults and kids across the Americas. Private and small-group classes for all levels, built around real conversation.", "Inglés en línea personalizado para adultos y niños de toda América. Clases privadas y en grupos pequeños para todos los niveles, con conversación real.");
  const audience = params.get("audience") === "kids" ? "kids" : "adults";
  const format = params.get("format") === "group" ? "group" : "private";
  const currency = params.get("currency") === "USD" ? "USD" : "CRC";
  const size = (["2", "3", "4+"].includes(params.get("size") || "") ? params.get("size") : "2") as "2" | "3" | "4+";
  const kidsGroup = audience === "kids" && format === "group";
  const planNames = kidsGroup ? ["Explorer", "Builder"] : ["Essential", "Standard"];
  const prices = (format === "private" ? tuition[audience].private : tuition[audience].group[size])[currency];
  const weeklyTime = (index: number) => kidsGroup
    ? (index === 0 ? l("30 minutes weekly", "30 minutos semanales") : l("1 hour weekly", "1 hora semanal"))
    : (index === 0 ? l("1 hour weekly", "1 hora semanal") : l("2 hours weekly", "2 horas semanales"));
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const url = (updates: Record<string, string> = {}, hash = "") => `/?${new URLSearchParams({ lang: language, page, audience, format, currency, size, ...updates }).toString()}${hash}`;
  const change = (key: string, value: string) => {
    // These controls change only this page's presentation. Updating native
    // history avoids overlapping route requests when options change quickly.
    const next = new URL(window.location.href);
    next.searchParams.set(key, value);
    window.history.replaceState(null, "", `${next.pathname}${next.search}`);
  };
  const wa = (message: string) => `${whatsapp}?text=${encodeURIComponent(message)}`;
  const cta = l("Let’s talk on WhatsApp", "Conversemos por WhatsApp");
  const generalUrl = wa(l("Hi! I’d like to talk about English classes and the intake process.", "¡Hola! Quisiera conversar sobre las clases de inglés y el proceso de entrevista."));
  const money = (value: number) => `${currency === "CRC" ? "₡" : "$"}${new Intl.NumberFormat(language === "en" ? "en-US" : "es-CR").format(value)} ${currency}`;
  const audienceLabel = audience === "adults" ? l("Adults", "Adultos") : l("Kids", "Niños");
  const formatLabel = format === "private" ? l("Private", "Privadas") : l("Small group", "Grupo pequeño");
  const selection = `${audienceLabel} · ${formatLabel}${format === "group" ? ` · ${size} ${l("students", "estudiantes")}` : ""} · ${currency}`;
  const inquiry = (plan: number) => wa(l(
    `Hi! I’d like to ask about English classes: ${selection}. ${planNames[plan]}, ${weeklyTime(plan)}, ${money(prices[plan])} per month. Please tell me about availability and enrollment.`,
    `¡Hola! Quisiera consultar sobre clases de inglés: ${selection}. ${planNames[plan]}, ${weeklyTime(plan)}, ${money(prices[plan])} por mes. Quisiera conocer la disponibilidad y la matrícula.`,
  ));
  const nav = [
    { label: l("Classes & pricing", "Clases y precios"), href: url({ page: "classes" }), current: page === "classes" },
    { label: l("Our approach", "Nuestro enfoque"), href: url({ page: "home" }, "#approach"), current: false },
    { label: l("Story & team", "Historia y equipo"), href: url({ page: "about" }), current: page === "about" },
  ];
  useEffect(() => {
    document.documentElement.lang = language;
    shell.current?.setAttribute("data-hydrated", "true");
  }, [language]);
  const principles = [
    [l("Your goals shape the lesson", "Tus metas dan forma a la clase"), l("Work, travel, school, or everyday life: your interests and learning style guide what you practice.", "Trabajo, viajes, estudios o vida cotidiana: tus intereses y tu forma de aprender guían lo que practicas.")],
    [l("Real conversation, real practice", "Conversación real, práctica real"), l("Speak about things that matter to you, with grammar, vocabulary, listening, reading, and writing supporting your progress.", "Habla de lo que te importa, mientras la gramática, el vocabulario, la escucha, la lectura y la escritura apoyan tu progreso.")],
    [l("Room to make mistakes", "Espacio para equivocarte"), l("Build a connection with your teacher in a supportive setting where you can try, ask questions, and keep talking.", "Crea una conexión con tu docente en un ambiente de apoyo donde puedes intentar, preguntar y seguir hablando.")],
  ];
  const founderPreview = l(
    "Audrey knew Spanish grammar, but speaking still felt difficult. An exchange in Costa Rica changed that: real conversations helped her find her voice. In 2021, she began Just Keep Talking to bring that same connection into online learning, with personalized lessons and a space where students could feel comfortable making mistakes and trying again.",
    "Audrey conocía la gramática del español, pero hablar todavía le costaba. Un intercambio en Costa Rica cambió eso: las conversaciones reales le ayudaron a encontrar su voz. En 2021, inició Just Keep Talking para llevar esa conexión al aprendizaje en línea, con clases personalizadas y un espacio para equivocarse con tranquilidad y volver a intentarlo.",
  );
  const faqs = [
    [l("Can I start as a beginner?", "¿Puedo empezar desde cero?"), l("Yes. We welcome all levels. Your intake conversation helps us understand your starting point and the support you need.", "Sí. Recibimos estudiantes de todos los niveles. La entrevista nos ayuda a conocer tu punto de partida y el apoyo que necesitas.")],
    [l("Are classes for adults and kids?", "¿Hay clases para adultos y niños?"), l("Yes. We offer English classes for adults and children, with lessons shaped around the learner’s goals and interests.", "Sí. Ofrecemos clases de inglés para adultos y niños, adaptadas a las metas e intereses de cada estudiante.")],
    [l("Where do classes happen?", "¿Dónde se realizan las clases?"), l("Classes are fully online through Zoom, for students throughout the Americas.", "Las clases son completamente en línea por Zoom, para estudiantes de toda América.")],
    [l("Private or small group?", "¿Clases privadas o en grupo pequeño?"), l("Private classes offer one-on-one practice. Small groups let you learn alongside others. Talk with us about the format, group arrangements, and schedule that fit your goals.", "Las clases privadas ofrecen práctica uno a uno. En grupos pequeños, aprendes junto a otras personas. Conversemos sobre el formato, la organización del grupo y el horario que se adaptan a tus metas.")],
    [l("How do I get started?", "¿Cómo puedo comenzar?"), l("Message us on WhatsApp to arrange an intake conversation. We’ll discuss your goals, class format, schedule, and enrollment.", "Escríbenos por WhatsApp para coordinar una entrevista. Conversaremos sobre tus metas, el formato de clase, el horario y la matrícula.")],
  ];
  const teamGrid = (preview: boolean) => <div className="team-grid">{team.slice(0, preview ? 3 : 6).map(person => <article className="team-card" key={person.name}><div className="portrait">{portraits[person.name] ? <Image src={portraits[person.name]} alt={person.name} width={900} height={1350} sizes="(max-width: 700px) 90vw, 30vw" unoptimized /> : <div className="portrait-placeholder" role="img" aria-label={l(`Photo of ${person.name} coming soon`, `Foto de ${person.name} próximamente`)}><span aria-hidden="true">{person.name[0]}</span><small>{l("Photo coming soon", "Foto próximamente")}</small></div>}</div><h3>{person.name}</h3>{person.name === "Audrey" && <p className="role">{l("Founder & teacher", "Fundadora y docente")}</p>}<p>{person[language]}</p></article>)}</div>;

  return <div className="site-shell" lang={language} ref={shell}>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:locale" content={language === "en" ? "en_US" : "es_CR"} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <a className="skip-link" href="#main">{l("Skip to content", "Ir al contenido")}</a>
    <header className="header" onKeyDown={event => { if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } }}>
      <a href={url({ page: "home" })} aria-label={l("Just Keep Talking home", "Just Keep Talking, inicio")}><Image className="logo" src="/brand/logo.png" alt="Just Keep Talking" width={600} height={464} priority unoptimized /></a>
      <button ref={menuButton} className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? l("Close", "Cerrar") : l("Menu", "Menú")}</button>
      <nav id="main-navigation" className={menuOpen ? "is-open" : ""} aria-label={l("Main navigation", "Navegación principal")}>{nav.map(item => <a href={item.href} key={item.label} aria-current={item.current ? "page" : undefined}>{item.label}</a>)}<a className="nav-whatsapp" href={generalUrl} target="_blank" rel="noreferrer">WhatsApp</a></nav>
      <a className="language" href={url({ lang: language === "en" ? "es" : "en" })} hrefLang={language === "en" ? "es" : "en"} aria-label={l("Cambiar a español", "Switch to English")}>{language === "en" ? "ES" : "EN"}</a>
    </header>
    <main id="main">
      {page === "home" && <>
        <section className="hero">
          <div><p className="eyebrow">{l("Your virtual language academy", "Tu academia virtual de idiomas")}</p><h1>{l("Build the confidence", "Gana confianza")} <em>{l("to speak.", "para hablar.")}</em></h1><p className="intro">{l("Personalized online English classes for adults and kids, with private and small-group options.", "Clases de inglés en línea personalizadas para adultos y niños, con opciones privadas y en grupos pequeños.")}</p><a className="button primary" href={generalUrl} target="_blank" rel="noreferrer">{cta}</a><p className="micro">{l("All levels · Across the Americas · Online through Zoom", "Todos los niveles · En toda América · En línea por Zoom")}</p></div>
          <div className="hero-visual"><Image src="/brand/students-talking.webp" alt={l("Two people talking together at a table with books", "Dos personas conversando en una mesa con libros")} width={1600} height={1066} priority unoptimized /></div>
        </section>
        <section className="section audience-section" aria-labelledby="audiences-title"><p className="eyebrow">{l("Find your starting point", "Encuentra tu punto de partida")}</p><h2 id="audiences-title">{l("Who are the classes for?", "¿Para quién son las clases?")}</h2><div className="audience-grid">
          <a className="audience-card" href={url({ page: "classes", audience: "adults" })}><span className="eyebrow">{l("Adults", "Adultos")}</span><h3>{l("Your goals. Your voice.", "Tus metas. Tu voz.")}</h3><p>{l("English for work, travel, and the conversations you want to have.", "Inglés para el trabajo, los viajes y las conversaciones que quieres tener.")}</p><span className="text-link">{l("Explore adult classes", "Explora las clases para adultos")} ↗</span></a>
          <a className="audience-card" href={url({ page: "classes", audience: "kids" })}><span className="eyebrow">{l("For your child", "Para tu hijo o hija")}</span><h3>{l("Curiosity becomes conversation.", "La curiosidad se vuelve conversación.")}</h3><p>{l("Personalized practice, meaningful connection, and space to grow in confidence.", "Práctica personalizada, una conexión cercana y espacio para ganar confianza.")}</p><span className="text-link">{l("Explore kids’ classes", "Explora las clases para niños")} ↗</span></a>
        </div></section>
        <section className="section" id="approach"><div className="section-intro"><div><p className="eyebrow">{l("Our approach", "Nuestro enfoque")}</p><h2>{l("Learning starts with connection.", "El aprendizaje empieza con una conexión.")}</h2></div><p>{l("Personalized learning for the moments that matter: at work, in school, while traveling, and in everyday life.", "Aprendizaje personalizado para los momentos que importan: en el trabajo, en los estudios, al viajar y en la vida cotidiana.")}</p></div><div className="card-grid">{principles.map((item, index) => <article className="feature-card" key={item[0]}><span className="number">0{index + 1}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div></section>
        <section className="founder-band"><div className="section founder-preview"><div><p className="eyebrow">{l("Why Just Keep Talking began", "Cómo nació Just Keep Talking")}</p><h2>{l("Knowing the words is only the beginning.", "Conocer las palabras es solo el comienzo.")}</h2></div><div><Image className="founder-preview-portrait" src="/brand/audrey-founder.webp" alt={l("Audrey, founder of Just Keep Talking", "Audrey, fundadora de Just Keep Talking")} width={900} height={1350} unoptimized /><p className="intro">{founderPreview}</p><a className="text-link" href={url({ page: "about" })}>{l("Read Audrey’s story", "Lee la historia de Audrey")} ↗</a></div></div></section>
        <section className="section process" id="process"><div className="process-photo"><Image src="/brand/teacher.jpg" alt={l("Online teaching from a home workspace", "Enseñanza en línea desde un espacio de trabajo en casa")} width={1600} height={1066} unoptimized /></div><div><p className="eyebrow">{l("Getting started", "Cómo comenzar")}</p><h2>{l("Let’s find your rhythm.", "Encontremos tu ritmo.")}</h2><ol>{[
          [l("Talk with us", "Conversemos"), l("Arrange an intake conversation on WhatsApp. Tell us about your goals and your starting point.", "Coordina una entrevista por WhatsApp. Cuéntanos tus metas y tu punto de partida.")],
          [l("Find your format", "Encuentra tu formato"), l("Choose private or small-group learning and an appropriate schedule with JKT.", "Elige con JKT clases privadas o en grupo pequeño y un horario adecuado.")],
          [l("Just keep talking", "Solo sigue hablando"), l("Meet your teacher on Zoom and build confidence through meaningful practice.", "Reúnete con tu docente por Zoom y gana confianza con práctica significativa.")],
        ].map((step, index) => <li key={step[0]}><span className="number">0{index + 1}</span><div><h3>{step[0]}</h3><p>{step[1]}</p></div></li>)}</ol></div></section>
        <section className="section"><div className="section-intro"><div><p className="eyebrow">{l("People behind the conversations", "Las personas detrás de las conversaciones")}</p><h2>{l("Meet your learning community.", "Conoce a tu comunidad de aprendizaje.")}</h2></div><a className="text-link" href={url({ page: "about" }, "#team")}>{l("Meet the whole team", "Conoce a todo el equipo")} ↗</a></div>{teamGrid(true)}</section>
        <section className="section faq"><div><p className="eyebrow">{l("Good to know", "Información útil")}</p><h2>{l("Before you start", "Antes de comenzar")}</h2><a className="text-link" href={url({ page: "classes" })}>{l("See classes and pricing", "Ver clases y precios")} ↗</a></div><div className="faq-list">{faqs.map(faq => <details key={faq[0]}><summary>{faq[0]}<span aria-hidden="true">+</span></summary><p>{faq[1]}</p></details>)}</div></section>
      </>}
      {page === "classes" && <section className="section pricing-page">
        <p className="eyebrow">{l("Classes & pricing", "Clases y precios")}</p><h1 className="page-title">{l("A rhythm that fits your life.", "Un ritmo que se adapta a tu vida.")}</h1><p className="intro">{l("Choose who’s learning and how. We’ll help you find an appropriate schedule during your intake conversation.", "Elige quién va a aprender y cómo. En la entrevista te ayudaremos a encontrar un horario adecuado.")}</p>
        <div className="pricing-controls">
          <fieldset><legend>{l("Who’s learning?", "¿Quién va a aprender?")}</legend><div className="segmented">{[["adults", l("Adults", "Adultos")], ["kids", l("Kids", "Niños")]].map(([value, label]) => <button key={value} aria-pressed={audience === value} onClick={() => change("audience", value)}>{label}</button>)}</div></fieldset>
          <fieldset><legend>{l("Class format", "Formato de clase")}</legend><div className="segmented">{[["private", l("Private", "Privadas")], ["group", l("Small group", "Grupo pequeño")]].map(([value, label]) => <button key={value} aria-pressed={format === value} onClick={() => change("format", value)}>{label}</button>)}</div></fieldset>
          {format === "group" && <fieldset><legend>{l("Group size", "Tamaño del grupo")}</legend><div className="segmented">{["2", "3", "4+"].map(value => <button key={value} aria-pressed={size === value} onClick={() => change("size", value)}>{value}<span className="sr-only"> {l("students", "estudiantes")}</span></button>)}</div></fieldset>}
          <fieldset className="currency-control"><legend>{l("Currency", "Moneda")}</legend><div className="segmented">{["CRC", "USD"].map(value => <button key={value} aria-pressed={currency === value} onClick={() => change("currency", value)}>{value}</button>)}</div></fieldset>
        </div>
        <div className="selection-heading" aria-live="polite"><h2>{audienceLabel} · {formatLabel}</h2><p>{audience === "adults" ? l("You know more English than you’re saying. Let’s put it into practice.", "Sabes más inglés del que estás hablando. Pongámoslo en práctica.") : l("Tell us about your child’s interests, experience with English, and schedule.", "Cuéntanos los intereses de tu hijo o hija, su experiencia con el inglés y su horario.")}</p></div>
        <div className="plan-grid">{planNames.map((name, index) => <article className="plan-card" key={name}><span className="number">0{index + 1}</span><h3>{name}</h3><p className="schedule">{weeklyTime(index)}</p><div className="price"><b>{money(prices[index])}</b><span>{l("per month", "por mes")}</span></div><a href={inquiry(index)} target="_blank" rel="noreferrer">{l("Ask about this plan", "Consulta por este plan")}</a></article>)}</div>
        <p className="enrollment">{l("One-time enrollment fee", "Matrícula por única vez")}: <strong>{money(audience === "adults" ? (currency === "CRC" ? 15000 : 35) : (currency === "CRC" ? 10000 : 25))}</strong></p>
        <p className="small-copy">{l("Monthly tuition. Contact us to discuss availability and enrollment; your inquiry does not reserve a place.", "Mensualidad. Escríbenos para consultar la disponibilidad y la matrícula; tu consulta no reserva un cupo.")}</p>
        <p className="policy-link"><a href={url({ page: "policies" })}>{l("Upcoming 2027 policy overview", "Resumen de la próxima política de 2027")}</a> · {l("Effective January 4, 2027", "Vigente a partir del 4 de enero de 2027")}</p>
      </section>}
      {page === "about" && <>
        <section className="section story"><div><p className="eyebrow">{l("Our story", "Nuestra historia")}</p><h1 className="page-title">{l("From learning the rules to finding a voice.", "De aprender las reglas a encontrar una voz.")}</h1><Image className="founder-portrait" src="/brand/audrey-founder.webp" alt={l("Audrey, founder of Just Keep Talking", "Audrey, fundadora de Just Keep Talking")} width={900} height={1350} unoptimized /><p className="story-signature">{l("Audrey · Founder of Just Keep Talking", "Audrey · Fundadora de Just Keep Talking")}</p></div><div className="story-copy">
          <p>{l("For years, Audrey studied Spanish at school and university. She practiced grammar and memorized vocabulary, but speaking still didn’t feel natural. Knowing the rules had not given her the confidence to join a conversation.", "Durante años, Audrey estudió español en la escuela, el colegio y la universidad. Practicaba gramática y memorizaba vocabulario, pero hablar todavía no le resultaba natural. Conocer las reglas no le había dado la confianza para participar en una conversación.")}</p>
          <p>{l("An exchange program in Costa Rica changed that. Surrounded by people, culture, and everyday conversations, she began to feel that she could really speak the language. The experience changed how she understood learning: connection and meaningful interaction made a difference.", "Un intercambio en Costa Rica cambió esa experiencia. Rodeada de personas, cultura y conversaciones cotidianas, comenzó a sentir que realmente podía hablar el idioma. Eso transformó su manera de entender el aprendizaje: la conexión y la interacción significativa marcaban la diferencia.")}</p>
          <p>{l("Back in the United States, she continued studying education with a focus on teaching Spanish and English as a second language. In 2021, she moved to Costa Rica and began creating personalized virtual lessons, building the academy that became Just Keep Talking.", "De regreso en Estados Unidos, continuó estudiando educación con un enfoque en la enseñanza del español y del inglés como segunda lengua. En 2021, se mudó a Costa Rica y comenzó a crear clases virtuales personalizadas, construyendo la academia Just Keep Talking.")}</p>
          <p>{l("The idea was simple: create a place where students want to speak and feel comfortable making mistakes. That purpose still shapes our approach: lessons built around each learner, real conversations, and supportive relationships that help people work toward their own goals.", "La idea era sencilla: crear un espacio donde los estudiantes quieran hablar y se sientan cómodos al equivocarse. Ese propósito sigue guiando nuestro enfoque: clases diseñadas para cada persona, conversaciones reales y relaciones de apoyo que ayudan a avanzar hacia las metas propias.")}</p>
        </div></section>
        <section className="section team-section" id="team"><p className="eyebrow">{l("Our team", "Nuestro equipo")}</p><h2>{l("Different stories. A shared love of learning.", "Historias diferentes. El mismo amor por aprender.")}</h2>{teamGrid(false)}</section>
      </>}
      {page === "policies" && <section className="section reading-page"><p className="eyebrow">{l("Policies", "Políticas")}</p><h1 className="page-title">{l("Planning your learning", "Planifica tu aprendizaje")}</h1><p className="notice">{l("Upcoming 2027 policy · Effective January 4, 2027", "Próxima política de 2027 · Vigente a partir del 4 de enero de 2027")}</p><p className="intro">{l("A brief overview of the upcoming enrollment policy. These terms take effect on January 4, 2027. Contact JKT for the policy that applies to your start date and your full enrollment details.", "Un breve resumen de la próxima política de matrícula. Estas condiciones entran en vigor el 4 de enero de 2027. Contacta a JKT para conocer la política aplicable a tu fecha de inicio y los detalles completos de tu matrícula.")}</p><nav className="contents" aria-label={l("On this page", "En esta página")}><a href="#tuition">{l("Monthly tuition", "Mensualidad")}</a><a href="#schedule">{l("Your schedule", "Tu horario")}</a><a href="#enrollment">{l("Getting enrolled", "La matrícula")}</a></nav>
        <section id="tuition"><h2>{l("Monthly tuition", "Mensualidad")}</h2><p>{l("The 2027 policy uses fixed monthly tuition for a recurring weekly schedule. Monthly tuition accounts for the academic calendar, including scheduled holidays and academy breaks. A new student’s first month may be prorated when starting later in the month.", "La política de 2027 establece una mensualidad fija para un horario semanal recurrente. La mensualidad contempla el calendario académico, incluidos los feriados y recesos programados. El primer mes de un estudiante nuevo puede prorratearse si comienza después del inicio del mes.")}</p></section>
        <section id="schedule"><h2>{l("Your schedule", "Tu horario")}</h2><p>{l("Discuss your weekly availability with JKT during intake. Ask us about the attendance and rescheduling terms that apply to your class format and start date.", "Conversa con JKT sobre tu disponibilidad semanal durante la entrevista. Consúltanos las condiciones de asistencia y reprogramación aplicables a tu formato de clase y fecha de inicio.")}</p></section>
        <section id="enrollment"><h2>{l("Getting enrolled", "La matrícula")}</h2><p>{l("Enrollment fees are separate from monthly tuition. Before you enroll, we’ll discuss your class format, schedule, payment options, and applicable policy with you.", "La matrícula se cobra por separado de la mensualidad. Antes de inscribirte, conversaremos sobre tu formato de clase, horario, opciones de pago y política aplicable.")}</p><a className="button primary" href={generalUrl} target="_blank" rel="noreferrer">{cta}</a></section>
      </section>}
      {page === "teach" && <section className="section recruitment"><p className="eyebrow">{l("Teach with us", "Enseña con nosotros")}</p><h1 className="page-title">{l("Help someone find their voice.", "Ayuda a alguien a encontrar su voz.")}</h1><p className="intro">{l("Bring your love of language and meaningful conversation to Just Keep Talking. Get in touch to discuss teaching opportunities and arrange an interview.", "Comparte tu pasión por los idiomas y las conversaciones significativas en Just Keep Talking. Contáctanos para conversar sobre oportunidades docentes y coordinar una entrevista.")}</p><div className="recruitment-grid"><div><h2>{l("Why join our team", "Por qué unirte al equipo")}</h2><ul>{[
          l("Flexible scheduling that supports work-life balance.", "Horarios flexibles que favorecen el equilibrio entre el trabajo y la vida personal."),
          l("A supportive community that shares resources and ideas.", "Una comunidad de apoyo que comparte recursos e ideas."),
          l("Training, professional development, and opportunities to grow.", "Capacitación, desarrollo profesional y oportunidades para crecer."),
          l("Ready-to-use teaching materials and room to personalize lessons.", "Materiales listos para usar y espacio para personalizar las clases."),
          l("Meaningful work helping students reach their language goals.", "Trabajo significativo que ayuda a los estudiantes a alcanzar sus metas con el idioma."),
        ].map(item => <li key={item}>{item}</li>)}</ul></div><div><h2>{l("What we look for", "Qué buscamos")}</h2><ul>{[
          l("Punctuality, responsibility, and consistent professionalism.", "Puntualidad, responsabilidad y profesionalismo constante."),
          l("Open, respectful communication with students and colleagues.", "Comunicación abierta y respetuosa con estudiantes y colegas."),
          l("Engaging lesson planning shaped around each learner.", "Planificación de clases atractivas y adaptadas a cada estudiante."),
          l("Timely class records, progress updates, and administrative work.", "Registros de clases, informes de progreso y tareas administrativas al día."),
          l("Strong English knowledge and a positive, supportive teaching style.", "Un sólido conocimiento del inglés y una forma de enseñar positiva y cercana."),
        ].map(item => <li key={item}>{item}</li>)}</ul></div></div><div className="application"><h2>{l("Start a conversation with our team.", "Inicia una conversación con nuestro equipo.")}</h2><a className="button primary" href={wa(l("Hi! I’m interested in teaching with Just Keep Talking and would like to arrange an interview.", "¡Hola! Me interesa enseñar con Just Keep Talking y quisiera coordinar una entrevista."))} target="_blank" rel="noreferrer">{l("Apply on WhatsApp", "Postúlate por WhatsApp")}</a><a className="text-link" href={`mailto:${email}?subject=${encodeURIComponent(l("Teaching at Just Keep Talking", "Enseñar en Just Keep Talking"))}`}>{l("Or send us an email", "O envíanos un correo")}</a></div></section>}
      {page !== "teach" && page !== "policies" && <section className="closing"><div><p className="eyebrow">{l("Your next conversation starts here", "Tu próxima conversación empieza aquí")}</p><h2>{l("Tell us where you want English to take you.", "Cuéntanos adónde quieres llegar con el inglés.")}</h2><p>{l("We’ll talk about your goals, experience, and schedule, then help you find a starting point.", "Conversaremos sobre tus metas, experiencia y horario para ayudarte a encontrar un punto de partida.")}</p></div><a className="button light" href={generalUrl} target="_blank" rel="noreferrer">{cta}</a></section>}
    </main>
    <footer><div className="footer-brand"><Image src="/brand/logo-white.png" alt="Just Keep Talking" width={600} height={464} unoptimized /><p>{l("Online English. Real connection.", "Inglés en línea. Conexión real.")}</p></div><nav aria-label={l("Footer navigation", "Navegación del pie de página")}><a href={url({ page: "classes" })}>{l("Classes & pricing", "Clases y precios")}</a><a href={url({ page: "policies" })}>{l("Policies", "Políticas")}</a><a href={url({ page: "teach" })}>{l("Teach with us", "Enseña con nosotros")}</a></nav><div className="footer-contact"><a href={generalUrl} target="_blank" rel="noreferrer">WhatsApp · +506 8685 8056</a><a href={`mailto:${email}`}>{email}</a><a href="https://www.instagram.com/justkeeptalkingcr/" target="_blank" rel="noreferrer">Instagram · @justkeeptalkingcr</a></div></footer>
  </div>;
}
