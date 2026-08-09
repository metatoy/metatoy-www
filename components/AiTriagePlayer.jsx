"use client";

import WalkthroughPlayer from "./WalkthroughPlayer";
import { AI_TRIAGE } from "../lib/walkthroughs/ai-triage";
import * as Scenes from "./walkthrough-scenes/ai-triage/index";

export default function AiTriagePlayer() {
  return <WalkthroughPlayer walkthrough={AI_TRIAGE} scenes={Scenes} />;
}
