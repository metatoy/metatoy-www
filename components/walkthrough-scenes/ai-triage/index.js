// Barrel for the "AI Support Triage" walkthrough's inline animated-SVG scenes
// (investigative-agent arc). Keys must match the `scene` field in the manifest
// (lib/walkthroughs/ai-triage.js) exactly — <WalkthroughPlayer> resolves the current
// step as `scenes[scene.scene]`.

import { Land } from "./Land";
import { Hypothesis } from "./Hypothesis";
import { Investigation } from "./Investigation";
import { Resource } from "./Resource";
import { Draft } from "./Draft";
import { Approve } from "./Approve";
import { Resolve } from "./Resolve";
import { Learn } from "./Learn";

export {
  Land as land,
  Hypothesis as hypothesis,
  Investigation as investigation,
  Resource as resource,
  Draft as draft,
  Approve as approve,
  Resolve as resolve,
  Learn as learn,
};
