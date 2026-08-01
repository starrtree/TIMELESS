"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const models = {
  logo: "https://res.cloudinary.com/r9c7da2l/image/upload/v1784309344/TL_FlatSurcaceLogo_adr1l2.glb",
  dumbbell:
    "https://res.cloudinary.com/r9c7da2l/image/upload/v1784963849/Meshy_AI_Neon_Chrome_Dumbbell_0725071458_texture-optimized_suhrfb.glb",
  microphone:
    "https://res.cloudinary.com/r9c7da2l/image/upload/v1784963850/Meshy_AI_Timeless_No_Limit_Mic_0725071521_texture-optimized_wkqlnk.glb",
  hourglass:
    "https://res.cloudinary.com/r9c7da2l/image/upload/v1784963849/Meshy_AI_Shattered_Time_0725071529_texture-optimized_whyrwm.glb",
  calendar:
    "https://res.cloudinary.com/r9c7da2l/image/upload/v1784963849/Meshy_AI_Neon_Calendar_0725071453_texture-optimized_jow0oz.glb",
  media:
    "https://res.cloudinary.com/r9c7da2l/image/upload/v1784963849/Meshy_AI_Prismatic_Play_Button_0725071446_texture-optimized_pckblb.glb",
  merch:
    "https://res.cloudinary.com/r9c7da2l/image/upload/v1784963849/Meshy_AI_Neon_78L_Hoodie_0725071556_texture-optimized_kocyg3.glb",
  plate:
    "https://res.cloudinary.com/r9c7da2l/image/upload/v1784963849/Meshy_AI_Purple_Glow_45_LB_Wei_0725071535_texture-optimized_doqbm2.glb",
  paintball:
    "https://res.cloudinary.com/r9c7da2l/image/upload/v1784963850/Meshy_AI_Timeless_Neon_Marker_0725071545_texture-optimized_l0fhvj.glb",
  snowboard:
    "https://res.cloudinary.com/r9c7da2l/image/upload/v1784963850/Meshy_AI_Timeless_No_Limit_0725071504_texture-optimized_mbdqrw.glb",
  cups:
    "https://res.cloudinary.com/r9c7da2l/image/upload/v1784963850/Meshy_AI_Timeless_No_Limit_Cup_0725071514_texture-optimized_vkujbe.glb",
};

function Model({
  src,
  label,
  className = "",
  orbit = "0deg 75deg 105%",
  onLoad,
  onClick,
  loading = "lazy",
}: {
  src: string;
  label: string;
  className?: string;
  orbit?: string;
  onLoad?: () => void;
  onClick?: () => void;
  loading?: "auto" | "lazy" | "eager";
}) {
  const [isClicking, setIsClicking] = useState(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    setIsClicking(true);
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => setIsClicking(false), 420);
    onClick?.();
  };

  return (
    <model-viewer
      src={src}
      alt={label}
      class={`${className}${isClicking ? " is-clicking" : ""}`}
      camera-orbit={orbit}
      disable-pan
      interaction-prompt="none"
      shadow-intensity="1"
      environment-image="neutral"
      exposure="1.15"
      onLoad={onLoad}
      onClick={handleClick}
      loading={loading}
    />
  );
}

function InfinityMark({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "infinity-mark small" : "infinity-mark"} aria-hidden="true">
      ∞
    </span>
  );
}

