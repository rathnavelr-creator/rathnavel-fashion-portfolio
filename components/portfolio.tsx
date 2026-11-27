"use client";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  AtSign,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type CSSProperties,
} from "react";

const projects = [
  {
    number: "01",
    title: "THREADCOUNT",
    subtitle: "Operator Allocation System",
    type: "Industrial Engineering · Web-based project",
    bullets: [
      "Developed the concept for an IE-based operator allocation system using operation SAM, operator skills, grades and efficiency.",
      "Designed an allocation approach that prioritizes scarce skills and qualified operators.",
      "Built capacity and bottleneck visibility into the allocation approach.",
    ],
    tools: ["Operation SAM", "Skills & grades", "Capacity visibility"],
  },
  {
    number: "02",
    title: "Fabric Shrinkage Detector",
    subtitle: "Low-cost measurement prototype",
    type: "Arduino UNO · HC-SR04 Ultrasonic Sensor",
    bullets: [
      "Built a prototype to measure fabric shrinkage by comparing pre-wash and post-wash distances.",
      "Used an Arduino UNO, HC-SR04 ultrasonic sensor and 4-digit LED display.",
      "Prepared an implementation, monitoring and maintenance plan for more consistent apparel quality-control measurement.",
    ],
    tools: ["Arduino UNO", "HC-SR04", "4-digit LED display"],
  },
  {
    number: "03",
    title: "Long-Sleeve Shirt",
    subtitle: "2D apparel CAD",
    type: "Optitex PDS · Optitex Marker",
    bullets: [
      "Drafted digital template blocks and shell/interlining pattern pieces for a checked shirt.",
      "Graded 14 measurement points across 8 sizes (39–46).",
      "Planned markers at 110 cm fabric width, achieving 86.34% shell and 78.20% interlining efficiency.",
    ],
    tools: ["Digital pattern making", "Grading", "Marker planning"],
  },
  {
    number: "04",
    title: "Trend Threads",
    subtitle: "Fashion magazine · Tech Couture 2026",
    type: "Adobe InDesign · Print media",
    bullets: [
      "Designed a 16-page fashion magazine themed around Tech Couture 2026.",
      "Covered smart textiles, AI design tools, virtual runways and sustainable materials.",
    ],
    tools: ["Adobe InDesign", "Editorial design", "Print media"],
  },
];

type GalleryImage = { src: string; alt: string; width: number; height: number };

const withBasePath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/rathnavel-fashion-portfolio"}${path}`;

