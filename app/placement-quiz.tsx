"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Original short-placement items for Spanish speakers. The patterns are the
// ones school placement tests and TEFL contrastive grammar already use
// (do-support, articles, present perfect, phrasal verbs, false friends,
// dependent prepositions, and natural word order). The sentences themselves
// are not from a published exam. Five items can only support a broad picture.

export const seenKey = "jkt-quiz-seen";

type Band = "easy" | "mid" | "hard";

export type QuizItem = {
  id: string;
  band: Band;
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
};

export const quizItems: QuizItem[] = [
  { id: "e1", band: "easy", prompt: "She _____ English at work every day.", choices: ["speaks", "is speaking", "speak", "speaking"], answer: 0 },
  { id: "e2", band: "easy", prompt: "Where _____ you from?", choices: ["Do", "are", "is", "have"], answer: 1 },
  { id: "e3", band: "easy", prompt: "A server asks, “For here or to go?” What do they want to know?", choices: ["What you want to drink", "How you will pay", "If you will stay or take the food with you", "What time you will return"], answer: 2 },
  { id: "e4", band: "easy", prompt: "I need _____ hour to finish this.", choices: ["an", "a", "the", "some"], answer: 0 },
  { id: "e5", band: "easy", prompt: "Please wait. I _____ on the phone right now.", choices: ["talk", "talking", "am talk", "am talking"], answer: 3 },
  { id: "e6", band: "easy", prompt: "_____ you like coffee?", choices: ["Are", "Do", "Have", "Is"], answer: 1 },
  { id: "e7", band: "easy", prompt: "Someone asks, “How was your weekend?” Which reply is natural?", choices: ["It was nice. I went to the beach.", "I am go to the beach.", "I went beach nice.", "Weekend was go the beach."], answer: 0 },
  { id: "e8", band: "easy", prompt: "Which sentence is correct?", choices: ["She is teacher.", "She is an teacher.", "She is a teacher.", "She has teacher."], answer: 2 },
  { id: "m1", band: "mid", prompt: "I _____ in San José since 2020.", choices: ["lived", "have lived", "am live", "live"], answer: 1 },
  { id: "m2", band: "mid", prompt: "You want to say that you own a car. Which sentence is correct?", choices: ["I have a car.", "I have car.", "I have an car.", "I have car a."], answer: 0 },
  { id: "m3", band: "mid", prompt: "Please _____ the form and send it back today.", choices: ["fill", "fill on", "fill out", "fill to"], answer: 2 },
  { id: "m4", band: "mid", prompt: "That date is old. Please send the _____ date, the one we are using now.", choices: ["actual", "nowadays", "real", "current"], answer: 3 },
  { id: "m5", band: "mid", prompt: "She cries during sad films. She is very _____.", choices: ["sensitive", "sensible", "sensational", "sensory"], answer: 0 },
  { id: "m6", band: "mid", prompt: "_____ you ever been to Mexico?", choices: ["Did", "Are", "Have", "Do"], answer: 2 },
  { id: "m7", band: "mid", prompt: "Please _____ your shoes before you come in.", choices: ["take out", "take off", "take on", "put off"], answer: 1 },
  { id: "m8", band: "mid", prompt: "Did you _____ the class yesterday, or did you miss it?", choices: ["attend", "assist", "assist to", "attend to"], answer: 0 },
  { id: "h1", band: "hard", prompt: "Which sentence sounds natural in a work message?", choices: ["I wanted to follow up on yesterday’s meeting.", "I wanted following up on the meeting of yesterday.", "I want follow up yesterday meeting.", "I am wanting to follow the meeting up yesterday."], answer: 0 },
  { id: "h2", band: "hard", prompt: "The result depends _____ your schedule.", choices: ["of", "on", "in", "from"], answer: 1 },
  { id: "h3", band: "hard", prompt: "Which is the most natural way to ask a colleague for help?", choices: ["See this, yes?", "I demand you see this now.", "Could you take a look at this when you have a minute?", "You will look this for me."], answer: 2 },
  { id: "h4", band: "hard", prompt: "She is interested _____ learning English for her job.", choices: ["in", "on", "for", "to"], answer: 0 },
  { id: "h5", band: "hard", prompt: "Which sentence is natural?", choices: ["I have been never to London.", "I haven’t never been to London.", "I have been to London never.", "I have never been to London."], answer: 3 },
  { id: "h6", band: "hard", prompt: "Which sentence is natural?", choices: ["Could you explain me this?", "Could you explain this to me?", "Could you explain to me this thing of work?", "Could you me explain this?"], answer: 1 },
  { id: "h7", band: "hard", prompt: "I always _____ a mistake when I speak too fast.", choices: ["do", "have", "make", "commit"], answer: 2 },
  { id: "h8", band: "hard", prompt: "If I _____ more time, I would take another class.", choices: ["had", "would have", "have", "will have"], answer: 0 },
];