function ExperienceCard({
  number,
  kicker,
  title,
  description,
  model,
  label,
  tone,
  orbit,
  onOpen,
}: {
  number: string;
  kicker: string;
  title: string;
  description: string;
  model: string;
  label: string;
  tone: "violet" | "ember" | "prism" | "midnight";
  orbit: string;
  onOpen: () => void;
}) {
  return (
    <article className={`experience-card ${tone}`}>
      <div className="experience-topline">
        <span>{number}</span>
        <span>{kicker}</span>
      </div>
      <div className="experience-model-wrap">
        <span className="model-fallback" aria-hidden="true">∞</span>
        <Model
          src={model}
          label={label}
          className="experience-model"
          orbit={orbit}
          onClick={onOpen}
        />
      </div>
      <div className="experience-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modelsReady, setModelsReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [introActivated, setIntroActivated] = useState(false);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const heroMotionRef = useRef<HTMLDivElement>(null);
  const introAudioRef = useRef<HTMLAudioElement>(null);

  const popWindows: Record<string, { eyebrow: string; title: string; detail: string; action: string; target: string }> = {
    strength: { eyebrow: "01 / TRAIN", title: "STRENGTH LAB", detail: "Training sessions built around consistency, pressure, and becoming harder to break.", action: "Explore training", target: "#experiences" },
    sound: { eyebrow: "04 / SOUND", title: "THE SOUNDROOM", detail: "Music, artists, and late-night moments carrying the frequency of the collective.", action: "Open media", target: "#media" },
    transmute: { eyebrow: "00 / TIME", title: "TRANSMUTE", detail: "The core principle: turn every setback, rep, risk, and celebration into momentum.", action: "Meet TLC", target: "#collective" },
    train: { eyebrow: "01 / EXPERIENCE", title: "STRENGTH, REDEFINED", detail: "The training lane is where discipline becomes your foundation.", action: "View upcoming energy", target: "#events" },
    explore: { eyebrow: "02 / EXPERIENCE", title: "MOVE PAST COMFORT", detail: "Outdoor challenges and new terrain made to expand your definition of possible.", action: "See the adventure lane", target: "#experiences" },
    compete: { eyebrow: "03 / EXPERIENCE", title: "PRESSURE CREATES CLARITY", detail: "Competition, play, and the moments where instincts take over.", action: "Enter the arena", target: "#experiences" },
    connect: { eyebrow: "04 / EXPERIENCE", title: "MAKE THE MOMENT LIVE", detail: "Community energy, celebrations, and stories that become part of the legacy.", action: "Join the collective", target: "#join" },
    calendar: { eyebrow: "03 / UPCOMING", title: "TIMELESS EVENTS", detail: "Wellness resets, adventures, live experiences, and the next collective chapter.", action: "See upcoming energy", target: "#events" },
    media: { eyebrow: "04 / MEDIA", title: "CULTURE IN MOTION", detail: "The visual archive: music, stories, performances, and raw behind-the-scenes energy.", action: "Explore media", target: "#media" },
    merch: { eyebrow: "05 / THE UNIFORM", title: "WEAR THE FREQUENCY", detail: "Every drop carries the symbol, the signal, and the reminder that energy sets the limit.", action: "Get drop access", target: "#join" },
    logo: { eyebrow: "TIMELESS NO LIMIT", title: "THE PORTAL IS OPEN", detail: "No beginning. No end. Step into a collective for movement, culture, sound, and energy.", action: "Start the journey", target: "#collective" },
  };

  useEffect(() => {
    if (!introActivated) return;
    const timer = window.setTimeout(() => setIntroComplete(true), 12000);
    return () => window.clearTimeout(timer);
  }, [introActivated]);

  useEffect(() => {
    const audio = introAudioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  useEffect(() => {
    let active = true;
    const canvas = document.createElement("canvas");
    let webglAvailable = false;

    try {
      webglAvailable = Boolean(
        canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }),
      );
    } catch {
      webglAvailable = false;
    }

    if (!webglAvailable) {
      return () => {
        active = false;
      };
    }

    import("@google/model-viewer").then(() => {
      if (active) setModelsReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const setHeroTilt = (x: number, y: number) => {
      const target = heroMotionRef.current;
      if (!target) return;
      target.style.setProperty("--hero-tilt-x", `${Math.max(-4, Math.min(4, y * 4))}deg`);
      target.style.setProperty("--hero-tilt-y", `${Math.max(-5, Math.min(5, x * 5))}deg`);
      target.style.setProperty("--hero-shift-x", `${x * 10}px`);
      target.style.setProperty("--hero-shift-y", `${y * 8}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      setHeroTilt((event.clientX / window.innerWidth - 0.5) * 2, (event.clientY / window.innerHeight - 0.5) * 2);
    };

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) return;
      setHeroTilt(Math.max(-1, Math.min(1, event.gamma / 28)), Math.max(-1, Math.min(1, (event.beta - 45) / 32)));
    };

    const requestGyro = () => {
      const orientation = DeviceOrientationEvent as typeof DeviceOrientationEvent & { requestPermission?: () => Promise<"granted" | "denied"> };
      if (!orientation.requestPermission) return;
      orientation.requestPermission().catch(() => undefined);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("deviceorientation", onOrientation, { passive: true });
    window.addEventListener("touchend", requestGyro, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("touchend", requestGyro);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const currentWindow = activeWindow ? popWindows[activeWindow] : null;
  const startIntro = () => {
    const audio = introAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    }
    setIntroActivated(true);
  };
  const skipIntro = () => {
    const audio = introAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIntroComplete(true);
  };

  return (
    <main className="site-shell">
      <audio
        ref={introAudioRef}
        src="/audio/timeless-intro-soundtrack.mp3"
        preload="auto"
      />
      {!introComplete && (
        <section className={introActivated ? "time-warp-intro is-traveling" : "time-warp-intro"} aria-label="Timeless No Limit intro animation">
          <div className="warp-field" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ "--angle": `${index * 15}deg`, "--delay": `${-(index % 8) * 0.11}s` } as CSSProperties} />)}</div>
          <div className="warp-vortex" aria-hidden="true"><b /><b /><b /><b /><b /><b /></div>
          <div className="warp-core" aria-hidden="true" />
          <div className="intro-flash" aria-hidden="true" />
          <div className="intro-hourglass-stage">
            {modelsReady ? <Model src={models.hourglass} label="Shattered Timeless hourglass" className="intro-hourglass-model" orbit="0deg 75deg 100%" loading="eager" /> : <div className="intro-hourglass-fallback" aria-hidden="true"><b /><i /><em /></div>}
            <span className="shard shard-one" aria-hidden="true" />
            <span className="shard shard-two" aria-hidden="true" />
            <span className="shard shard-three" aria-hidden="true" />
            <span className="shard shard-four" aria-hidden="true" />
          </div>
          {!introActivated && <button className="intro-hourglass-trigger" type="button" onClick={startIntro} aria-label="Start the Timeless No Limit time travel intro"><span>TAP THE HOURGLASS TO BEGIN</span></button>}
          <div className="intro-loader" aria-hidden="true">
            <span>SYNCING WITH TIME</span>
            <i><b /></i>
          </div>
          <div className="intro-logo-stage">
            <div className="intro-logo-aura" aria-hidden="true" />
            <div className="launch-light ultraviolet" aria-hidden="true" />
            <div className="launch-light orange" aria-hidden="true" />
            {modelsReady ? <Model src={models.logo} label="Timeless No Limit logo" className="intro-logo-model" orbit="0deg 76deg 95%" loading="eager" /> : <div className="intro-type-logo">T∞L</div>}
          </div>
          <p className="intro-signal">TIME BREAKS. ENERGY MOVES.</p>
          <button className="intro-skip" type="button" onClick={skipIntro}>Skip intro</button>
        </section>
      )}
      <div className="fixed-cosmos" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />

      <header className="site-header">
        <a className="nav-brand" href="#home" aria-label="Timeless No Limit home">
          <span className="mini-logo">T∞L</span>
          <span className="nav-wordmark">
            TIMELESS
            <small>NO LIMIT</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Primary navigation">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#collective" onClick={closeMenu}>Collective</a>
          <a href="#experiences" onClick={closeMenu}>Experiences</a>
          <a href="#media" onClick={closeMenu}>Media</a>
          <a href="#merch" onClick={closeMenu}>Merch</a>
        </nav>

        <a className="nav-cta" href="#join">
          Join the movement
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section id="home" className="hero" aria-labelledby="hero-title">
        <div className="hero-side-label left" aria-hidden="true">
          <span>BODY</span>
          <i />
          <span>MIND</span>
        </div>
        <div className="hero-side-label right" aria-hidden="true">
          <span>ENERGY</span>
          <i />
          <span>SPIRIT</span>
        </div>

        <div className="hero-orbit orbit-left">
          <span className="orbit-label">STRENGTH</span>
          {modelsReady && (
            <Model
              src={models.dumbbell}
              label="Neon chrome Timeless No Limit dumbbell"
              className="floating-model dumbbell-model"
              orbit="-35deg 72deg 115%"
              onClick={() => setActiveWindow("strength")}
              loading="eager"
            />
          )}
        </div>
        <div className="hero-orbit orbit-right">
          <span className="orbit-label">SOUND</span>
          {modelsReady && (
            <Model
              src={models.microphone}
              label="Timeless No Limit microphone"
              className="floating-model mic-model"
              orbit="25deg 75deg 115%"
              onClick={() => setActiveWindow("sound")}
              loading="eager"
            />
          )}
        </div>
        <div className="hero-orbit orbit-bottom">
          <span className="orbit-label">TRANSMUTE</span>
          {modelsReady && (
            <Model
              src={models.hourglass}
              label="Shattered Timeless No Limit hourglass"
              className="floating-model hourglass-model"
              orbit="15deg 76deg 110%"
              onClick={() => setActiveWindow("transmute")}
              loading="eager"
            />
          )}
        </div>

        <div className="hero-content">
          <p className="eyebrow">
            <span>Health</span>
            <i />
            <span>Wellness</span>
            <i />
            <span>Entertainment</span>
          </p>

          <div className="hero-logo-wrap">
            <div className="hero-logo-float">
              <div className="hero-logo-tilt" ref={heroMotionRef}>
                <div className="logo-aura" aria-hidden="true" />
                {modelsReady ? (
                  <Model
                    src={models.logo}
                    label="Timeless No Limit T infinity L logo"
                    className="hero-model"
                    orbit="0deg 77deg 92%"
                    onClick={() => setActiveWindow("logo")}
                    loading="eager"
                  />
                ) : (
                  <div className="model-loading" aria-label="Loading Timeless No Limit logo" />
                )}
              </div>
            </div>
          </div>

          <div className="hero-copy">
            <p className="hero-kicker">THE TIME IS NOW</p>
            <h1 id="hero-title">
              <span>TIMELESS</span>
              <small>NO LIMIT</small>
            </h1>
            <p className="hero-tagline">TRANSMUTE YOUR ENERGY</p>
            <p className="hero-intro">
              A collective built to strengthen the body, expand the mind, and
              elevate the spirit through movement, music, and unforgettable experiences.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#experiences">
                Explore the experience
                <span aria-hidden="true">↘</span>
              </a>
              <a className="button button-ghost" href="#collective">
                Discover TLC
              </a>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="signal">
            <span />
            <span />
            <span />
            <span />
          </div>
          <p>SCROLL TO TRANSMUTE</p>
          <div className="hero-status">
            <span className="status-dot" />
            <span>THE COLLECTIVE IS ACTIVE</span>
          </div>
        </div>
      </section>

      <section id="collective" className="intro-strip" aria-labelledby="collective-title">
        <div className="intro-number">01</div>
        <div className="intro-copy">
          <p className="section-label">THE TIMELESS COLLECTIVE</p>
          <h2 id="collective-title">
            NO BEGINNING.
            <br />
            <span>NO END.</span>
          </h2>
        </div>
        <p className="intro-statement">
          TLC is where discipline meets expression. We build stronger people and
          louder moments, connecting wellness, culture, adventure, and sound in
          one limitless ecosystem.
        </p>
        <div className="pillar-list" aria-label="Timeless pillars">
          <span>BODY</span>
          <InfinityMark small />
          <span>MIND</span>
          <InfinityMark small />
          <span>SPIRIT</span>
        </div>
      </section>

      <section id="experiences" className="experiences-section" aria-labelledby="experiences-title">
        <div className="section-heading">
          <div>
            <p className="section-label">02 / THE EXPERIENCE</p>
            <h2 id="experiences-title">
              EVERY LANE.
              <br />
              <span>ONE ENERGY.</span>
            </h2>
          </div>
          <p>
            Timeless is not one thing. It is the choice to keep moving across
            every arena: training, adventure, competition, culture, and connection.
          </p>
        </div>

        <div className="experience-grid">
          <ExperienceCard
            number="01"
            kicker="TRAIN"
            title="Strength, redefined."
            description="Build the body with intention. Discipline becomes the foundation for everything after it."
            model={models.plate}
            label="Purple glow Timeless 45 pound weight plate"
            tone="violet"
            orbit="-20deg 66deg 112%"
            onOpen={() => setActiveWindow("train")}
          />
          <ExperienceCard
            number="02"
            kicker="EXPLORE"
            title="Move past comfort."
            description="Adventure resets the mind. New terrain, new pressure, new proof that your limits can move."
            model={models.snowboard}
            label="Timeless No Limit snowboard"
            tone="prism"
            orbit="20deg 72deg 118%"
            onOpen={() => setActiveWindow("explore")}
          />
          <ExperienceCard
            number="03"
            kicker="COMPETE"
            title="Pressure creates clarity."
            description="Play hard, think fast, and sharpen the instincts that only show up when the moment gets real."
            model={models.paintball}
            label="Timeless neon paintball marker"
            tone="midnight"
            orbit="-30deg 72deg 125%"
            onOpen={() => setActiveWindow("compete")}
          />
          <ExperienceCard
            number="04"
            kicker="CONNECT"
            title="Make the moment live."
            description="The movement is built together: energy, celebration, and stories worth remembering."
            model={models.cups}
            label="Stack of Timeless No Limit purple cups"
            tone="ember"
            orbit="25deg 68deg 116%"
            onOpen={() => setActiveWindow("connect")}
          />
        </div>
      </section>

      <section id="events" className="calendar-section" aria-labelledby="calendar-title">
        <div className="calendar-visual">
          <div className="calendar-rings" aria-hidden="true" />
          <span className="model-fallback large" aria-hidden="true">∞</span>
          <Model
            src={models.calendar}
            label="Timeless No Limit neon calendar"
            className="calendar-model"
            orbit="-10deg 72deg 110%"
            onClick={() => setActiveWindow("calendar")}
          />
        </div>
        <div className="calendar-content">
          <p className="section-label">03 / UPCOMING ENERGY</p>
          <h2 id="calendar-title">
            SHOW UP.
            <br />
            <span>SHIFT SOMETHING.</span>
          </h2>
          <p className="calendar-intro">
            Training sessions, outdoor challenges, creative drops, and collective
            experiences designed to leave you stronger than you arrived.
          </p>
          <div className="event-list">
            <div className="event-row">
              <span className="event-index">01</span>
              <div>
                <strong>WELLNESS + MOVEMENT</strong>
                <small>BODY / MIND / RESET</small>
              </div>
              <span className="event-status">DATES DROPPING SOON</span>
            </div>
            <div className="event-row">
              <span className="event-index">02</span>
              <div>
                <strong>TIMELESS ADVENTURES</strong>
                <small>OUTDOOR / COMPETE / CONNECT</small>
              </div>
              <span className="event-status">SEASONAL</span>
            </div>
            <div className="event-row">
              <span className="event-index">03</span>
              <div>
                <strong>LIVE EXPERIENCES</strong>
                <small>MUSIC / CULTURE / ENERGY</small>
              </div>
              <span className="event-status">ANNOUNCING NEXT</span>
            </div>
          </div>
          <a className="text-link" href="#join">
            Get first access <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section id="media" className="media-section" aria-labelledby="media-title">
        <div className="media-heading">
          <p className="section-label">04 / TIMELESS MEDIA</p>
          <h2 id="media-title">THE CULTURE IN MOTION.</h2>
          <p>
            Music, visual stories, training, and the unfiltered moments that
            turn a collective into a legacy.
          </p>
        </div>
        <button
          className="media-stage"
          type="button"
          aria-label="Open Timeless media channels"
          onClick={() => setActiveWindow("media")}
        >
          <div className="media-line left" aria-hidden="true" />
          <div className="media-line right" aria-hidden="true" />
          <div className="play-model-wrap">
            <span className="model-fallback media-fallback" aria-hidden="true">▶</span>
            <Model
              src={models.media}
              label="Prismatic Timeless play button"
              className="play-model"
              orbit="-16deg 70deg 100%"
            />
            <div className="media-logo-decal" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/timeless-media-logo.jpeg" alt="" />
            </div>
          </div>
          <div className="mic-stage">
            <span className="vertical-caption">THE SOUND OF THE MOVEMENT</span>
            <Model
              src={models.microphone}
              label="Timeless No Limit microphone"
              className="stage-mic-model"
              orbit="25deg 72deg 112%"
            />
          </div>
          <div className="media-chapters" aria-label="Timeless media chapters">
            <span>01 / MUSIC</span>
            <span>02 / VISUALS</span>
            <span>03 / STORIES</span>
            <span>04 / CULTURE</span>
          </div>
        </button>
        <div className="media-socials" aria-label="Timeless media channels">
          <a
            className="media-social-link instagram"
            href="https://www.instagram.com/timeless_nolimit/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="social-platform-icon" aria-hidden="true">◎</span>
            <span>
              <strong>Instagram</strong>
              <small>@timeless_nolimit</small>
            </span>
          </a>
          <div className="media-social-link twitch is-pending" aria-label="Timeless Twitch link coming soon">
            <span className="social-platform-icon" aria-hidden="true">◧</span>
            <span>
              <strong>Twitch</strong>
              <small>Link coming</small>
            </span>
          </div>
          <div className="media-social-link youtube is-pending" aria-label="Timeless YouTube link coming soon">
            <span className="social-platform-icon" aria-hidden="true">▶</span>
            <span>
              <strong>YouTube</strong>
              <small>Link coming</small>
            </span>
          </div>
        </div>
      </section>

      <section id="merch" className="merch-section" aria-labelledby="merch-title">
        <div className="merch-copy">
          <p className="section-label">05 / THE UNIFORM</p>
          <h2 id="merch-title">
            WEAR THE
            <br />
            <span>FREQUENCY.</span>
          </h2>
          <p>
            More than merch. Every piece carries the symbol, the signal, and the
            reminder that your energy sets the limit.
          </p>
          <a className="button button-primary" href="#join">
            Get drop access <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="merch-visual">
          <div className="merch-orbit-text" aria-hidden="true">
            TIMELESS • NO LIMIT • TRANSMUTE YOUR ENERGY •
          </div>
          <span className="model-fallback large" aria-hidden="true">T∞L</span>
          <Model
            src={models.merch}
            label="Timeless hoodie, watch, and chain collection"
            className="merch-model"
            orbit="-20deg 72deg 112%"
            onClick={() => setActiveWindow("merch")}
          />
        </div>
      </section>

      <section id="join" className="join-section" aria-labelledby="join-title">
        <div className="join-hourglass" aria-hidden="true">
          <Model
            src={models.hourglass}
            label="Shattered hourglass"
            className="join-hourglass-model"
            orbit="10deg 73deg 118%"
          />
        </div>
        <div className="join-inner">
          <p className="section-label">06 / THE COLLECTIVE</p>
          <h2 id="join-title">
            BUILT DIFFERENT.
            <br />
            <span>MOVING FOREVER.</span>
          </h2>
          <p>
            Follow the signal for experience announcements, wellness drops,
            music, merch, and the next chapter of TIMELESS.
          </p>
          <div className="join-actions">
            <span className="social-handle">@TIMELESSNOLIMIT</span>
            <a className="button button-light" href="#home">
              Return to the beginning <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-mark">
          <span>T∞L</span>
          <div>
            <strong>TIMELESS NO LIMIT</strong>
            <small>TRANSMUTE YOUR ENERGY</small>
          </div>
        </div>
        <p>HEALTH • WELLNESS • ENTERTAINMENT • MUSIC</p>
        <span>© 2026 TIMELESS COLLECTIVE</span>
      </footer>
      {currentWindow && (
        <div className="model-window-backdrop" role="presentation" onClick={() => setActiveWindow(null)}>
          <section className={`model-window${activeWindow === "media" ? " media-window" : ""}`} role="dialog" aria-modal="true" aria-labelledby="model-window-title" onClick={(event) => event.stopPropagation()}>
            <button className="window-close" type="button" aria-label="Close window" onClick={() => setActiveWindow(null)}>×</button>
            <p>{currentWindow.eyebrow}</p>
            <h2 id="model-window-title">{currentWindow.title}</h2>
            {activeWindow !== "media" && <span className="window-infinity" aria-hidden="true">∞</span>}
            <div className="window-rule" />
            <strong>{currentWindow.detail}</strong>
            {activeWindow === "media" ? (
              <div className="window-media-brand">
                <div className="window-media-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/timeless-media-logo.jpeg" alt="Timeless No Limit media logo" />
                </div>
                <div className="window-media-links">
                  <a href="https://www.instagram.com/timeless_nolimit/" target="_blank" rel="noreferrer">
                    <span className="social-platform-icon" aria-hidden="true">◎</span>
                    Instagram
                  </a>
                  <span className="window-media-pending">
                    <span className="social-platform-icon" aria-hidden="true">◧</span>
                    Twitch
                    <small>Link coming</small>
                  </span>
                  <span className="window-media-pending">
                    <span className="social-platform-icon" aria-hidden="true">▶</span>
                    YouTube
                    <small>Link coming</small>
                  </span>
                </div>
              </div>
            ) : (
              <a href={currentWindow.target} onClick={() => setActiveWindow(null)}>{currentWindow.action} <span aria-hidden="true">↘</span></a>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
