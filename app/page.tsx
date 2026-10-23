"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const whatsapp = "https://wa.me/50686858056";
const email = "justkeeptalkingcr@gmail.com";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const locationEvent = "jkt-location";
const subscribeToLocation = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  window.addEventListener(locationEvent, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(locationEvent, callback);
  };
};
// Captured before the app router wraps history. Calling that wrapper for these
// options reloads the static page and jumps back to the top.
const nativeReplaceState = typeof window === "undefined" ? undefined : window.history.replaceState;
// Owner-confirmed four-plan offer from 2027 pricing graphics.
const tuition = {
  adults: {
    private: { CRC: [65000, 125000, 183000, 238000], USD: [150, 285, 420, 545] },
    group: {
      "2": { CRC: [48000, 92000, 135000, 176000], USD: [110, 210, 305, 395] },
      "3": { CRC: [41000, 79000, 116000, 152000], USD: [95, 180, 265, 345] },
      "4+": { CRC: [35000, 67000, 99000, 129000], USD: [80, 150, 220, 290] },
    },
  },
  kids: {
    private: { CRC: [33000, 63000, 92000, 120000], USD: [75, 145, 210, 275] },
    group: {
      "2": { CRC: [26000, 50000, 73000, 95000], USD: [60, 110, 160, 210] },
      "3": { CRC: [22000, 42000, 62000, 81000], USD: [50, 95, 140, 180] },
      "4+": { CRC: [18000, 36000, 52000, 68000], USD: [42, 80, 115, 150] },
    },
  },
};
const portraits: Record<string, string> = {
  Audrey: asset("/brand/audrey-teacher.webp"),
  Cristian: asset("/brand/cristian-teacher.webp"),
  Monique: asset("/brand/monique-teacher.webp"),
};
const pages = ["home", "classes", "approach", "about", "faq", "policies", "teach"] as const;
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
  const search = useSyncExternalStore(
    subscribeToLocation,
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(search);
  const language = params.get("lang") === "es" ? "es" : "en";
  const l = (en: string, es: string) => language === "en" ? en : es;
  const requestedPage = params.get("page");
  const page: Page = pages.includes(requestedPage as Page) ? requestedPage as Page : "home";
  const titles = {
    home: l("Online English for Adults & Kids", "Inglés en línea para adultos y niños"),
    classes: l("Classes & Pricing", "Clases y precios"),
    approach: l("Our Approach", "Nuestro enfoque"),
    about: l("Our Story & Team", "Nuestra historia y equipo"),
    faq: l("FAQ", "Preguntas frecuentes"),
    policies: l("Policy Overview", "Resumen de políticas"),
    teach: l("Teach With Us", "Enseña con nosotros"),
  };
  const title = `Just Keep Talking | ${titles[page]}`;
  const description = page === "approach"
    ? l("How Just Keep Talking teaches: an intake meeting, a brief oral evaluation, a personal learning plan, and conversation guided by your goals.", "Cómo enseña Just Keep Talking: una reunión de entrevista, una breve evaluación oral, un plan de aprendizaje personal y una conversación guiada por sus metas.")
    : page === "faq"
      ? l("Answers about language levels, ages, online classes, immersion activities, methodology, and the languages we offer.", "Respuestas sobre niveles, edades, clases en línea, actividades de inmersión, metodología y los idiomas que ofrecemos.")
      : l("Personalized language instruction built around your level, goals, and needs.", "Instrucción de idiomas personalizada, diseñada según tu nivel, tus metas y tus necesidades.");
  const audience = params.get("audience") === "kids" ? "kids" : "adults";
  const format = params.get("format") === "group" ? "group" : "private";
  const currency = params.get("currency") === "USD" ? "USD" : "CRC";
  const size = (["2", "3", "4+"].includes(params.get("size") || "") ? params.get("size") : "2") as "2" | "3" | "4+";
  const isKids = audience === "kids";
  const planNames = isKids
    ? ["Explorer", "Builder", "Achiever", "Fluent"]
    : ["Essential", "Standard", "Intensive", "Immersion"];
  const prices = (format === "private" ? tuition[audience].private : tuition[audience].group[size])[currency];
  const weeklyLabels = {
    minutes30: l("30 minutes weekly", "30 minutos semanales"),
    hour1: l("1 hour weekly", "1 hora semanal"),
    hours15: l("1.5 hours weekly", "1,5 horas semanales"),
    hours2: l("2 hours weekly", "2 horas semanales"),
    hours3: l("3 hours weekly", "3 horas semanales"),
    hours4: l("4 hours weekly", "4 horas semanales"),
  };
  const weeklyTime = (index: number) => {
    if (isKids && format === "private" && currency === "USD") {
      return [weeklyLabels.hour1, weeklyLabels.hours2, weeklyLabels.hours3, weeklyLabels.hours4][index];
    }
    if (isKids) {
      return [weeklyLabels.minutes30, weeklyLabels.hour1, weeklyLabels.hours15, weeklyLabels.hours4][index];
    }
    return [weeklyLabels.hour1, weeklyLabels.hours2, weeklyLabels.hours3, weeklyLabels.hours4][index];
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const url = (updates: Record<string, string> = {}, hash = "") => {
    const nextPage = updates.page ?? page;
    const query = new URLSearchParams({ lang: updates.lang ?? language, page: nextPage });
    if (nextPage === "classes") {
      query.set("audience", updates.audience ?? audience);
      query.set("format", updates.format ?? format);
      query.set("currency", updates.currency ?? currency);
      query.set("size", updates.size ?? size);
    }
    return `${basePath}/?${query.toString()}${hash}`;
  };
  const change = (key: string, value: string) => {
    const next = new URL(window.location.href);
    if (next.searchParams.get(key) === value) return;
    next.searchParams.set(key, value);
    nativeReplaceState?.call(window.history, window.history.state, "", `${next.pathname}${next.search}`);
    window.dispatchEvent(new Event(locationEvent));
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
    { label: l("Our approach", "Nuestro enfoque"), href: url({ page: "approach" }), current: page === "approach" },
    { label: l("Story & team", "Historia y equipo"), href: url({ page: "about" }), current: page === "about" },
    { label: l("FAQ", "Preguntas frecuentes"), href: url({ page: "faq" }), current: page === "faq" },
  ];
  useEffect(() => {
    document.documentElement.lang = language;
    shell.current?.setAttribute("data-hydrated", "true");
    const id = window.location.hash.replace(/^#/, "");
    if (id) document.getElementById(id)?.scrollIntoView();
  }, [language, page]);
  const followNav = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };
  const methodBubbles = [
    { title: l("Conversational method", "Método conversacional"), body: l("Classes center on real talk—the situations you need English for.", "Las clases se centran en conversación real: las situaciones en las que necesita el inglés.") },
    { title: l("Structured feedback", "Retroalimentación estructurada"), body: l("Your teacher guides the exchange and gives clear feedback as you speak.", "Su docente guía el intercambio y le da retroalimentación clara mientras habla.") },
    { title: l("Listening, reading, writing, speaking", "Escucha, lectura, escritura y habla"), body: l("You practice the full set of skills, with conversation as the through-line.", "Practica el conjunto de habilidades, con la conversación como hilo conductor.") },
    { title: l("Natural conversation", "Conversación natural"), body: l("A big focus is making English feel more natural when you use it.", "Un enfoque central es que el inglés se sienta más natural al usarlo.") },
    { title: l("Applied to real life", "Aplicado a la vida real"), body: l("Grammar belongs in the plan when it helps you use what you are learning.", "La gramática forma parte del plan cuando le ayuda a aplicar lo que está aprendiendo.") },
  ];
  const learningSteps = [
    {
      title: l("Your intake meeting", "Su reunión de entrevista"),
      body: l("One meeting covers getting to know you, your goals and language background, a brief oral evaluation of your current level, a personalized learning plan, and logistics: teacher, schedule, policies, and payment.", "En una sola reunión nos conocemos, entendemos sus metas y su trayectoria con el idioma, hacemos una breve evaluación oral de su nivel actual, armamos un plan personalizado y definimos la logística: docente, horario, políticas y pago."),
      points: [
        l("Getting to know you", "Conocerle"),
        l("Goals and language background", "Metas y trayectoria con el idioma"),
        l("Brief oral evaluation", "Breve evaluación oral"),
        l("Personalized learning plan", "Plan de aprendizaje personalizado"),
        l("Teacher, schedule, policies, payment", "Docente, horario, políticas y pago"),
      ],
    },
    {
      title: l("Start classes with your teacher", "Comience clases con su docente"),
      body: l("Your teacher draws on hundreds of academy resources to shape each class to you and your level. If you need a lesson we do not have yet, we create it for you.", "Su docente toma de cientos de recursos de la academia para adaptar cada clase a usted y a su nivel. Si necesita una lección que aún no tenemos, la creamos para usted."),
      points: [
        l("Hundreds of academy resources", "Cientos de recursos de la academia"),
        l("Lessons shaped to you and that class", "Lecciones adaptadas a usted y a esa clase"),
        l("New lessons created when needed", "Lecciones nuevas cuando haga falta"),
      ],
    },
    {
      title: l("Measure your progress", "Mida su progreso"),
      body: l("Progress is measured through consistent check-ins with your teacher, quarterly progress reports, and evaluations as needed.", "El progreso se mide con seguimientos constantes con su docente, informes trimestrales y evaluaciones cuando haga falta."),
      points: [
        l("Consistent teacher check-ins", "Seguimientos constantes con el docente"),
        l("Quarterly progress reports", "Informes de progreso trimestrales"),
        l("Evaluations as needed", "Evaluaciones cuando haga falta"),
      ],
    },
  ];
  const founderPreview = l(
    "Audrey studied Spanish for years, but during an exchange in Costa Rica, she realized that understanding grammar and being able to interact with locals were two different things. During her exchange, her Spanish improved drastically through real life conversations and connections. In 2021, she began Just Keep Talking to bring that same connection into online learning, with personalized lessons and a space where students could feel comfortable making mistakes and trying again.",
    "Audrey estudió español durante años, pero en un intercambio en Costa Rica se dio cuenta de que entender la gramática y poder interactuar con la gente local eran dos cosas distintas. Durante ese intercambio, su español mejoró mucho gracias a conversaciones y conexiones de la vida real. En 2021, inició Just Keep Talking para llevar esa misma conexión al aprendizaje en línea, con clases personalizadas y un espacio donde los estudiantes se sientan cómodos al equivocarse y volver a intentarlo.",
  );
  const faqs = [
    [l("Do you give classes to all language levels?", "¿Dan clases para todos los niveles?"), l("Yes. We welcome all levels. Your intake conversation helps us understand your starting point and the support you need.", "Sí. Recibimos estudiantes de todos los niveles. La entrevista nos ayuda a conocer tu punto de partida y el apoyo que necesitas.")],
    [l("Are classes for all ages?", "¿Las clases son para todas las edades?"), l("Yes. We offer classes for adults and children, with lessons shaped around the learner’s goals and interests.", "Sí. Ofrecemos clases para adultos y niños, adaptadas a las metas e intereses de cada estudiante.")],
    [l("Do you offer in-person classes?", "¿Ofrecen clases presenciales?"), l("No. Classes are fully online through Zoom. We do organize in-person immersion activities, such as a picnic or outing.", "No. Las clases son completamente en línea por Zoom. Sí organizamos actividades de inmersión presenciales, como un picnic o una salida.")],
    [l("Private or small group?", "¿Clases privadas o en grupo pequeño?"), l("Private classes offer one-on-one practice. Small groups let you learn alongside others. Talk with us about the format, group arrangements, and schedule that fit your goals.", "Las clases privadas ofrecen práctica uno a uno. En grupos pequeños, aprendes junto a otras personas. Conversemos sobre el formato, la organización del grupo y el horario que se adaptan a tus metas.")],
    [l("How do I get started?", "¿Cómo puedo comenzar?"), l("Message us on WhatsApp. If you would like to enroll, we set up a one-to-one meeting to talk about your experience, evaluate your starting point, and build your learning plan.", "Escríbenos por WhatsApp. Si quieres inscribirte, coordinamos una reunión individual para conversar sobre tu experiencia, evaluar tu punto de partida y armar tu plan de aprendizaje.")],
    [l("What is your methodology?", "¿Cuál es su metodología?"), l("Our classes are conversational and planned. Before you begin, we evaluate your starting point, build a personal learning plan, and follow your progress with progress reports.", "Nuestras clases son conversacionales y planificadas. Antes de comenzar, evaluamos tu punto de partida, armamos un plan de aprendizaje personal y seguimos tu progreso con informes de progreso.")],
    [l("What languages do you offer?", "¿Qué idiomas ofrecen?"), l("English for all ages and Spanish for adults.", "Inglés para todas las edades y español para adultos.")],
  ];
  const adultNeeds = [
    [l("Work", "Trabajo"), l("Language for the conversations that move your career forward.", "El idioma para las conversaciones que impulsan tu carrera.")],
    [l("Travel", "Viajes"), l("Speak with more ease when you explore new places.", "Habla con más facilidad cuando explores nuevos lugares.")],
    [l("Personal interest", "Interés personal"), l("Learn because you want to, at your own pace and for your own reasons.", "Aprende porque quieres, a tu ritmo y por tus propios motivos.")],
    [l("School", "Estudios"), l("Build the language skills that support your studies and next steps.", "Fortalece el idioma que apoya tus estudios y tus próximos pasos.")],
  ];
  const teamGrid = (preview: boolean) => <div className="team-grid">{(preview ? ["Audrey", "Monique", "Cristian"].flatMap(name => team.filter(person => person.name === name)) : team).map(person => <article className="team-card" key={person.name}><div className="portrait">{portraits[person.name] ? <Image src={portraits[person.name]} alt={person.name} width={900} height={1350} sizes="(max-width: 700px) 90vw, 30vw" unoptimized /> : <div className="portrait-placeholder" role="img" aria-label={l(`Photo of ${person.name} coming soon`, `Foto de ${person.name} próximamente`)}><span aria-hidden="true">{person.name[0]}</span><small>{l("Photo coming soon", "Foto próximamente")}</small></div>}</div><h3>{person.name}</h3><p className="role">{person.name === "Audrey" ? l("Founder & teacher", "Fundadora y docente") : l("Teacher", "Docente")}</p><p>{person[language]}</p></article>)}</div>;

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
      <a className="brand-lockup" href={url({ page: "home" })} aria-label={l("Just Keep Talking home", "Just Keep Talking, inicio")} onClick={followNav}><Image className="logo" src={asset("/brand/mark.png")} alt="" width={240} height={164} priority unoptimized /><span className="brand-name">Just Keep Talking</span></a>
      <button ref={menuButton} className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? l("Close", "Cerrar") : l("Menu", "Menú")}</button>
      <nav id="main-navigation" className={menuOpen ? "is-open" : ""} aria-label={l("Main navigation", "Navegación principal")}>{nav.map(item => <a href={item.href} key={item.label} aria-current={item.current ? "page" : undefined} onClick={followNav}>{item.label}</a>)}<a className="nav-whatsapp" href={generalUrl} target="_blank" rel="noreferrer">WhatsApp</a></nav>
      <a className="language" href={url({ lang: language === "en" ? "es" : "en" })} hrefLang={language === "en" ? "es" : "en"} aria-label={l("Cambiar a español", "Switch to English")} onClick={followNav}>{language === "en" ? "ES" : "EN"}</a>
    </header>
    <main id="main">
      {page === "home" && <>
        <section className="hero">
          <div><p className="eyebrow">{l("Your virtual language academy", "Tu academia virtual de idiomas")}</p><h1>{l("Build the confidence", "Gana confianza")} <em>{l("to speak.", "para hablar.")}</em></h1><p className="intro">{l("Personalized language instruction built around your level, goals, and needs.", "Instrucción de idiomas personalizada, diseñada según tu nivel, tus metas y tus necesidades.")}</p><a className="button primary" href={generalUrl} target="_blank" rel="noreferrer">{cta}</a><p className="micro">{l("Certified native teachers · Personalized learning · Authentic conversation", "Docentes nativos certificados · Aprendizaje personalizado · Conversación auténtica")}</p></div>
          <div className="hero-visual"><Image src={asset("/brand/students-talking.webp")} alt={l("Three teachers sharing a book and laughing together", "Tres docentes compartiendo un libro y riendo juntas")} width={1600} height={1066} priority unoptimized /></div>
        </section>
        <section className="section audience-section" aria-labelledby="audiences-title">
          <h2 id="audiences-title">{l("Language for you.", "El idioma para ti.")}</h2>
          <div className="audience-grid adult-needs">
            {adultNeeds.map(([need, body]) => (
              <a className="audience-card" href={url({ page: "classes", audience: "adults" })} key={need}>
                <span className="eyebrow">{l("Adults", "Adultos")}</span>
                <h3>{need}</h3>
                <p>{body}</p>
                <span className="text-link">{l("Explore adult classes", "Explora las clases para adultos")} ↗</span>
              </a>
            ))}
          </div>
          <a className="audience-card kids-path" href={url({ page: "classes", audience: "kids" })}>
            <span className="eyebrow">{l("For your child", "Para tu hijo o hija")}</span>
            <h3>{l("English for your child.", "Inglés para tu hijo o hija.")}</h3>
            <p>{l("Practice, play, connection: a safe space to grow in confidence.", "Práctica, juego y conexión: un espacio seguro para ganar confianza.")}</p>
            <span className="text-link">{l("Explore kids’ classes", "Explora las clases para niños")} ↗</span>
          </a>
        </section>
        <section className="section approach-teaser"><div><h2>{l("Our approach", "Nuestro enfoque")}</h2><p className="intro">{l("Before your first official class, we have a meeting where we talk about your goals, give a brief oral evaluation, and customize your learning plan.", "Antes de tu primera clase oficial, tenemos una reunión en la que hablamos de tus metas, hacemos una breve evaluación oral y personalizamos tu plan de aprendizaje.")}</p><a className="text-link" href={url({ page: "approach" })} onClick={followNav}>{l("Read our approach", "Lee nuestro enfoque")} ↗</a></div></section>
        <section className="founder-band"><div className="section founder-preview"><div><p className="eyebrow">{l("How Just Keep Talking started", "Cómo empezó Just Keep Talking")}</p><h2>{l("Knowing the words is only the beginning.", "Conocer las palabras es solo el comienzo.")}</h2></div><div><Image className="founder-preview-portrait" src={asset("/brand/audrey-home-founder.webp")} alt={l("Audrey, founder of Just Keep Talking", "Audrey, fundadora de Just Keep Talking")} width={900} height={1350} unoptimized /><p className="intro">{founderPreview}</p><a className="text-link" href={url({ page: "about" })}>{l("Read Audrey’s story", "Lee la historia de Audrey")} ↗</a></div></div></section>
        <section className="section"><div className="section-intro"><h2>{l("Meet our community", "Conoce a nuestra comunidad")}</h2><a className="text-link" href={url({ page: "about" }, "#team")}>{l("See more", "Ver más")} ↗</a></div>{teamGrid(true)}</section>
      </>}
      {page === "approach" && <>
        <section className="section approach-page">
          <p className="eyebrow">{l("Our approach", "Nuestro enfoque")}</p>
          <h1 className="page-title">{l("Conversation that prepares you for real life.", "Conversación que le prepara para la vida real.")}</h1>
          <p className="intro">{l("We teach through conversation, with structured feedback and a plan that applies what you learn to the situations that matter.", "Enseñamos a través de la conversación, con retroalimentación estructurada y un plan que aplica lo que aprende a las situaciones que le importan.")}</p>
          <div className="approach-method">
            <div className="approach-method-visual">
              <Image src={asset("/brand/approach-2508.webp")} alt={l("A student thinking with a stack of books and a pencil", "Una estudiante pensativa con una pila de libros y un lápiz")} width={900} height={1350} unoptimized />
            </div>
            <div>
              <h2>{l("How we teach", "Cómo enseñamos")}</h2>
              <p className="approach-method-lead">{l("Conversation is the method. Feedback keeps it clear. Skills build together so speaking feels more natural in real life.", "La conversación es el método. La retroalimentación lo mantiene claro. Las habilidades se construyen juntas para que hablar se sienta más natural en la vida real.")}</p>
              <ul className="method-bubbles">
                {methodBubbles.map((bubble, index) => (
                  <li key={bubble.title} className={`method-bubble method-bubble-${index + 1}`}>
                    <h3>{bubble.title}</h3>
                    <p>{bubble.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="approach-plan">
            <div className="approach-plan-intro">
              <h2>{l("How your learning plan is structured", "Cómo se estructura su plan de aprendizaje")}</h2>
              <p>{l("Three steps. The first is one intake meeting—not three separate appointments.", "Tres pasos. El primero es una sola reunión de entrevista, no tres citas aparte.")}</p>
            </div>
            <ol className="learning-steps">
              {learningSteps.map((step, index) => (
                <li key={step.title} className={`learning-step learning-step-${index + 1}`}>
                  <span className="number">0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <ul className="learning-step-points">
                      {step.points.map(point => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
            <div className="approach-plan-photo">
              <Image src={asset("/brand/approach-2602.webp")} alt={l("A student smiling during an online class with headphones", "Un estudiante sonriendo durante una clase en línea con audífonos")} width={900} height={1350} unoptimized />
            </div>
          </div>
        </section>
        <section className="section approach-teachers"><h2>{l("Certified native teachers", "Docentes nativos certificados")}</h2><p className="intro">{l("Classes are led by certified native teachers. In your intake meeting, we match a teacher, a weekly schedule, and the format that fits your goals.", "Las clases las imparten docentes nativos certificados. En su reunión de entrevista elegimos un docente, un horario semanal y el formato que se ajusta a sus metas.")}</p><a className="text-link" href={url({ page: "about" }, "#team")}>{l("Meet the team", "Conozca al equipo")} ↗</a></section>
      </>}
      {page === "classes" && <section className="section pricing-page">
        <p className="eyebrow">{l("Classes & pricing", "Clases y precios")}</p><h1 className="page-title">{l("Choose your weekly commitment.", "Elija su compromiso semanal.")}</h1><p className="intro">{l("Choose who’s learning and how. Your intake meeting confirms the teacher, schedule, and learning priorities.", "Elija quién va a aprender y cómo. En su reunión de entrevista confirmamos el docente, el horario y las prioridades de aprendizaje.")}</p>
        <div className="pricing-controls">
          <fieldset><legend>{l("Who’s learning?", "¿Quién va a aprender?")}</legend><div className="segmented">{[["adults", l("Adults", "Adultos")], ["kids", l("Kids", "Niños")]].map(([value, label]) => <button type="button" key={value} aria-pressed={audience === value} onClick={() => change("audience", value)}>{label}</button>)}</div></fieldset>
          <fieldset><legend>{l("Class format", "Formato de clase")}</legend><div className="segmented">{[["private", l("Private", "Privadas")], ["group", l("Small group", "Grupo pequeño")]].map(([value, label]) => <button type="button" key={value} aria-pressed={format === value} onClick={() => change("format", value)}>{label}</button>)}</div></fieldset>
          {format === "group" && <fieldset><legend>{l("Group size", "Tamaño del grupo")}</legend><div className="segmented">{["2", "3", "4+"].map(value => <button type="button" key={value} aria-pressed={size === value} onClick={() => change("size", value)}>{value}<span className="sr-only"> {l("students", "estudiantes")}</span></button>)}</div></fieldset>}
          <fieldset className="currency-control"><legend>{l("Currency", "Moneda")}</legend><div className="segmented">{["CRC", "USD"].map(value => <button type="button" key={value} aria-pressed={currency === value} onClick={() => change("currency", value)}>{value}</button>)}</div></fieldset>
        </div>
        <div className="selection-heading" aria-live="polite"><h2>{audienceLabel} · {formatLabel}</h2><p>{audience === "adults" ? l("You know more English than you’re saying. Let’s put it into practice.", "Sabe más inglés del que está hablando. Pongámoslo en práctica.") : l("Tell us about your child’s interests, experience with English, and schedule.", "Cuéntenos los intereses de su hijo o hija, su experiencia con el inglés y su horario.")}</p></div>
        <div className="plan-grid">{planNames.map((name, index) => <article className="plan-card" key={name}><span className="number">0{index + 1}</span><h3>{name}</h3><p className="schedule">{weeklyTime(index)}</p><div className="price"><b>{money(prices[index])}</b><span>{l("per month", "por mes")}</span></div><a className="button primary" href={inquiry(index)} target="_blank" rel="noreferrer">{l("Ask about this plan", "Consulte por este plan")}</a></article>)}</div>
        <p className="enrollment">{l("One-time enrollment fee", "Matrícula por única vez")}: <strong>{money(audience === "adults" ? (currency === "CRC" ? 15000 : 35) : (currency === "CRC" ? 10000 : 25))}</strong></p>
        <p className="small-copy">{l("Monthly tuition. Contact us to discuss availability and enrollment; your inquiry does not reserve a place.", "Mensualidad. Escríbanos para consultar la disponibilidad y la matrícula; su consulta no reserva un cupo.")}</p>
      </section>}
      {page === "faq" && <section className="section faq faq-page">
        <div>
          <h1 className="page-title">{l("FAQ", "Preguntas frecuentes")}</h1>
          <p className="intro">{l("Quick answers before you message us. If you still have a question, WhatsApp is the fastest way to reach us.", "Respuestas rápidas antes de escribirnos. Si aún tienes una pregunta, WhatsApp es la forma más rápida de contactarnos.")}</p>
          <a className="text-link" href={url({ page: "classes" })}>{l("See classes and pricing", "Ver clases y precios")} ↗</a>
        </div>
        <div className="faq-list">{faqs.map(faq => <details key={faq[0]}><summary>{faq[0]}<span aria-hidden="true">+</span></summary><p>{faq[1]}</p></details>)}</div>
      </section>}
      {page === "about" && <>
        <section className="section story"><div><p className="eyebrow">{l("Our story", "Nuestra historia")}</p><h1 className="page-title">{l("From learning the rules to finding a voice.", "De aprender las reglas a encontrar una voz.")}</h1><Image className="founder-portrait" src={asset("/brand/audrey-founder.webp")} alt={l("Audrey, founder of Just Keep Talking", "Audrey, fundadora de Just Keep Talking")} width={900} height={1350} unoptimized /><p className="story-signature">{l("Audrey · Founder of Just Keep Talking", "Audrey · Fundadora de Just Keep Talking")}</p></div><div className="story-copy">
          <p>{l("For years, Audrey studied Spanish at school and university. She practiced grammar and memorized vocabulary, but speaking still didn’t feel natural. Knowing the rules had not given her the confidence to join a conversation.", "Durante años, Audrey estudió español en la escuela, el colegio y la universidad. Practicaba gramática y memorizaba vocabulario, pero hablar todavía no le resultaba natural. Conocer las reglas no le había dado la confianza para participar en una conversación.")}</p>
          <p>{l("An exchange program in Costa Rica changed that. Surrounded by people, culture, and everyday conversations, she began to feel that she could really speak the language. The experience changed how she understood learning: connection and meaningful interaction made a difference.", "Un intercambio en Costa Rica cambió esa experiencia. Rodeada de personas, cultura y conversaciones cotidianas, comenzó a sentir que realmente podía hablar el idioma. Eso transformó su manera de entender el aprendizaje: la conexión y la interacción significativa marcaban la diferencia.")}</p>
          <p>{l("Back in the United States, she continued studying education with a focus on teaching Spanish and English as a second language. In 2021, she moved to Costa Rica and began creating personalized virtual lessons, building the academy that became Just Keep Talking.", "De regreso en Estados Unidos, continuó estudiando educación con un enfoque en la enseñanza del español y del inglés como segunda lengua. En 2021, se mudó a Costa Rica y comenzó a crear clases virtuales personalizadas, construyendo la academia Just Keep Talking.")}</p>
          <p>{l("The idea was simple: create a place where students want to speak and feel comfortable making mistakes. That purpose still shapes our approach: lessons built around each learner, real conversations, and supportive relationships that help people work toward their own goals.", "La idea era sencilla: crear un espacio donde los estudiantes quieran hablar y se sientan cómodos al equivocarse. Ese propósito sigue guiando nuestro enfoque: clases diseñadas para cada persona, conversaciones reales y relaciones de apoyo que ayudan a avanzar hacia las metas propias.")}</p>
        </div></section>
        <section className="section team-section" id="team"><p className="eyebrow">{l("Our team", "Nuestro equipo")}</p><h2>{l("Different stories. A shared love of learning.", "Historias diferentes. El mismo amor por aprender.")}</h2>{teamGrid(false)}</section>
      </>}
      {page === "policies" && <section className="section reading-page"><p className="eyebrow">{l("Policies", "Políticas")}</p><h1 className="page-title">{l("Planning your learning", "Planifica tu aprendizaje")}</h1><p className="notice">{l("Upcoming 2027 policy · Effective January 4, 2027", "Próxima política de 2027 · Vigente a partir del 4 de enero de 2027")}</p><p className="intro">{l("A brief overview of the upcoming enrollment policy. These terms take effect on January 4, 2027. Contact Just Keep Talking for the policy that applies to your start date and your full enrollment details.", "Un breve resumen de la próxima política de matrícula. Estas condiciones entran en vigor el 4 de enero de 2027. Contacta a Just Keep Talking para conocer la política aplicable a tu fecha de inicio y los detalles completos de tu matrícula.")}</p><nav className="contents" aria-label={l("On this page", "En esta página")}><a href="#tuition">{l("Monthly tuition", "Mensualidad")}</a><a href="#schedule">{l("Your schedule", "Tu horario")}</a><a href="#enrollment">{l("Getting enrolled", "La matrícula")}</a></nav>
        <section id="tuition"><h2>{l("Monthly tuition", "Mensualidad")}</h2><p>{l("The 2027 policy uses fixed monthly tuition for a recurring weekly schedule. Monthly tuition accounts for the academic calendar, including scheduled holidays and academy breaks. A new student’s first month may be prorated when starting later in the month.", "La política de 2027 establece una mensualidad fija para un horario semanal recurrente. La mensualidad contempla el calendario académico, incluidos los feriados y recesos programados. El primer mes de un estudiante nuevo puede prorratearse si comienza después del inicio del mes.")}</p></section>
        <section id="schedule"><h2>{l("Your schedule", "Tu horario")}</h2><p>{l("Discuss your weekly availability with Just Keep Talking during intake. Ask us about the attendance and rescheduling terms that apply to your class format and start date.", "Conversa con Just Keep Talking sobre tu disponibilidad semanal durante la entrevista. Consúltanos las condiciones de asistencia y reprogramación aplicables a tu formato de clase y fecha de inicio.")}</p></section>
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
      {page !== "teach" && page !== "policies" && <section className="closing"><div><p className="eyebrow">{l("Your next conversation starts here", "Tu próxima conversación empieza aquí")}</p><h2>{l("Tell us where you want language to take you.", "Cuéntanos adónde quieres llegar con el idioma.")}</h2><p>{l("We’ll talk about your goals, your experience, and your schedule, then put a learning plan in place.", "Conversaremos sobre tus metas, tu experiencia y tu horario, y dejaremos listo un plan de aprendizaje.")}</p></div><a className="button light" href={generalUrl} target="_blank" rel="noreferrer">{cta}</a></section>}
    </main>
    <footer><div className="footer-brand"><div className="brand-lockup"><Image className="logo" src={asset("/brand/mark-white.png")} alt="" width={240} height={164} unoptimized /><span className="brand-name">Just Keep Talking</span></div></div><nav aria-label={l("Footer navigation", "Navegación del pie de página")}><a href={url({ page: "classes" })}>{l("Classes & pricing", "Clases y precios")}</a><a href={url({ page: "policies" })}>{l("Policy overview", "Resumen de políticas")}</a><a href={url({ page: "teach" })}>{l("Teach with us", "Enseña con nosotros")}</a></nav><div className="footer-contact"><a href={generalUrl} target="_blank" rel="noreferrer">WhatsApp · +506 8685 8056</a><a href={`mailto:${email}`}>{email}</a><a href="https://www.instagram.com/justkeeptalkingcr/" target="_blank" rel="noreferrer">Instagram · @justkeeptalkingcr</a></div>    </footer>
  </div>;
}