const goals = [
  { label: "El trabajo", focus: "conversaciones de trabajo" },
  { label: "Viajes y la vida diaria", focus: "viajes y la vida diaria" },
  { label: "Los estudios", focus: "el inglés para los estudios" },
  { label: "Hablar con más confianza", focus: "hablar con más confianza" },
] as const;

const confidenceOptions = [
  { label: "Me bloqueo y vuelvo al español", focus: "un lugar tranquilo para intentar de nuevo" },
  { label: "Entiendo algo y respondo con frases cortas", focus: "escuchar la idea principal" },
  { label: "Sigo la conversación y pregunto si pierdo algo", focus: "sonar más natural" },
] as const;

const parentQuestions = [
  {
    prompt: "¿Cómo usa el inglés ahora?",
    choices: [
      { label: "Casi no lo usa todavía", focus: "frases cortas para empezar" },
      { label: "Entiende algunas palabras", focus: "reconocer palabras y responder" },
      { label: "Puede decir frases cortas", focus: "armar frases completas" },
      { label: "Ya conversa, con ayuda", focus: "seguir una conversación corta" },
    ],
  },
  {
    prompt: "¿Qué le cuesta más?",
    choices: [
      { label: "Entender cuando le hablan", focus: "escuchar la idea principal" },
      { label: "Animarse a hablar", focus: "un lugar tranquilo para intentar" },
      { label: "Formar frases", focus: "formar una frase completa" },
      { label: "Leer o escribir", focus: "leer y escribir con apoyo" },
    ],
  },
  {
    prompt: "¿Qué le gusta?",
    choices: [
      { label: "Juegos e historias", focus: "juegos e historias" },
      { label: "Canciones", focus: "canciones" },
      { label: "Animales y naturaleza", focus: "animales y naturaleza" },
      { label: "Deportes y amigos", focus: "deportes y amigos" },
    ],
  },
  {
    prompt: "¿Qué te gustaría que practicara?",
    choices: [
      { label: "La escuela", focus: "el inglés de la escuela" },
      { label: "Viajes y la vida diaria", focus: "viajes y la vida diaria" },
      { label: "Hablar con más confianza", focus: "hablar con más confianza" },
      { label: "Seguir su curiosidad", focus: "temas que le den curiosidad" },
    ],
  },
] as const;

const pictures = {
  start: {
    name: "Recién comenzando",
    sentence: "Conviene empezar por frases de todos los días, con tiempo para intentar y volver a intentar.",
    focus: "frases de todos los días",
  },
  voice: {
    name: "Encontrando tu voz",
    sentence: "Sabes más inglés del que estás hablando. El siguiente paso es usarlo en una conversación real.",
    focus: "seguir una conversación",
  },
  further: {
    name: "Listo para ir más lejos",
    sentence: "Ya puedes manejar bastante inglés. El siguiente paso es explicar una idea con claridad y sonar más natural.",
    focus: "explicar una idea con claridad",
  },
} as const;

type PictureId = keyof typeof pictures;
type Who = "adults" | "kids";

function shuffle<T>(list: T[], random: () => number) {
  const next = [...list];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [next[index], next[swap]] = [next[swap], next[index]];
  }
  return next;
}

