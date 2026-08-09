"use client";

/**
 * WalkthroughPlayer — a reusable, animated + narrated feature-walkthrough player.
 * Generalized from sorb-www LifecycleDemo.jsx. Driven entirely by a scene manifest
 * (see lib/walkthroughs/*.js). Pattern spec: spec/metatoy-studio/feature-walkthrough-player.md.
 *
 * Per scene it renders ONE visual, in priority order:
 *   1. scene.lottie  → <DotLottieReact> (lazy-loaded; the production target)
 *   2. scene.scene   → an inline animated-SVG scene component from the `scenes` prop (the pilot's working motion)
 *   3. scene.poster  → a static <img> fallback
 * Plus an optional <audio> VO clip. Pacing is NARRATION-DRIVEN: a scene advances when its
 * audio ends, falling back to scene.durationMs when muted / no clip / reduced-motion.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./WalkthroughPlayer.module.css";

// Lazy + client-only. Never imported unless a scene actually has a .lottie, so the app
// builds fine before @lottiefiles/dotlottie-react is installed (the pilot uses inline scenes).
const DotLottie = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact).catch(() => () => null),
  { ssr: false }
);

const DEFAULT_MS = 8000;

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
const BACK = "M15.5 4.5 8 12l7.5 7.5 1.4-1.4L10.8 12l6.1-6.1z";
const NEXT = "M8.5 4.5 16 12l-7.5 7.5-1.4-1.4L13.2 12 7.1 5.9z";
const PLAY = "M8 5v14l11-7z";
const PAUSE = "M6 5h4v14H6zM14 5h4v14h-4z";
const MUTE = "M4 9v6h4l5 5V4L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z";
const MUTED = "M4 9v6h4l5 5V4L8 9H4zm14 3-1.5-1.5L15 12l1.5 1.5L18 12z";

export default function WalkthroughPlayer({ walkthrough, scenes = {} }) {
  const list = walkthrough.scenes;
  const total = list.length;

  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [muted, setMuted] = useState(true); // start muted (browser autoplay policy); VO is opt-in
  const audioRef = useRef(null);
  const rootRef = useRef(null);

  const scene = list[i];
  const isLast = i === total - 1;
  const hasAudio = Boolean(scene.audio);

  // prefers-reduced-motion: no autoplay, no auto-advance.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      setPlaying(!mq.matches);
    };
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const go = useCallback((n) => setI(() => Math.max(0, Math.min(total - 1, n))), [total]);
  const next = useCallback(() => setI((n) => (n >= total - 1 ? n : n + 1)), [total]);
  const prev = useCallback(() => setI((n) => (n <= 0 ? 0 : n - 1)), []);

  const togglePlay = useCallback(() => {
    setPlaying((p) => {
      if (!p && isLast) setI(0); // replay from top if paused at the end
      return !p;
    });
  }, [isLast]);

  // Load + (optionally) play the VO for the current scene.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    if (playing && !muted && hasAudio) {
      a.play().catch(() => {}); // autoplay may be blocked until a gesture — silent, timer still paces
    } else {
      a.pause();
    }
  }, [i, playing, muted, hasAudio]);

  // Pacing. Narration-driven when audible; else a fixed timer. Nothing auto-advances when
  // paused or reduced-motion. Stops at the last scene.
  useEffect(() => {
    if (!playing || reduced) return;
    const audible = hasAudio && !muted;
    if (audible) return; // the audio 'ended' handler advances instead
    const ms = scene.durationMs || DEFAULT_MS;
    const t = setTimeout(() => {
      if (i >= total - 1) setPlaying(false);
      else setI(i + 1);
    }, ms);
    return () => clearTimeout(t);
  }, [playing, reduced, muted, hasAudio, i, total, scene.durationMs]);

  const onAudioEnded = useCallback(() => {
    if (!playing) return;
    if (i >= total - 1) setPlaying(false);
    else setI(i + 1);
  }, [playing, i, total]);

  function onKeyDown(e) {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    else if (e.key === " " || e.key === "Spacebar") { e.preventDefault(); togglePlay(); }
  }

  const SceneComp = scenes[scene.scene];
  const active = playing && !reduced;

  return (
    <div
      className={styles.player}
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${walkthrough.label} walkthrough`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className={styles.topbar}>
        <p className={styles.topLabel}>{walkthrough.topLabel}</p>
        <button
          type="button"
          className={styles.muteBtn}
          onClick={() => setMuted((m) => !m)}
          aria-pressed={muted}
          aria-label={muted ? "Unmute narration" : "Mute narration"}
          disabled={!hasAudio}
          title={hasAudio ? (muted ? "Unmute narration" : "Mute narration") : "Voice-over coming soon"}
        >
          <Icon d={muted ? MUTED : MUTE} />
        </button>
      </div>

      <div className={styles.stage} aria-live="polite" aria-atomic="true">
        {scene.badge && <span className={styles.badge}>{scene.badge}</span>}
        {scene.money && <span className={styles.moneyTag}>{scene.money === "after" ? "After" : "Before"}</span>}

        {/* keyed → remounts on step change so the entrance transition (and scene motion) replays */}
        <div className={styles.stageVisual} key={scene.id}>
          {scene.lottie ? (
            <DotLottie src={scene.lottie} autoplay={active} loop={false} style={{ width: "100%", height: "100%" }} />
          ) : SceneComp ? (
            <SceneComp active={active} reduced={reduced} />
          ) : scene.poster ? (
            <img className={styles.poster} src={scene.poster} alt={scene.title} />
          ) : null}
        </div>
      </div>

      {/* auto-advance progress — fills over the current step's duration while playing; freezes when
          paused; hidden under reduced-motion (no autoplay). Keyed to restart per step. */}
      <div className={styles.progress} aria-hidden="true">
        {!reduced && (
          <div
            key={`${scene.id}-${i}`}
            className={styles.progressFill}
            style={{
              animationDuration: `${scene.durationMs || DEFAULT_MS}ms`,
              animationPlayState: playing && !(hasAudio && !muted) ? "running" : "paused",
            }}
          />
        )}
      </div>

      {hasAudio && (
        <audio ref={audioRef} src={scene.audio} preload="none" muted={muted} onEnded={onAudioEnded} />
      )}

      <div className={styles.caption} key={`cap-${scene.id}`}>
        <h3 className={styles.captionTitle}>{scene.title}</h3>
        <p className={styles.captionBody}>{scene.body}</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.buttons}>
          <button type="button" className={styles.ctrlBtn} onClick={prev} disabled={i === 0} aria-label="Previous step">
            <Icon d={BACK} />
          </button>
          <button type="button" className={`${styles.ctrlBtn} ${styles.playBtn}`} onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
            <Icon d={playing ? PAUSE : PLAY} />
          </button>
          <button type="button" className={styles.ctrlBtn} onClick={next} disabled={isLast} aria-label="Next step">
            <Icon d={NEXT} />
          </button>
        </div>

        <div className={styles.scrubber}>
          <div className={styles.dots} role="tablist" aria-label="Jump to step">
            {list.map((s, n) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={`Step ${n + 1}: ${s.title}`}
                className={`${styles.dot} ${n === i ? styles.dotActive : ""} ${n < i ? styles.dotDone : ""}`}
                onClick={() => go(n)}
              />
            ))}
          </div>
          <span className={styles.counter}>Step {i + 1} / {total}</span>
        </div>
      </div>
    </div>
  );
}