const projectGalleries: Record<string, GalleryImage[]> = {
  "02": [
    { src: "/projects/shrinkage/01-final-prototype.jpg", width: 768, height: 576, alt: "Final wooden prototype with Arduino UNO, ultrasonic sensor and 4-digit display" },
    { src: "/projects/shrinkage/02-display.jpg", width: 480, height: 640, alt: "4-digit display mounted on the wooden L-frame above the Arduino" },
    { src: "/projects/shrinkage/03-side-view.jpg", width: 538, height: 717, alt: "Side view of the wooden L-frame prototype" },
    { src: "/projects/shrinkage/04-sensor-wiring.jpg", width: 692, height: 519, alt: "HC-SR04 ultrasonic sensor wired to the Arduino" },
    { src: "/projects/shrinkage/05-front-face.jpg", width: 615, height: 461, alt: "Front face of the final prototype with two sensor openings" },
    { src: "/projects/shrinkage/06-foam-front.jpg", width: 576, height: 768, alt: "Foam board model, front face with two sensor openings" },
    { src: "/projects/shrinkage/07-foam-side.jpg", width: 487, height: 512, alt: "Foam board model, side view of the L-shaped frame" },
    { src: "/projects/shrinkage/08-wood-front.jpg", width: 768, height: 576, alt: "Wooden model, front face with two sensor openings" },
    { src: "/projects/shrinkage/09-wood-side.jpg", width: 513, height: 640, alt: "Wooden model, side view of the L-shaped frame" },
    { src: "/projects/shrinkage/10-circuit-diagram.jpg", width: 767, height: 680, alt: "Circuit diagram of the Arduino UNO, HC-SR04 sensor and 4-digit display" },
  ],
  "03": [
    { src: "/projects/shirt-cad/01-template-dimensions.jpg", width: 998, height: 758, alt: "Template block pattern with measured dimensions in Optitex PDS" },
    { src: "/projects/shirt-cad/02-template-layout.jpg", width: 1140, height: 756, alt: "Template block pieces laid out: back, sleeve, front and collar parts" },
    { src: "/projects/shirt-cad/03-shell-pieces.jpg", width: 1223, height: 744, alt: "All final shell pattern pieces of the shirt" },
    { src: "/projects/shirt-cad/04-sleeve.jpg", width: 719, height: 661, alt: "Shirt sleeve pattern with placket opening and pleat marks" },
    { src: "/projects/shirt-cad/05-front.jpg", width: 682, height: 636, alt: "Front left and front right patterns with chest pocket placement and placket" },
    { src: "/projects/shirt-cad/06-back-yoke.jpg", width: 630, height: 717, alt: "Back and yoke pattern pieces" },
    { src: "/projects/shirt-cad/07-pocket-flap.jpg", width: 720, height: 794, alt: "Pocket and flap pattern pieces" },
    { src: "/projects/shirt-cad/08-cuff.jpg", width: 748, height: 376, alt: "Cuff pattern piece" },
    { src: "/projects/shirt-cad/09-stand-collar.jpg", width: 873, height: 363, alt: "Stand and collar band pattern pieces" },
    { src: "/projects/shirt-cad/10-sleeve-plackets.jpg", width: 557, height: 695, alt: "Sleeve placket pattern pieces" },
    { src: "/projects/shirt-cad/11-measurement-chart.jpg", width: 1500, height: 388, alt: "Measurement chart for sizes 39 to 46 with step values" },
    { src: "/projects/shirt-cad/12-graded-back.jpg", width: 600, height: 660, alt: "Graded back and yoke across sizes 39 to 46" },
    { src: "/projects/shirt-cad/13-graded-front.jpg", width: 699, height: 607, alt: "Graded front pieces and placket" },
    { src: "/projects/shirt-cad/14-graded-plackets.jpg", width: 593, height: 620, alt: "Graded sleeve plackets" },
    { src: "/projects/shirt-cad/15-graded-collar.jpg", width: 1176, height: 348, alt: "Graded stand and collar band" },
    { src: "/projects/shirt-cad/16-graded-cuff-pocket.jpg", width: 1050, height: 593, alt: "Graded cuff, pocket and flap" },
    { src: "/projects/shirt-cad/17-interlining.jpg", width: 1031, height: 864, alt: "Interlining pattern pieces at base size" },
    { src: "/projects/shirt-cad/18-graded-interlining.jpg", width: 1278, height: 845, alt: "Graded interlining pieces" },
    { src: "/projects/shirt-cad/19-shell-marker.jpg", width: 1500, height: 170, alt: "Shell marker at 110 cm width, 86.34% efficiency" },
    { src: "/projects/shirt-cad/20-interlining-marker.jpg", width: 1500, height: 170, alt: "Interlining marker at 110 cm width, 78.20% efficiency" },
  ],
  "04": [
    { src: "/projects/trend-threads/01-cover.jpg", width: 800, height: 1088, alt: "Trend Threads magazine front cover" },
    { src: "/projects/trend-threads/02-page-03.jpg", width: 700, height: 952, alt: "Magazine page 3, full image page" },
    { src: "/projects/trend-threads/03-page-04.jpg", width: 700, height: 952, alt: "Magazine page 4, Tech Couture opener" },
    { src: "/projects/trend-threads/04-page-05.jpg", width: 700, height: 952, alt: "Magazine page 5, the rise of 3D-printed fashion" },
    { src: "/projects/trend-threads/05-page-06.jpg", width: 700, height: 952, alt: "Magazine page 6, 3D-print gallery" },
    { src: "/projects/trend-threads/06-page-07.jpg", width: 700, height: 952, alt: "Magazine page 7, 3D-print gallery" },
    { src: "/projects/trend-threads/07-page-08.jpg", width: 700, height: 952, alt: "Magazine page 8, smart fabrics and wearable technology" },
    { src: "/projects/trend-threads/08-page-09.jpg", width: 700, height: 952, alt: "Magazine page 9, AI in fashion design" },
    { src: "/projects/trend-threads/09-page-10.jpg", width: 700, height: 952, alt: "Magazine page 10, virtual fashion and digital runways" },
    { src: "/projects/trend-threads/10-page-11.jpg", width: 700, height: 952, alt: "Magazine page 11, digital fashion and sustainable innovation" },
    { src: "/projects/trend-threads/11-page-12.jpg", width: 700, height: 952, alt: "Magazine page 12, sustainable materials gallery" },
    { src: "/projects/trend-threads/12-page-13.jpg", width: 700, height: 952, alt: "Magazine page 13, the future of Tech Couture" },
    { src: "/projects/trend-threads/13-page-14.jpg", width: 700, height: 952, alt: "Magazine page 14, LED dress feature" },
    { src: "/projects/trend-threads/14-back-cover.jpg", width: 700, height: 952, alt: "Trend Threads magazine back cover" },
  ],
};