export function readSeen() {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(seenKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function rememberSeen(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    const previous = readSeen().filter(id => !ids.includes(id));
    localStorage.setItem(seenKey, JSON.stringify([...previous, ...ids]));
  } catch {
    // A blocked store should not stop the result from showing.
  }
}

export function drawSitting(seen: string[], random: () => number = Math.random) {
  const take = (band: Band, count: number) => {
    const pool = quizItems.filter(item => item.band === band);
    const seenSet = new Set(seen);
    const unseen = pool.filter(item => !seenSet.has(item.id));
    const oldest: QuizItem[] = [];
    const added = new Set<string>();
    for (const id of seen) {
      if (added.has(id)) continue;
      const item = pool.find(candidate => candidate.id === id);
      if (!item) continue;
      added.add(id);
      oldest.push(item);
    }
    return [...shuffle(unseen, random), ...oldest].slice(0, count);
  };
  return [...take("easy", 2), ...take("mid", 2), ...take("hard", 1)];
}

function pictureFor(sitting: QuizItem[], picks: number[]): PictureId {
  const easyOk = sitting.every((item, index) => item.band !== "easy" || picks[index] === item.answer);
  const hardOk = sitting.every((item, index) => item.band !== "hard" || picks[index] === item.answer);
  if (!easyOk) return "start";
  if (!hardOk) return "voice";
  return "further";
}

function listInSpanish(focuses: string[]) {
  return `${focuses[0]}, ${focuses[1]} y ${focuses[2]}`;
}

function ChoiceList({ choices, onChoose, english = false }: { choices: readonly string[]; onChoose: (index: number) => void; english?: boolean }) {
  return <div className="quiz-choices" lang={english ? "en" : "es"}>{choices.map((choice, index) => <button type="button" key={choice} onClick={() => onChoose(index)}>{choice}</button>)}</div>;
}

export default function PlacementQuiz({ open, onClose, classesHref, wa }: { open: boolean; onClose: () => void; classesHref: (who: Who) => string; wa: (message: string) => string }) {
  const dialog = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const remembered = useRef(false);
  const [phase, setPhase] = useState("who");
  const [who, setWho] = useState<Who | null>(null);
  const [goal, setGoal] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [sitting, setSitting] = useState<QuizItem[]>([]);
  const [picks, setPicks] = useState<number[]>([]);
  const [parentPicks, setParentPicks] = useState<number[]>([]);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const node = dialog.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const focusable = [...node.querySelectorAll<HTMLElement>("button, a[href]")];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById("quiz-title")?.focus();
  }, [open, phase]);

  useEffect(() => {
    if (!open || phase !== "result" || who !== "adults" || remembered.current) return;
    remembered.current = true;
    rememberSeen(sitting.map(item => item.id));
  }, [open, phase, who, sitting]);

  if (!open) return null;

  const adultOrder = ["who", "goal", "item-0", "item-1", "item-2", "item-3", "item-4", "confidence"];
  const parentOrder = ["who", "parent-0", "parent-1", "parent-2", "parent-3"];
  const order = who === "kids" ? parentOrder : adultOrder;
  const stepIndex = Math.max(order.indexOf(phase), 0);
  const onResult = phase === "result";
  const itemIndex = phase.startsWith("item-") ? Number(phase.slice(5)) : -1;
  const parentIndex = phase.startsWith("parent-") ? Number(phase.slice(7)) : -1;
  const item = itemIndex >= 0 ? sitting[itemIndex] : undefined;
  const parent = parentIndex >= 0 ? parentQuestions[parentIndex] : undefined;

  const goBack = () => {
    if (onResult) {
      setPhase(who === "kids" ? `parent-${parentQuestions.length - 1}` : "confidence");
      return;
    }
    if (stepIndex > 0) setPhase(order[stepIndex - 1]);
  };

  const chooseWho = (next: Who) => {
    setWho(next);
    if (next === "adults" && sitting.length === 0) setSitting(drawSitting(readSeen()));
    setPhase(next === "adults" ? "goal" : "parent-0");
  };

  let title = "¿Este quiz es para ti?";
  let englishTitle = false;
  let body: ReactNode = <ChoiceList choices={["Para mí", "Para mi hijo o hija"]} onChoose={index => chooseWho(index === 0 ? "adults" : "kids")} />;
  if (phase === "goal") {
    title = "¿Para qué quieres el inglés?";
    body = <ChoiceList choices={goals.map(option => option.label)} onChoose={index => { setGoal(index); setPhase("item-0"); }} />;
  } else if (item) {
    title = item.prompt;
    englishTitle = true;
    body = <ChoiceList english choices={item.choices} onChoose={index => {
      setPicks(current => { const next = [...current]; next[itemIndex] = index; return next; });
      setPhase(itemIndex < sitting.length - 1 ? `item-${itemIndex + 1}` : "confidence");
    }} />;
  } else if (phase === "confidence") {
    title = "Cuando alguien habla rápido, ¿qué pasa?";
    body = <ChoiceList choices={confidenceOptions.map(option => option.label)} onChoose={index => { setConfidence(index); setPhase("result"); }} />;
  } else if (parent) {
    title = parent.prompt;
    body = <ChoiceList choices={parent.choices.map(option => option.label)} onChoose={index => {
      setParentPicks(current => { const next = [...current]; next[parentIndex] = index; return next; });
      setPhase(parentIndex < parentQuestions.length - 1 ? `parent-${parentIndex + 1}` : "result");
    }} />;
  }

  let result: ReactNode = null;
  if (onResult && who === "adults" && goal !== null && confidence !== null) {
    const picture = pictures[pictureFor(sitting, picks)];
    const focuses = [goals[goal].focus, picture.focus, confidenceOptions[confidence].focus];
    const message = `¡Hola! Hice el quiz del punto de partida. Sugirió ${picture.name}, con atención en ${listInSpanish(focuses)}. Quisiera conversar sobre las clases.`;
    title = picture.name;
    result = <Result focuses={focuses} sentence={picture.sentence} message={message} href={classesHref("adults")} wa={wa} onClose={onClose} note="Un quiz corto, no un certificado. Con cinco preguntas solo se puede dar una idea general, y una respuesta al azar puede cambiarla. La entrevista confirma el punto de partida." />;
  } else if (onResult && who === "kids" && parentPicks.length === parentQuestions.length) {
    const focuses = [1, 2, 3].map(index => parentQuestions[index].choices[parentPicks[index]].focus);
    const message = `¡Hola! Hice el quiz del punto de partida para mi hijo o hija. Sugirió una clase a su medida, con atención en ${listInSpanish(focuses)}. Quisiera conversar sobre las clases.`;
    title = "Una clase a su medida";
    result = <Result focuses={focuses} sentence={`Ahora mismo: ${parentQuestions[0].choices[parentPicks[0]].label.toLowerCase()}. La clase puede partir de ahí, sin un nivel formal.`} message={message} href={classesHref("kids")} wa={wa} onClose={onClose} note="Un quiz corto, no un certificado y no un nivel para tu hijo o hija. La entrevista confirma el punto de partida." />;
  }

  const total = order.length;
  return <div className="quiz-layer" onClick={onClose}>
    <div className="quiz-dialog" role="dialog" aria-modal="true" aria-labelledby="quiz-title" lang="es" ref={dialog} onClick={event => event.stopPropagation()}>
      <div className="quiz-top">
        {phase !== "who" ? <button type="button" className="quiz-back" onClick={goBack}>Atrás</button> : <span />}
        {!onResult && phase !== "who" && <p className="quiz-progress">{stepIndex + 1} de {total}</p>}
        <button type="button" className="quiz-close" onClick={onClose}>Cerrar</button>
      </div>
      <div className="quiz-bar" aria-hidden="true"><span style={{ width: onResult ? "100%" : `${((stepIndex + 1) / total) * 100}%` }} /></div>
      {phase === "who" && <p className="quiz-note">Unos dos minutos. Las preguntas están en inglés y las indicaciones en español. No es un examen. La entrevista confirma el punto de partida.</p>}
      {item && <p className="quiz-direction">Elige la mejor respuesta.</p>}
      <h2 id="quiz-title" lang={englishTitle ? "en" : "es"} tabIndex={-1}>{title}</h2>
      {onResult ? result : <div data-item={item?.id}>{body}</div>}
    </div>
  </div>;
}

function Result({ focuses, sentence, message, href, wa, onClose, note }: { focuses: string[]; sentence: string; message: string; href: string; wa: (message: string) => string; onClose: () => void; note: string }) {
  return <>
    <p>{sentence}</p>
    <ul className="quiz-focuses" aria-label="En qué enfocarse">{focuses.map(focus => <li key={focus}>{focus}</li>)}</ul>
    <p>Las clases se arman en la entrevista. Privadas o en grupo pequeño. Todos los niveles.</p>
    <a className="button primary" href={wa(message)} target="_blank" rel="noreferrer">Enviar por WhatsApp</a>
    <a className="text-link" href={href} onClick={onClose}>Ver clases y precios</a>
    <p className="quiz-note">{note}</p>
  </>;
}
