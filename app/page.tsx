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
const pages = ["home", "classes", "approach", "about", "faq", "policies", "teach", "curriculum"] as const;
type Page = typeof pages[number];

// Source: owner-supplied bios in website-information.txt (first person kept).
const team = [
  { name: "Audrey", en: "Buenas! I’m from Michigan, USA and I moved to Costa Rica in June 2021. I enjoy traveling, reading, cooking, and hiking. I studied Spanish and Linguistics in university, so I am a total grammar nerd. I have a lot of experience teaching and learning languages, so I can relate to how challenging it can be!", es: "¡Buenas! Soy de Michigan, EE. UU., y me mudé a Costa Rica en junio de 2021. Me gusta viajar, leer, cocinar y hacer senderismo. Estudié Español y Lingüística en la universidad, así que soy una nerd total de la gramática. Tengo mucha experiencia enseñando y aprendiendo idiomas, así que entiendo lo desafiante que puede ser." },
  { name: "Iain", en: "Greetings! I moved from the United Kingdom to Costa Rica in October 2020. I love teaching and in particular beginner adults. I am a native English speaker and I am currently learning Spanish. I have a wide range of interests including sports and fitness, especially more extreme sports, wildlife photography, and conservation travel.", es: "¡Saludos! Me mudé del Reino Unido a Costa Rica en octubre de 2020. Me encanta enseñar, en especial a adultos principiantes. Soy hablante nativo de inglés y ahora estoy aprendiendo español. Tengo muchos intereses: deportes y ejercicio (sobre todo los más extremos), fotografía de vida silvestre y viajes de conservación." },
  { name: "Shay", en: "Hello there! I believe travel broadens the mind. So I’ve always wanted to live somewhere other than Canada. I moved to Costa Rica in November of 2023 and currently live in Quepos. I am an athlete at heart and love many sports but some other things I enjoy include video games, film & entertainment, exploring new places and learning new things!", es: "¡Hola! Creo que viajar amplía la mente. Por eso siempre quise vivir en un lugar distinto a Canadá. Me mudé a Costa Rica en noviembre de 2023 y ahora vivo en Quepos. Soy deportista de corazón y me gustan muchos deportes; también disfruto los videojuegos, el cine y el entretenimiento, explorar lugares nuevos y aprender cosas nuevas." },
  { name: "Monique", en: "Hi, I’m Monique! I have a passion for sharing information. I’ve been a preschool teacher, an assistant professor at a university, I’ve taught parents about Child Development, and I’ve taught Math, English, and Yoga virtually over the past 4 years. I love spending time outdoors and am always ready to hop in the car or on a motorcycle to go on an adventure. I like practicing yoga, cooking, and gardening. I also really enjoy hanging out with my friends and going for coffee. The beach is my happy place! Reading and learning are also passions of mine, which are what fuel my love of teaching!", es: "¡Hola, soy Monique! Me apasiona compartir información. He sido maestra de preescolar, profesora asistente en una universidad, he acompañado a padres en desarrollo infantil y he enseñado Matemáticas, Inglés y Yoga en línea durante los últimos 4 años. Me encanta estar al aire libre y siempre estoy lista para subirme al carro o a la moto e irme de aventura. Practico yoga, cocino y hago jardinería. También disfruto mucho estar con mis amigos e ir por un café. ¡La playa es mi lugar feliz! Leer y aprender también son pasiones mías, y eso alimenta mi amor por enseñar." },
  { name: "Cristian", en: "¡Hola! I’m Cristian, and teaching Spanish is my passion because I love connecting cultures and walking with my students as they discover a new language. With more than 15 years of experience, I’ve worked with people from all over the world, helping them speak Spanish with ease, joy, and confidence. In my classes, learning is lived: we talk, we explore culture, and we learn in a close, dynamic, and meaningful way.", es: "¡Hola! Soy Cristian, y enseñar español es mi pasión porque me encanta conectar culturas y acompañar a mis estudiantes en su proceso de descubrir un nuevo idioma. Con más de 15 años de experiencia, he trabajado con personas de todo el mundo, guiándolas a hablar español con naturalidad, alegría y confianza. En mis clases, el aprendizaje se vive: conversamos, exploramos la cultura y aprendemos de manera cercana, dinámica y significativa." },
  { name: "Charlie", en: "Hi, I’m Charlie. I’m from London (UK) where I previously worked as a social worker, working with children and families. In March 2026 I decided I wanted to travel whilst still continuing to work with people so started teaching in Costa Rica. I currently work in a primary school and preschool as well as teaching adults online. I love football (soccer) whether it’s playing or watching. I enjoy relaxing on the beach and surrounding myself with nature. My other passions include food, reading, music and travelling. Hope to see you soon!", es: "Hola, soy Charlie. Soy de Londres (Reino Unido), donde trabajé como trabajador social con niños y familias. En marzo de 2026 decidí viajar y seguir trabajando con personas, así que empecé a enseñar en Costa Rica. Ahora trabajo en una escuela primaria y un preescolar, y también doy clases en línea a adultos. Me encanta el fútbol, jugarlo o verlo. Disfruto relajarme en la playa y estar en la naturaleza. También me apasionan la comida, la lectura, la música y viajar. ¡Espero verte pronto!" },
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
    teach: l("Teach With Us", "Enseñe con nosotros"),
    curriculum: l("Curriculum for Teachers", "Currículo para docentes"),
  };
  const title = `Just Keep Talking | ${titles[page]}`;
  const description = page === "approach"
    ? l("How Just Keep Talking teaches: an intake meeting, a brief oral evaluation, a personal learning plan, and conversation guided by your goals.", "Cómo enseña Just Keep Talking: una reunión de entrevista, una breve evaluación oral, un plan de aprendizaje personal y una conversación guiada por sus metas.")
    : page === "faq"
      ? l("Answers about language levels, ages, online classes, immersion activities, methodology, and the languages we offer.", "Respuestas sobre niveles, edades, clases en línea, actividades de inmersión, metodología y los idiomas que ofrecemos.")
      : page === "curriculum"
        ? l("A comprehensive English curriculum from A1 to C2 for teachers: organized, sequential, and ready to use. Inquire for details.", "Un currículo de inglés completo de A1 a C2 para docentes: organizado, secuencial y listo para usar. Consulte para más detalles.")
        : l("Personalized language instruction built around your level, goals, and needs.", "Instrucción de idiomas personalizada, diseñada según su nivel, sus metas y sus necesidades.");
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
    { title: l("Real conversation", "Conversación real"), body: l("Classes are built around the situations you actually need English for.", "Las clases se arman alrededor de las situaciones en las que realmente necesita el inglés.") },
    { title: l("Clear feedback", "Retroalimentación clara"), body: l("Your teacher listens, guides the exchange, and helps you notice what to improve as you speak.", "Su docente escucha, guía el intercambio y le ayuda a notar qué mejorar mientras habla.") },
    { title: l("All four skills", "Las cuatro habilidades"), body: l("You practice listening, reading, writing, and speaking, with conversation at the center.", "Practica escucha, lectura, escritura y habla, con la conversación al centro.") },
    { title: l("Comfort speaking", "Comodidad al hablar"), body: l("A big part of class is helping English feel more natural when you use it.", "Gran parte de la clase es ayudar a que el inglés se sienta más natural cuando lo usa.") },
    { title: l("Useful grammar", "Gramática útil"), body: l("We bring in grammar when it helps you say what you mean.", "Incluimos gramática cuando le ayuda a decir lo que quiere decir.") },
  ];
  const learningSteps = [
    {
      title: l("Your intake meeting", "Su reunión de entrevista"),
      body: l("In one meeting we get to know you, talk about your goals and language background, do a brief oral evaluation, build a personalized learning plan, and cover logistics: teacher, schedule, policies, and payment.", "En una sola reunión nos conocemos, hablamos de sus metas y su trayectoria con el idioma, hacemos una breve evaluación oral, armamos un plan personalizado y cubrimos la logística: docente, horario, políticas y pago."),
    },
    {
      title: l("Start classes with your teacher", "Comience clases con su docente"),
      body: l("Your teacher draws on hundreds of academy resources to shape each class to you and your level. If you need a lesson we do not have yet, we create it for you.", "Su docente toma de cientos de recursos de la academia para adaptar cada clase a usted y a su nivel. Si necesita una lección que aún no tenemos, la creamos para usted."),
    },
    {
      title: l("Measure your progress", "Mida su progreso"),
      body: l("You check in regularly with your teacher. We also send quarterly progress reports and run evaluations when they are useful.", "Hace seguimientos regulares con su docente. También enviamos informes de progreso trimestrales y hacemos evaluaciones cuando aportan."),
    },
  ];
  const curriculumItems = [
    l("Warm-ups, games, and time fillers", "Actividades de apertura, juegos y rellenos de tiempo"),
    l("IELTS and TOEFL test-prep English", "Inglés para preparación de IELTS y TOEFL"),
    l("Business English", "Inglés de negocios"),
    l("A bank of conversation, listening, writing, and reading lessons", "Un banco de lecciones de conversación, escucha, escritura y lectura"),
  ];
  const curriculumUrl = wa(l("Hi! I’m a teacher and I’d like to know more about the curriculum you’ve developed.", "¡Hola! Soy docente y me gustaría saber más sobre el currículo que han desarrollado."));
  const founderPreview = l(
    "I’ve been studying Spanish since I was young, always with very traditional methods. Even after years of grammar drills and memorization, I never felt truly confident speaking. Everything changed during an exchange in Costa Rica. Real conversations and real connections helped my Spanish grow. In 2021, I moved here and began Just Keep Talking: personalized online lessons in a space where students want to speak and feel safe to make mistakes.",
    "Estudié español desde joven, siempre con métodos muy tradicionales. Incluso después de años de ejercicios de gramática y memorización, nunca me sentí realmente segura al hablar. Todo cambió en un intercambio en Costa Rica. Las conversaciones reales y las conexiones reales hicieron que mi español creciera. En 2021 me mudé aquí y empecé Just Keep Talking: clases en línea personalizadas, en un espacio donde los estudiantes quieran hablar y se sientan seguros al equivocarse.",
  );
  const faqs = [
    [l("Do you give classes to all language levels?", "¿Dan clases para todos los niveles?"), l("Yes. We welcome all levels. Your intake conversation helps us understand your starting point and the support you need.", "Sí. Recibimos estudiantes de todos los niveles. La entrevista nos ayuda a conocer su punto de partida y el apoyo que necesita.")],
    [l("Are classes for all ages?", "¿Las clases son para todas las edades?"), l("Yes. We offer classes for adults and children, with lessons shaped around the learner’s goals and interests.", "Sí. Ofrecemos clases para adultos y niños, adaptadas a las metas e intereses de cada estudiante.")],
    [l("Do you offer in-person classes?", "¿Ofrecen clases presenciales?"), l("No. Classes are fully online through Zoom. We do organize in-person immersion activities, such as a picnic or outing.", "No. Las clases son completamente en línea por Zoom. Sí organizamos actividades de inmersión presenciales, como un picnic o una salida.")],
    [l("Private or small group?", "¿Clases privadas o en grupo pequeño?"), l("Private classes offer one-on-one practice. Small groups let you learn alongside others. Talk with us about the format, group arrangements, and schedule that fit your goals.", "Las clases privadas ofrecen práctica uno a uno. En grupos pequeños, aprenda junto a otras personas. Conversemos sobre el formato, la organización del grupo y el horario que se adaptan a sus metas.")],
    [l("How do I get started?", "¿Cómo puedo comenzar?"), l("Message us on WhatsApp. If you would like to enroll, we set up an intake meeting to talk about your experience, evaluate your starting point, and build your learning plan.", "Escríbanos por WhatsApp. Si desea inscribirse, coordinamos una reunión de entrevista para conversar sobre su experiencia, evaluar su punto de partida y armar su plan de aprendizaje.")],
    [l("What is your methodology?", "¿Cuál es su metodología?"), l("Conversation is at the center, with structure, guidance, and meaningful feedback. Grammar, vocabulary, listening, reading, and writing are part of the plan. Before you begin, we evaluate your starting point, build a personal learning plan, and follow your progress.", "La conversación está al centro, con estructura, guía y retroalimentación significativa. La gramática, el vocabulario, la escucha, la lectura y la escritura forman parte del plan. Antes de comenzar, evaluamos su punto de partida, armamos un plan de aprendizaje personal y seguimos su progreso.")],
    [l("What languages do you offer?", "¿Qué idiomas ofrecen?"), l("English for all ages and Spanish for adults.", "Inglés para todas las edades y español para adultos.")],
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
          <div><p className="eyebrow">{l("Your virtual language academy", "Su academia virtual de idiomas")}</p><h1>{l("Build the confidence", "Gane confianza")} <em>{l("to speak.", "para hablar.")}</em></h1><p className="intro">{l("Personalized language instruction built around your level, goals, and needs.", "Instrucción de idiomas personalizada, diseñada según su nivel, sus metas y sus necesidades.")}</p><a className="button primary" href={generalUrl} target="_blank" rel="noreferrer">{cta}</a><p className="micro">{l("Certified native teachers · Personalized learning · Authentic conversation", "Docentes nativos certificados · Aprendizaje personalizado · Conversación auténtica")}</p></div>
          <div className="hero-visual"><Image src={asset("/brand/students-talking.webp")} alt={l("Three teachers sharing a book and laughing together", "Tres docentes compartiendo un libro y riendo juntas")} width={1600} height={1066} priority unoptimized /></div>
        </section>
        <section className="section audience-section" aria-labelledby="audiences-title">
          <h2 id="audiences-title">{l("Language for you.", "El idioma para usted.")}</h2>
          <div className="audience-grid">
            <a className="audience-card" href={url({ page: "classes", audience: "adults" })}>
              <h3>{l("Adults", "Adultos")}</h3>
              <p>{l("Whether you need English for work, travel, school, or just because you want to, we shape classes around the conversations that matter to you.", "Ya sea que necesite inglés para el trabajo, viajes, estudios o simplemente porque quiere, diseñamos las clases alrededor de las conversaciones que le importan.")}</p>
              <span className="text-link">{l("Explore adult classes", "Explore las clases para adultos")} ↗</span>
            </a>
            <a className="audience-card kids-path" href={url({ page: "classes", audience: "kids" })}>
              <h3>{l("Kids", "Niños")}</h3>
              <p>{l("Practice, play, and connection in a safe space to grow in confidence.", "Práctica, juego y conexión en un espacio seguro para ganar confianza.")}</p>
              <span className="text-link">{l("Explore kids’ classes", "Explore las clases para niños")} ↗</span>
            </a>
          </div>
        </section>
        <section className="section approach-teaser"><div><h2>{l("Our approach", "Nuestro enfoque")}</h2><p className="intro">{l("Before your first official class, we have a meeting where we talk about your goals, give a brief oral evaluation, and customize your learning plan.", "Antes de su primera clase oficial, tenemos una reunión en la que hablamos de sus metas, hacemos una breve evaluación oral y personalizamos su plan de aprendizaje.")}</p><a className="text-link" href={url({ page: "approach" })} onClick={followNav}>{l("Read our approach", "Lea nuestro enfoque")} ↗</a></div></section>
        <section className="founder-band"><div className="section founder-preview"><div><h2>{l("How Just Keep Talking started", "Cómo empezó Just Keep Talking")}</h2></div><div><Image className="founder-preview-portrait" src={asset("/brand/audrey-home-founder.webp")} alt={l("Audrey, founder of Just Keep Talking", "Audrey, fundadora de Just Keep Talking")} width={900} height={1350} unoptimized /><p className="intro">{founderPreview}</p><a className="text-link" href={url({ page: "about" })}>{l("Read Audrey’s story", "Lea la historia de Audrey")} ↗</a></div></div></section>
        <section className="section"><div className="section-intro"><h2>{l("Meet our community", "Conozca a nuestra comunidad")}</h2><a className="text-link" href={url({ page: "about" }, "#team")}>{l("See more", "Ver más")} ↗</a></div>{teamGrid(true)}</section>
      </>}
      {page === "approach" && <>
        <section className="section approach-page">
          <p className="eyebrow">{l("Our approach", "Nuestro enfoque")}</p>
          <h1 className="page-title">{l("Learn a language by using it.", "Aprenda un idioma usándolo.")}</h1>
          <p className="intro">{l("Conversation is at the center of learning, supported by structure, guidance, and meaningful feedback. Students gain confidence in real-life situations while strengthening grammar, vocabulary, listening, reading, and writing.", "La conversación está al centro del aprendizaje, con estructura, guía y retroalimentación significativa. Los estudiantes ganan confianza en situaciones de la vida real y, a la vez, fortalecen la gramática, el vocabulario, la escucha, la lectura y la escritura.")}</p>
          <div className="approach-method">
            <div className="approach-method-visual">
              <Image src={asset("/brand/approach-2508.webp")} alt={l("A student thinking with a stack of books and a pencil", "Una estudiante pensativa con una pila de libros y un lápiz")} width={900} height={1350} unoptimized />
            </div>
            <div>
              <h2>{l("How we teach", "Cómo enseñamos")}</h2>
              <p className="approach-method-lead">{l("We teach through real conversation, with structure and feedback so students are not left to chat alone. Your teacher guides the exchange and helps speaking feel more natural in real life.", "Enseñamos a través de la conversación real, con estructura y retroalimentación para que el estudiante no quede solo charlando. Su docente guía el intercambio y ayuda a que hablar se sienta más natural en la vida real.")}</p>
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
            </div>
            <ol className="learning-steps">
              {learningSteps.map((step, index) => (
                <li key={step.title} className={`learning-step learning-step-${index + 1}`}>
                  <span className="number">0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
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
        <h1 className="page-title">{l("Explore our plans.", "Explore nuestros planes.")}</h1>
        <p className="intro">{l("Our team is based in Costa Rica, and we welcome students from anywhere in the Americas.", "Nuestro equipo está en Costa Rica, y recibimos estudiantes de cualquier lugar de las Américas.")}</p>
        <div className="pricing-controls">
          <fieldset><legend>{l("Who’s learning?", "¿Quién va a aprender?")}</legend><div className="segmented">{[["adults", l("Adults", "Adultos")], ["kids", l("Kids", "Niños")]].map(([value, label]) => <button type="button" key={value} aria-pressed={audience === value} onClick={() => change("audience", value)}>{label}</button>)}</div></fieldset>
          <fieldset><legend>{l("Class format", "Formato de clase")}</legend><div className="segmented">{[["private", l("Private", "Privadas")], ["group", l("Small group", "Grupo pequeño")]].map(([value, label]) => <button type="button" key={value} aria-pressed={format === value} onClick={() => change("format", value)}>{label}</button>)}</div></fieldset>
          {format === "group" && <fieldset><legend>{l("Group size", "Tamaño del grupo")}</legend><div className="segmented">{["2", "3", "4+"].map(value => <button type="button" key={value} aria-pressed={size === value} onClick={() => change("size", value)}>{value}<span className="sr-only"> {l("students", "estudiantes")}</span></button>)}</div></fieldset>}
          <fieldset className="currency-control"><legend>{l("Currency", "Moneda")}</legend><div className="segmented">{["CRC", "USD"].map(value => <button type="button" key={value} aria-pressed={currency === value} onClick={() => change("currency", value)}>{value}</button>)}</div></fieldset>
        </div>
        <div className="selection-heading" aria-live="polite"><h2>{audienceLabel} · {formatLabel}</h2><p>{audience === "adults" ? l("You might understand a lot of English, but when it's time to speak, finding the words can feel completely different. That's something we work on together.", "Tal vez entiende mucho inglés, pero cuando llega el momento de hablar, encontrar las palabras puede sentirse completamente distinto. Eso es algo en lo que trabajamos juntos.") : l("Tell us about your child’s interests, experience with English, and schedule.", "Cuéntenos los intereses de su hijo o hija, su experiencia con el inglés y su horario.")}</p></div>
        <div className="plan-grid">{planNames.map((name, index) => <article className="plan-card" key={name}><span className="number">0{index + 1}</span><h3>{name}</h3><p className="schedule">{weeklyTime(index)}</p><div className="price"><b>{money(prices[index])}</b><span>{l("per month", "por mes")}</span></div><a className="button primary" href={inquiry(index)} target="_blank" rel="noreferrer">{l("Ask about this plan", "Consulte por este plan")}</a></article>)}</div>
        <p className="enrollment">{l("One-time enrollment fee", "Matrícula por única vez")}: <strong>{money(audience === "adults" ? (currency === "CRC" ? 15000 : 35) : (currency === "CRC" ? 10000 : 25))}</strong></p>
        <p className="small-copy">{l("Monthly tuition. Contact us to discuss availability and enrollment; your inquiry does not reserve a place.", "Mensualidad. Escríbanos para consultar la disponibilidad y la matrícula; su consulta no reserva un cupo.")}</p>
      </section>}
      {page === "faq" && <section className="section faq faq-page">
        <div>
          <h1 className="page-title">{l("FAQ", "Preguntas frecuentes")}</h1>
          <p className="intro">{l("Quick answers before you message us. If you still have a question, WhatsApp is the fastest way to reach us.", "Respuestas rápidas antes de escribirnos. Si aún tiene una pregunta, WhatsApp es la forma más rápida de contactarnos.")}</p>
          <a className="text-link" href={url({ page: "classes" })}>{l("See classes and pricing", "Ver clases y precios")} ↗</a>
        </div>
        <div className="faq-list">{faqs.map(faq => <details key={faq[0]}><summary>{faq[0]}<span aria-hidden="true">+</span></summary><p>{faq[1]}</p></details>)}</div>
      </section>}
      {page === "about" && <>
        <section className="section story"><div><p className="eyebrow">{l("Our story", "Nuestra historia")}</p><h1 className="page-title">{l("How this project began.", "Cómo comenzó este proyecto.")}</h1><Image className="founder-portrait" src={asset("/brand/audrey-founder.webp")} alt={l("Audrey, founder of Just Keep Talking", "Audrey, fundadora de Just Keep Talking")} width={900} height={1350} unoptimized /><p className="story-signature">{l("Audrey · Founder of Just Keep Talking", "Audrey · Fundadora de Just Keep Talking")}</p></div><div className="story-copy">
          <p>{l("My name is Audrey, and I’m the founder of Just Keep Talking. I’d love to share how this project began.", "Me llamo Audrey y soy la fundadora de Just Keep Talking. Me encantaría contarle cómo comenzó este proyecto.")}</p>
          <p>{l("I’ve been studying Spanish since I was young, in school, high school, and university, always with very traditional methods. Even after years of grammar drills and memorization, I never felt truly confident speaking.", "He estudiado español desde joven, en la escuela, el colegio y la universidad, siempre con métodos muy tradicionales. Incluso después de años de ejercicios de gramática y memorización, nunca me sentí realmente segura al hablar.")}</p>
          <p>{l("Everything changed when I participated in an exchange program in Costa Rica. Being immersed in real conversations, surrounded by people and culture, I finally felt like I could speak the language.", "Todo cambió cuando participé en un programa de intercambio en Costa Rica. Al estar inmersa en conversaciones reales, rodeada de personas y cultura, por fin sentí que podía hablar el idioma.")}</p>
          <p>{l("That experience changed the way I saw language learning. So after returning to the U.S., I continued studying education with a focus on teaching Spanish and English as a second language. I dreamed of creating a program that felt more human: one centered on meaningful conversation, real connection, and learning through authentic interaction.", "Esa experiencia cambió la forma en que veía el aprendizaje de idiomas. Al regresar a Estados Unidos, seguí estudiando educación con un enfoque en la enseñanza del español y del inglés como segunda lengua. Soñé con crear un programa más humano: centrado en la conversación significativa, la conexión real y el aprendizaje a través de la interacción auténtica.")}</p>
          <p>{l("In 2021, I moved to Costa Rica to bring that dream to life. I started teaching virtual classes, creating my own lessons, and shaping a methodology focused on personalized learning, comfort, and confidence. The goal was simple: create a learning environment where students want to speak and feel safe to make mistakes.", "En 2021 me mudé a Costa Rica para dar vida a ese sueño. Empecé a dar clases virtuales, a crear mis propias lecciones y a dar forma a una metodología centrada en el aprendizaje personalizado, la comodidad y la confianza. El objetivo era simple: crear un ambiente de aprendizaje donde los estudiantes quieran hablar y se sientan seguros al equivocarse.")}</p>
          <p>{l("Over time, what began as one teacher with a laptop grew into a full team and a thriving community. Today, Just Keep Talking is made up of several certified teachers and nearly 100 students across the Americas, each with their own goals, stories, and successes. And this is just the beginning.", "Con el tiempo, lo que empezó como una docente con una laptop creció hasta convertirse en un equipo completo y una comunidad vibrante. Hoy Just Keep Talking está formado por varios docentes certificados y cerca de 100 estudiantes en toda América, cada uno con sus propias metas, historias y logros. Y esto apenas comienza.")}</p>
        </div></section>
        <section className="section team-section" id="team"><p className="eyebrow">{l("Our team", "Nuestro equipo")}</p><h2>{l("Meet the teachers.", "Conozca a los docentes.")}</h2>{teamGrid(false)}</section>
      </>}
      {page === "policies" && <section className="section reading-page"><p className="eyebrow">{l("Policies", "Políticas")}</p><h1 className="page-title">{l("Planning your learning", "Planifique su aprendizaje")}</h1><p className="notice">{l("Upcoming 2027 policy · Effective January 4, 2027", "Próxima política de 2027 · Vigente a partir del 4 de enero de 2027")}</p><p className="intro">{l("A brief overview of the upcoming enrollment policy. These terms take effect on January 4, 2027. Contact Just Keep Talking for the policy that applies to your start date and your full enrollment details.", "Un breve resumen de la próxima política de matrícula. Estas condiciones entran en vigor el 4 de enero de 2027. Contacte a Just Keep Talking para conocer la política aplicable a su fecha de inicio y los detalles completos de su matrícula.")}</p><nav className="contents" aria-label={l("On this page", "En esta página")}><a href="#tuition">{l("Monthly tuition", "Mensualidad")}</a><a href="#schedule">{l("Your schedule", "Su horario")}</a><a href="#enrollment">{l("Getting enrolled", "La matrícula")}</a></nav>
        <section id="tuition"><h2>{l("Monthly tuition", "Mensualidad")}</h2><p>{l("The 2027 policy uses fixed monthly tuition for a recurring weekly schedule. Monthly tuition accounts for the academic calendar, including scheduled holidays and academy breaks. A new student’s first month may be prorated when starting later in the month.", "La política de 2027 establece una mensualidad fija para un horario semanal recurrente. La mensualidad contempla el calendario académico, incluidos los feriados y recesos programados. El primer mes de un estudiante nuevo puede prorratearse si comienza después del inicio del mes.")}</p></section>
        <section id="schedule"><h2>{l("Your schedule", "Su horario")}</h2><p>{l("Discuss your weekly availability with Just Keep Talking during intake. Ask us about the attendance and rescheduling terms that apply to your class format and start date.", "Converse con Just Keep Talking sobre su disponibilidad semanal durante la entrevista. Consúltenos las condiciones de asistencia y reprogramación aplicables a su formato de clase y fecha de inicio.")}</p></section>
        <section id="enrollment"><h2>{l("Getting enrolled", "La matrícula")}</h2><p>{l("Enrollment fees are separate from monthly tuition. Before you enroll, we’ll discuss your class format, schedule, payment options, and applicable policy with you.", "La matrícula se cobra por separado de la mensualidad. Antes de inscribirse, conversaremos sobre su formato de clase, horario, opciones de pago y política aplicable.")}</p><a className="button primary" href={generalUrl} target="_blank" rel="noreferrer">{cta}</a></section>
      </section>}
      {page === "teach" && <section className="section recruitment"><p className="eyebrow">{l("Teach with us", "Enseñe con nosotros")}</p><h1 className="page-title">{l("Join our teaching team.", "Únase a nuestro equipo docente.")}</h1><p className="intro">{l("If you are interested in joining our team, reach out on WhatsApp, email, or Instagram to coordinate an interview.", "Si le interesa unirse a nuestro equipo, escríbanos por WhatsApp, correo o Instagram para coordinar una entrevista.")}</p><div className="recruitment-grid"><div><h2>{l("Why join our team", "Por qué unirse al equipo")}</h2><ul>{[
          l("Flexible schedule: teach at times that support a healthy work-life balance, including family visits, personal trips, and time off when needed.", "Horario flexible: enseñe en horarios que apoyen un buen equilibrio entre trabajo y vida personal, con visitas familiares, viajes personales y tiempo libre cuando haga falta."),
          l("Teacher community: join a supportive team that collaborates, shares resources, and encourages each other’s success.", "Comunidad docente: únase a un equipo de apoyo que colabora, comparte recursos y celebra el éxito de cada persona."),
          l("Training and development: ongoing training and idea shares to refine your skills.", "Capacitación y desarrollo: formación continua e intercambio de ideas para seguir creciendo."),
          l("Opportunities for growth: expand your role, teach specialized courses, or help develop new programs.", "Oportunidades de crecimiento: ampliar su rol, dar cursos especializados o ayudar a desarrollar programas nuevos."),
          l("Teaching materials: high-quality, ready-to-use materials that make lesson planning efficient and engaging.", "Materiales de enseñanza: materiales listos para usar, de buena calidad, que hacen la planificación eficiente y atractiva."),
          l("Rewarding work: help students overcome challenges and reach their language goals.", "Trabajo gratificante: ayudar a los estudiantes a superar retos y alcanzar sus metas con el idioma."),
          l("Competitive compensation: pay that values your expertise and dedication to teaching.", "Compensación competitiva: una remuneración que valora su experiencia y su dedicación a la enseñanza."),
        ].map(item => <li key={item}>{item}</li>)}</ul></div><div><h2>{l("What we expect from our teachers", "Qué esperamos de nuestros docentes")}</h2><ul>{[
          l("Professionalism: punctuality, responsibility, and consistency in all aspects of your work.", "Profesionalismo: puntualidad, responsabilidad y constancia en todo su trabajo."),
          l("Effective communication: open, respectful communication with administration, fellow teachers, and students.", "Comunicación efectiva: comunicación abierta y respetuosa con la administración, colegas y estudiantes."),
          l("Lesson planning: use our ready-to-use lessons and also craft engaging, personalized plans for each student’s needs and goals.", "Planificación de clases: usar nuestras lecciones listas y también preparar planes atractivos y personalizados según las necesidades y metas de cada estudiante."),
          l("Administrative tasks: complete class and pay tracking, student progress updates, and accounting duties on time.", "Tareas administrativas: completar a tiempo el registro de clases y pagos, las actualizaciones de progreso y las tareas de contabilidad."),
          l("Student engagement: foster a positive classroom atmosphere and use strong social skills to connect with students.", "Participación del estudiante: fomentar un ambiente positivo en clase y conectar con los estudiantes."),
          l("Knowledge of the English language: a solid understanding of English grammar, vocabulary, and teaching techniques.", "Conocimiento del inglés: una comprensión sólida de la gramática, el vocabulario y las técnicas de enseñanza."),
        ].map(item => <li key={item}>{item}</li>)}</ul></div></div><div className="application"><h2>{l("Start a conversation with our team.", "Inicie una conversación con nuestro equipo.")}</h2><a className="button primary" href={wa(l("Hi! I’m interested in teaching with Just Keep Talking and would like to arrange an interview.", "¡Hola! Me interesa enseñar con Just Keep Talking y quisiera coordinar una entrevista."))} target="_blank" rel="noreferrer">{l("Apply on WhatsApp", "Postúlese por WhatsApp")}</a><a className="text-link" href={`mailto:${email}?subject=${encodeURIComponent(l("Teaching at Just Keep Talking", "Enseñar en Just Keep Talking"))}`}>{l("Or send us an email", "O envíenos un correo")}</a><p className="curriculum-teaser">{l("Looking for curriculum for your own classes?", "¿Busca currículo para sus propias clases?")}{" "}<a className="text-link" href={url({ page: "curriculum" })} onClick={followNav}>{l("Curriculum inquiries", "Consultas de currículo")} ↗</a></p></div></section>}
      {page === "curriculum" && <section className="section curriculum-page">
        <h1 className="page-title">{l("Curriculum for teachers.", "Currículo para docentes.")}</h1>
        <p className="intro">{l("A comprehensive English program from A1 to C2: organized, sequential, and fully packaged so any teacher can drop it into their own classes.", "Un programa de inglés completo de A1 a C2: organizado, secuencial y empaquetado para que cualquier docente pueda incorporarlo a sus propias clases.")}</p>
        <ul className="curriculum-list">{curriculumItems.map(item => <li key={item}>{item}</li>)}</ul>
        <p className="small-copy">{l("Message us to learn more. We do not list curriculum pricing on this site.", "Escríbanos para saber más. No publicamos precios del currículo en este sitio.")}</p>
        <div className="application">
          <a className="button primary" href={curriculumUrl} target="_blank" rel="noreferrer">{l("Ask for more info", "Pida más información")}</a>
          <a className="text-link" href={`mailto:${email}?subject=${encodeURIComponent(l("Curriculum inquiry", "Consulta de currículo"))}`}>{l("Or send us an email", "O envíenos un correo")}</a>
        </div>
      </section>}
      {page !== "teach" && page !== "policies" && page !== "curriculum" && <section className="closing"><div><p className="eyebrow">{l("Your next conversation starts here", "Su próxima conversación empieza aquí")}</p><h2>{l("Tell us where you want language to take you.", "Cuéntenos adónde quiere llegar con el idioma.")}</h2><p>{l("We’ll talk about your goals, your experience, and your schedule, then put a learning plan in place.", "Conversaremos sobre sus metas, su experiencia y su horario, y dejaremos listo un plan de aprendizaje.")}</p></div><a className="button light" href={generalUrl} target="_blank" rel="noreferrer">{cta}</a></section>}
    </main>
    <footer><div className="footer-brand"><div className="brand-lockup"><Image className="logo" src={asset("/brand/mark-white.png")} alt="" width={240} height={164} unoptimized /><span className="brand-name">Just Keep Talking</span></div></div><nav aria-label={l("Footer navigation", "Navegación del pie de página")}><a href={url({ page: "classes" })}>{l("Classes & pricing", "Clases y precios")}</a><a href={url({ page: "policies" })}>{l("Policy overview", "Resumen de políticas")}</a><a href={url({ page: "teach" })}>{l("Teach with us", "Enseñe con nosotros")}</a><a href={url({ page: "curriculum" })}>{l("Curriculum inquiries", "Consultas de currículo")}</a></nav><div className="footer-contact"><a href={generalUrl} target="_blank" rel="noreferrer">WhatsApp · +506 8685 8056</a><a href={`mailto:${email}`}>{email}</a><a href="https://www.instagram.com/justkeeptalkingcr/" target="_blank" rel="noreferrer">Instagram · @justkeeptalkingcr</a></div>    </footer>
  </div>;
}