function ImageLoop({ images, label }: { images: GalleryImage[]; label: string }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const pixelsPerSecond = 45;
    const syncSpeed = () => {
      const oneSet = track.scrollWidth / 2;
      if (oneSet > 0) track.style.setProperty("--loop-duration", `${Math.max(oneSet / pixelsPerSecond, 12)}s`);
    };
    syncSpeed();
    const observer = new ResizeObserver(syncSpeed);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="image-loop" role="region" aria-label={label}>
      <div className="image-loop-track" ref={trackRef}>
        {[0, 1].map((copy) => (
          <div className="image-loop-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {images.map((image) => (
              <figure
                className="image-loop-item"
                key={image.src}
                style={{ aspectRatio: `${image.width} / ${image.height}`, "--ratio": image.width / image.height } as CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBasePath(image.src)}
                  alt={copy === 0 ? image.alt : ""}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const tools = [
  "Optitex PDS",
  "Optitex Marker",
  "Arduino UNO",
  "HC-SR04 Ultrasonic Sensor",
  "4-Digit LED Display",
  "7-Segment LED Display",
  "Operation SAM",
  "Adobe InDesign",
  "2D Digital Pattern Making",
  "Grading",
  "Marker Planning",
  "Garment Construction",
  "Operation Breakdown",
  "Production Monitoring",
  "Bottleneck Analysis",
  "Process Improvement",
  "Prototyping",
];

const experience = [
  {
    date: "JUNE 2025",
    role: "Textile Intern",
    company: "Ramakrishna Processing Mills",
    location: "Tiruppur, Tamil Nadu",
    details: [
      "Hands-on exposure to textile processing and manufacturing operations.",
      "Observed dyeing, washing and finishing; studied fabric inspection, shrinkage testing and defect identification.",
    ],
  },
  {
    date: "JUNE 2026",
    role: "Production Intern",
    company: "Aaryan Klothing & Co.",
    location: "Bangalore, Karnataka",
    details: [
      "Practical exposure to apparel production-floor activities and manufacturing processes.",
    ],
  },
  {
    date: "JULY 2026",
    role: "Production Intern",
    company: "Linkup Private Limited",
    location: "Bangalore, Karnataka",
    details: [
      "Worked on operation breakdown and production monitoring.",
      "Observed production flow, supported bottleneck analysis and suggested process-improvement opportunities.",
    ],
  },
];

const skills = [
  {
    title: "Industrial engineering & production",
    items: [
      "Operation Breakdown",
      "Production Monitoring",
      "Bottleneck Analysis",
      "Process Improvement",
    ],
  },
  {
    title: "Apparel & CAD",
    items: [
      "Optitex PDS",
      "Optitex Marker",
      "2D Digital Pattern Making",
      "Grading",
      "Marker Planning",
      "Garment Construction",
    ],
  },
  {
    title: "Technology & design",
    items: [
      "Arduino UNO",
      "HC-SR04 Ultrasonic Sensor",
      "7-Segment LED Display",
      "Prototyping",
      "Adobe InDesign",
    ],
  },
];

const principles = [
  ["01", "Make the process visible", "Production monitoring and bottleneck visibility inform better decisions."],
  ["02", "Put capability first", "Prioritize scarce skills and qualified operators when planning allocation."],
  ["03", "Measure for consistency", "Compare clear before-and-after measurements in quality checks."],
  ["04", "Improve from observation", "Look at the production flow, then identify practical opportunities."],
];

const agents = [
  { name: "Scout", color: "#ff3b2f" },
  { name: "Layout", color: "#f6a623" },
  { name: "Typeset", color: "#eacb46" },
  { name: "Motion", color: "#68d391" },
  { name: "QA", color: "#42c4a1" },
  { name: "Deploy", color: "#54a9ff" },
  { name: "Copy", color: "#8d7cff" },
  { name: "Lint", color: "#ef77aa" },
  { name: "Index", color: "#ff765e" },
  { name: "Render", color: "#a6ce39" },
  { name: "Palette", color: "#41c6df" },
  { name: "Review", color: "#d99bff" },
];

type ActiveBuild = {
  target: HTMLElement;
  agentIndex: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startedAt: number;
  phase: "move" | "inspect" | "reveal";
  rect: DOMRect;
};

type AgentCursorProps = {
  agent: (typeof agents)[number];
  index: number;
  cursorRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  wireRefs: MutableRefObject<Array<HTMLDivElement | null>>;
};

function AgentCursor({ agent, index, cursorRefs, wireRefs }: AgentCursorProps) {
  return (
    <>
      <div
        className="agent-cursor"
        data-agent-index={index}
        ref={(node) => {
          cursorRefs.current[index] = node;
        }}
        style={{ "--agent-color": agent.color } as CSSProperties & { "--agent-color": string }}
        aria-hidden="true"
      >
        <svg className="cursor-arrow" viewBox="0 0 18 24" fill="none">
          <path d="M2 2L15.5 14.2L9.1 14.8L6.6 21L2 2Z" fill={agent.color} stroke="#09090b" strokeWidth="1.5" />
        </svg>
        <span className="agent-tag">
          <span className="robot-head">
            <i />
            <i />
            <b />
          </span>
          {agent.name}
        </span>
      </div>
      <div
        className="blueprint-box"
        ref={(node) => {
          wireRefs.current[index] = node;
        }}
        aria-hidden="true"
      >
        <span>{agent.name.toUpperCase()}</span>
        <i className="corner tl" />
        <i className="corner tr" />
        <i className="corner bl" />
        <i className="corner br" />
      </div>
    </>
  );
}

function getAgentsSetting() {
  const query = new URLSearchParams(window.location.search).get("agents");
  if (query === "on") return true;
  if (query === "off") return false;
  try {
    if (localStorage.getItem("portfolio-agents") === "off") return false;
  } catch {
    // Continue with the motion preference when storage is unavailable.
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeTour(progress: number) {
  if (progress < 0.12) return 0.12 * Math.pow(progress / 0.12, 2);
  if (progress > 0.84) {
    const tail = (progress - 0.84) / 0.16;
    return 0.12 + 0.72 + 0.16 * (1 - Math.pow(1 - tail, 2));
  }
  return 0.12 + ((progress - 0.12) / 0.72) * 0.72;
}

export default function Portfolio() {
  const [agentsEnabled, setAgentsEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [booting, setBooting] = useState(true);
  const targetsRef = useRef<HTMLElement[]>([]);
  const queueRef = useRef<HTMLElement[]>([]);
  const activeRef = useRef<Array<ActiveBuild | null>>(Array(6).fill(null));
  const nextAgentRef = useRef(0);
  const cursorRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wireRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pausedRef = useRef(false);
  const enabledRef = useRef(false);
  const bootedRef = useRef(false);
  const touringRef = useRef(false);
  const tourStartedAtRef = useRef<number | null>(null);
  const tourStartYRef = useRef(0);
  const tourEndYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const scheduleBuildRef = useRef<(target: HTMLElement) => void>(() => {});

  const markBuilt = useCallback((target: HTMLElement, animate = false) => {
    if (target.classList.contains("is-built")) return;
    target.classList.add("is-built");
    if (animate) {
      const length = Math.max(12, (target.textContent || "").trim().length);
      target.style.setProperty("--build-steps", String(length));
      target.classList.add(`build-${target.dataset.build || "pop"}`);
      window.setTimeout(() => {
        target.classList.remove(`build-${target.dataset.build || "pop"}`);
      }, 1100);
    }
  }, []);

  const revealEverything = useCallback(() => {
    queueRef.current = [];
    activeRef.current = Array(6).fill(null);
    targetsRef.current.forEach((target) => markBuilt(target));
    wireRefs.current.forEach((wire) => {
      if (wire) wire.style.opacity = "0";
    });
    cursorRefs.current.forEach((cursor) => cursor?.classList.remove("cursor-active"));
  }, [markBuilt]);

  const setAgents = useCallback(
    (enabled: boolean, persist = true) => {
      const wasEnabled = enabledRef.current;
      enabledRef.current = enabled;
      setAgentsEnabled(enabled);
      document.documentElement.classList.toggle("build-mode", enabled);
      if (persist) {
        try {
          localStorage.setItem("portfolio-agents", enabled ? "on" : "off");
        } catch {
          // The control still works for this page view if storage is unavailable.
        }
      }
    if (!enabled) {
      revealEverything();
    } else if (!wasEnabled) {
      queueRef.current = [];
      activeRef.current = Array(6).fill(null);
      targetsRef.current.forEach((target) => {
        target.classList.remove("is-built", "build-type", "build-pop", "build-wipe");
        target.style.removeProperty("--build-steps");
        const rect = target.getBoundingClientRect();
        if (rect.bottom < 0) {
          target.classList.add("is-built");
        } else if (rect.top < window.innerHeight && rect.bottom > 0) {
          scheduleBuildRef.current(target);
        }
      });
    }                      // <-- ADDED: closes the "else if" block
    },
    [revealEverything],    // <-- FIXED: removed the stray "(" before [
  );

  const stopTour = useCallback(() => {
    if (!touringRef.current) return;
    touringRef.current = false;
    tourStartedAtRef.current = null;
    try {
      sessionStorage.removeItem("portfolio-tour");
    } catch {
      // The URL flag is also removed when the tour ends.
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("tour");
    if (url.searchParams.get("agents") === "on") url.searchParams.delete("agents");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const startTour = useCallback(() => {
    try {
      sessionStorage.setItem("portfolio-tour", "1");
    } catch {
      // The tour query parameter remains the fallback.
    }
    const url = new URL(window.location.href);
    url.searchParams.set("tour", "1");
    url.searchParams.set("agents", "on");
    window.location.assign(url.toString());
  }, []);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-build]"),
    );
    targetsRef.current = targets;
    const enabled = getAgentsSetting();
    enabledRef.current = enabled;
    setAgentsEnabled(enabled);
    document.documentElement.classList.toggle("build-mode", enabled);

    if (!enabled) revealEverything();

    const sortQueue = () => {
      queueRef.current.sort((a, b) => {
        const relation = a.compareDocumentPosition(b);
        return relation & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : relation & Node.DOCUMENT_POSITION_PRECEDING
            ? 1
            : 0;
      });
    };

    scheduleBuildRef.current = (target) => {
      if (!enabledRef.current || target.classList.contains("is-built")) return;
      if (!queueRef.current.includes(target)) {
        queueRef.current.push(target);
        sortQueue();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const relation = a.target.compareDocumentPosition(b.target);
            return relation & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
          })
          .forEach((entry) => {
            scheduleBuildRef.current(entry.target as HTMLElement);
          });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.01 },
    );
    targets.forEach((target) => observer.observe(target));

    const bootTimer = window.setTimeout(() => {
      bootedRef.current = true;
      setBooting(false);
    }, 700);

    const tourParam = new URLSearchParams(window.location.search).get("tour");
    let savedTour = false;
    try {
      savedTour = sessionStorage.getItem("portfolio-tour") === "1";
    } catch {
      savedTour = false;
    }
    if (tourParam === "1" || savedTour) {
      touringRef.current = true;
      enabledRef.current = true;
      setAgentsEnabled(true);
      document.documentElement.classList.add("build-mode");
    }

    const buildPassedTargets = () => {
      targetsRef.current.forEach((target) => {
        if (target.classList.contains("is-built")) return;
        if (target.getBoundingClientRect().bottom < 0) {
          markBuilt(target);
          queueRef.current = queueRef.current.filter((item) => item !== target);
          activeRef.current = activeRef.current.map((active, index) => {
            if (active?.target !== target) return active;
            const wire = wireRefs.current[active.agentIndex];
            if (wire) wire.style.opacity = "0";
            cursorRefs.current[active.agentIndex]?.classList.remove("cursor-active");
            return null;
          });
        }
      });
    };

    const onUserScroll = () => buildPassedTargets();
    const onUserInput = (event: Event) => {
      if (!touringRef.current) return;
      if (event.type === "keydown") {
        const key = (event as KeyboardEvent).key;
        if (key !== "Escape" && !["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(key)) return;
      }
      stopTour();
    };
    const onKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        stopTour();
        return;
      }
      if (event.target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
      if (event.key.toLowerCase() === "t") startTour();
      if (event.key.toLowerCase() === "a") setAgents(!enabledRef.current);
      if (event.key.toLowerCase() === "p") {
        pausedRef.current = !pausedRef.current;
        setPaused(pausedRef.current);
      }
    };
    window.addEventListener("scroll", onUserScroll, { passive: true });
    window.addEventListener("wheel", onUserInput, { passive: true });
    window.addEventListener("touchstart", onUserInput, { passive: true });
    window.addEventListener("pointerdown", onUserInput, { passive: true });
    window.addEventListener("keydown", onUserInput);
    window.addEventListener("keydown", onKeys);

    const tick = (now: number) => {
      if (enabledRef.current && bootedRef.current && !pausedRef.current) {
        activeRef.current.forEach((active, index) => {
          if (!active) {
            const target = queueRef.current.shift();
            if (!target) return;
            const rect = target.getBoundingClientRect();
            const agentCount = window.innerWidth <= 700 ? 6 : agents.length;
            const agentIndex = nextAgentRef.current++ % agentCount;
            const cursor = cursorRefs.current[agentIndex];
            const cursorRect = cursor?.getBoundingClientRect();
            const startX = cursorRect ? cursorRect.left : window.innerWidth / 2;
            const startY = cursorRect ? cursorRect.top : window.innerHeight / 2;
            const endX = Math.max(8, Math.min(window.innerWidth - 26, rect.left + rect.width * 0.56));
            const endY = Math.max(8, Math.min(window.innerHeight - 38, rect.top + Math.min(rect.height / 2, 48)));
            activeRef.current[index] = {
              target,
              agentIndex,
              startX,
              startY,
              endX,
              endY,
              startedAt: now,
              phase: "move",
              rect,
            };
            cursor?.classList.add("cursor-active");
          }

          const current = activeRef.current[index];
          if (!current) return;
          const elapsed = now - current.startedAt;
          const cursor = cursorRefs.current[current.agentIndex];
          const wire = wireRefs.current[current.agentIndex];
          if (current.phase === "move") {
            const t = Math.min(1, elapsed / 780);
            const eased = 1 - Math.pow(1 - t, 3);
            const x = current.startX + (current.endX - current.startX) * eased;
            const y = current.startY + (current.endY - current.startY) * eased;
            cursor?.style.setProperty("--cursor-x", `${x}px`);
            cursor?.style.setProperty("--cursor-y", `${y}px`);
            if (t >= 1) {
              current.phase = "inspect";
              current.startedAt = now;
              current.rect = current.target.getBoundingClientRect();
              if (wire) {
                wire.style.left = `${current.rect.left}px`;
                wire.style.top = `${current.rect.top}px`;
                wire.style.width = `${current.rect.width}px`;
                wire.style.height = `${current.rect.height}px`;
                wire.style.opacity = "1";
              }
            }
          } else if (current.phase === "inspect" && elapsed >= 360) {
            current.phase = "reveal";
            current.startedAt = now;
            markBuilt(current.target, true);
            if (wire) wire.style.opacity = "0";
          } else if (current.phase === "reveal" && elapsed >= 360) {
            cursor?.classList.remove("cursor-active");
            activeRef.current[index] = null;
          }
        });
      }

      if (touringRef.current && !pausedRef.current) {
        const heroTargets = targetsRef.current.filter(
          (target) =>
            target.closest(".hero") &&
            !target.matches(".hero-scroll") &&
            !target.closest(".hero-stats") &&
            target.getBoundingClientRect().bottom > 0 &&
            target.getBoundingClientRect().top < window.innerHeight,
        );
        const heroReady = heroTargets.every((target) => target.classList.contains("is-built"));
        if (heroReady && bootedRef.current && tourStartedAtRef.current === null) {
          tourStartedAtRef.current = now + 500;
          tourStartYRef.current = window.scrollY;
          tourEndYRef.current = Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight,
          );
        }
        if (tourStartedAtRef.current !== null && now >= tourStartedAtRef.current) {
          const elapsed = now - tourStartedAtRef.current;
          const duration = 24000;
          const progress = Math.min(1, elapsed / duration);
          window.scrollTo(0, tourStartYRef.current + (tourEndYRef.current - tourStartYRef.current) * easeTour(progress));
          if (progress >= 1) stopTour();
        }
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(bootTimer);
      observer.disconnect();
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onUserScroll);
      window.removeEventListener("wheel", onUserInput);
      window.removeEventListener("touchstart", onUserInput);
      window.removeEventListener("pointerdown", onUserInput);
      window.removeEventListener("keydown", onUserInput);
      window.removeEventListener("keydown", onKeys);
    };
  }, [markBuilt, revealEverything, setAgents, startTour, stopTour]);

  const toggleAgents = () => setAgents(!agentsEnabled);
  const togglePaused = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };

  return (
    <>
      {booting && (
        <div className="boot-loader" aria-label="Preparing portfolio">
          <span className="boot-mark">RR</span>
          <span className="boot-track"><i /></span>
          <span className="boot-caption">ASSEMBLING THE DETAILS</span>
        </div>
      )}

      <div className="site-shell">
        <header className="topbar">
          <a className="monogram" href="#top" aria-label="Rathnavel R home">RR<span>.</span></a>
          <nav aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#record">Record</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="top">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-wordmark" data-build="wipe" aria-hidden="true">PORTFOLIO</div>
            <div className="hero-image-wrap" data-build="pop">
              <div className="hero-image-glow" />
              <Image
                src={withBasePath("/headshot.png")}
                alt="Portrait of Rathnavel R"
                width={1122}
                height={1402}
                priority
                className="hero-image"
                sizes="(max-width: 700px) 90vw, 48vw"
              />
            </div>

            <div className="hero-copy">
              <p className="brush-intro" data-build="type">Hello, I&apos;m</p>
              <h1 id="hero-title" data-build="wipe">Rathnavel R</h1>
              <p className="hero-role" data-build="type">Fashion Technology Student</p>
              <p className="hero-bio" data-build="type">
                Final-year Fashion Technology student interested in Industrial Engineering and Merchandising.
              </p>
              <div className="hero-actions" data-build="pop">
                <a className="button button-primary" href="#work">View work <ArrowDownRight size={16} /></a>
                <span className="location-label"><span className="location-dot" /> Based in Erode, India</span>
              </div>
            </div>

            <div className="hero-stats" aria-label="Portfolio highlights">
              <p className="eyebrow" data-build="type">A few numbers</p>
              <div className="hero-stat" data-build="pop"><strong>03</strong><span>Internships</span></div>
              <div className="hero-stat" data-build="pop"><strong>04</strong><span>Selected projects</span></div>
              <div className="hero-stat" data-build="pop"><strong>08</strong><span>Sizes graded</span></div>
            </div>

            <a className="hero-scroll" href="#work" aria-label="Scroll to selected work" data-build="type">
              <span>SCROLL TO EXPLORE</span><ArrowDown size={14} />
            </a>
          </section>

          <section id="work" className="section work-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow" data-build="type">01 / Selected work</p>
                <h2 data-build="wipe">Work that ships<span>.</span></h2>
                <p className="section-intro" data-build="type">A mix of industrial engineering, apparel technology and design.</p>
              </div>
              <div className="work-metrics">
                <div data-build="pop"><strong>14</strong><span>measurement points</span></div>
                <div data-build="pop"><strong>86.34<span>%</span></strong><span>shell efficiency</span></div>
                <div data-build="pop"><strong>16</strong><span>magazine pages</span></div>
              </div>
            </div>

            <div className="project-list">
              {projects.map((project) => (
                <article className="project-card" key={project.number} data-build="pop">
                  <div className="project-index">{project.number}</div>
                  <div className="project-main">
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <ul>
                      {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                    <div className="chip-row">
                      {project.tools.map((tool) => <span className="chip" key={tool}>{tool}</span>)}
                    </div>
                    {projectGalleries[project.number] && (
                      <ImageLoop images={projectGalleries[project.number]} label={`${project.title} project images`} />
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="stack-section" aria-labelledby="stack-title">
            <div className="stack-heading">
              <p className="eyebrow" data-build="type">02 / Tools &amp; practice</p>
              <h2 id="stack-title" data-build="wipe">The working <span>stack</span></h2>
            </div>
            <div className="marquee" data-build="wipe">
              <div className="marquee-track">
                {[...tools, ...tools].map((tool, index) => (
                  <span className="marquee-item" key={`${tool}-${index}`}>
                    <i />{tool}
                  </span>
                ))}
              </div>
            </div>
            <p className="stack-caption" data-build="type">Tools and capabilities named in my resume. Hover to pause.</p>
          </section>

          <section id="record" className="section record-section">
            <div className="section-heading record-heading">
              <div>
                <p className="eyebrow" data-build="type">03 / The record</p>
                <h2 data-build="wipe">Learning by <span>doing.</span></h2>
              </div>
              <p className="record-note" data-build="type">Experience, practice and study — each one connected to how things are made.</p>
            </div>
            <div className="record-layout">
              <div className="timeline">
                {experience.map((item, index) => (
                  <article className="timeline-item" key={item.company} data-build="pop">
                    <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
                    <div className="timeline-content">
                      <p className="timeline-date">{item.date}</p>
                      <h3>{item.role}</h3>
                      <p className="timeline-company">{item.company} <span>·</span> {item.location}</p>
                      <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="education-card" data-build="pop">
                <p className="eyebrow">EDUCATION</p>
                <div className="education-mark">N<span>·</span>IFT</div>
                <h3>Bachelor of Fashion Technology</h3>
                <p>National Institute of Fashion Technology</p>
                <p className="education-place">Kannur, Kerala</p>
                <div className="education-foot">
                  <span>Final year</span>
                  <span>Expected graduation · 2027</span>
                </div>
                <div className="coursework">
                  <span>Relevant coursework</span>
                  <p>Industrial Engineering, Apparel Production, Merchandising, 2D Apparel CAD, Pattern Making &amp; Garment Construction, Smart Textiles &amp; IoT.</p>
                </div>
              </aside>
            </div>
          </section>

          <section id="about" className="section about-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow" data-build="type">04 / A little about me</p>
                <h2 data-build="wipe">Made to <span>make.</span></h2>
              </div>
            </div>
            <div className="about-copy">
              <p data-build="type">I&apos;m a final-year Fashion Technology student with internship exposure across textile processing and apparel production. My academic and practical work has taken me through operation breakdown, production monitoring, bottleneck analysis, digital pattern making and garment construction.</p>
              <p data-build="type">I&apos;m interested in Industrial Engineering and Merchandising, especially where thoughtful measurement and a clear view of the production floor can support better decisions and more consistent processes.</p>
            </div>
            <div className="skills-grid">
              {skills.map((group) => (
                <article className="skill-group" key={group.title} data-build="pop">
                  <p className="eyebrow">{group.title}</p>
                  <ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className="principles-heading" data-build="type">
              <p className="eyebrow">A few principles I work by</p>
              <span>GROUNDED IN MY PROJECTS &amp; EXPERIENCE</span>
            </div>
            <div className="principles-grid">
              {principles.map(([number, title, description]) => (
                <article className="principle" key={number} data-build="pop">
                  <span className="principle-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="contact-section">
            <div className="contact-kicker" data-build="type"><AtSign size={14} /> 05 / Say hello</div>
            <div className="contact-card" data-build="wipe">
              <div className="contact-glow" />
              <div className="contact-content">
                <p className="eyebrow">HAVE A PROJECT OR AN OPPORTUNITY?</p>
                <h2>Let&apos;s make<br /><span>something matter.</span></h2>
                <p className="contact-description">I&apos;m interested in Industrial Engineering and Merchandising.</p>
                <a className="button button-primary contact-button" href="mailto:rathnavelrajasekar82@gmail.com">
                  Get in touch <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="contact-graphic" aria-hidden="true"><Sparkles size={110} strokeWidth={0.7} /></div>
              <div className="contact-card-index">R / PORTFOLIO</div>
            </div>
            <div className="contact-links">
              <a href="mailto:rathnavelrajasekar82@gmail.com" data-build="type">
                <span><AtSign size={14} /> EMAIL</span>
                <strong>rathnavelrajasekar82@gmail.com <ArrowUpRight size={15} /></strong>
              </a>
              <a href="https://www.linkedin.com/in/rathnavel-rajasekar-75bb38294" target="_blank" rel="noreferrer" data-build="type">
                <span><Radio size={14} /> LINKEDIN</span>
                <strong>Connect with me <ArrowUpRight size={15} /></strong>
              </a>
            </div>
          </section>
        </main>

        <footer className="footer">
          <a className="monogram" href="#top" aria-label="Back to top">RR<span>.</span></a>
          <p>Rathnavel R <span>·</span> Fashion Technology</p>
          <a href="#top" className="back-top">BACK TO TOP <ArrowUpRight size={13} /></a>
        </footer>
      </div>

      <div className="agent-layer" aria-hidden="true">
        {agents.map((agent, index) => (
          <AgentCursor
            key={agent.name}
            agent={agent}
            index={index}
            cursorRefs={cursorRefs}
            wireRefs={wireRefs}
          />
        ))}
      </div>

      <div className="control-dock" aria-label="Portfolio animation controls">
        <span className="dock-status"><span className={agentsEnabled ? "status-live" : ""} /> {agentsEnabled ? "BUILD MODE" : "READY"}</span>
        <span className="dock-divider" />
        <button type="button" onClick={togglePaused} disabled={!agentsEnabled} aria-pressed={paused} title="Pause or resume the build (P)">
          {paused ? <Play size={13} /> : <Pause size={13} />} {paused ? "Resume" : "Pause"} <kbd>P</kbd>
        </button>
        <button type="button" onClick={toggleAgents} aria-pressed={agentsEnabled} title="Turn agents on or off (A)">
          <span className={`agent-toggle ${agentsEnabled ? "enabled" : ""}`} /> Agents <kbd>A</kbd>
        </button>
        <button type="button" onClick={startTour} title="Reload and start the guided tour (T)">
          <RotateCcw size={13} /> Tour <kbd>T</kbd>
        </button>
      </div>
    </>
  );
}
