export interface Project {
  id?: string | undefined;
  function: string;
  owner: string;
  project_name: string;
  description: string;
  impact_score: string;
}

export const projectsSeed: Project[] = [
  {
    function: "sales",
    owner: "John Smith",
    project_name: "AI cross sell opportunity E...",
    description:
      "Use AI to analyse customer usage, contract history and engage...",
    impact_score: "8/10",
  },
  {
    function: "sales",
    owner: "John Smith",
    project_name: "AI lead scoring & routing",
    description:
      "Use AI to score inbound/outbound leads using ICP fit, intent and...",
    impact_score: "4/10",
  },
  {
    function: "sales",
    owner: "John Smith",
    project_name: "AI dynamic pricing assist...",
    description:
      "Use AI to recommend pricing bands and discount guardrails usi...",
    impact_score: "6/10",
  },
  {
    function: "sales",
    owner: "John Smith",
    project_name: "AI deal risk & forecast coa...",
    description:
      "Use AI to flag at-risk deals and recommend next actions based...",
    impact_score: "6/10",
  },
  {
    function: "marketing",
    owner: "Ann Brown",
    project_name: "AI content repurposing en...",
    description:
      "Use AI to repurpose webinars/whitepapers into blogs, emails an...",
    impact_score: "8/10",
  },
  {
    function: "marketing",
    owner: "Ann Brown",
    project_name: "AI paid media optimizer",
    description: "Use AI to analyse paid performance and recommend budget a...",
    impact_score: "4/10",
  },
  {
    function: "marketing",
    owner: "Ann Brown",
    project_name: "AI attribution & journey ins...",
    description:
      "Use AI to reconcile multi-touch journeys and attribute pipeline t...",
    impact_score: "6/10",
  },
  {
    function: "marketing",
    owner: "Ann Brown",
    project_name: "AI brand & competitor sig...",
    description:
      "Use AI to monitor sentiment, competitor moves and market sign...",
    impact_score: "6/10",
  },
  {
    function: "product",
    owner: "Priya Khan",
    project_name: "AI feature request triage",
    description:
      "Use AI to cluster feature requests from tickets and calls, tag the...",
    impact_score: "8/10",
  },
  {
    function: "product",
    owner: "Priya Khan",
    project_name: "AI spec drafting assissiant",
    description:
      "Use AI to draft PRDs from templates using inputs and relevant p...",
    impact_score: "4/10",
  },
  {
    function: "product",
    owner: "Priya Khan",
    project_name: "AI release note generator",
    description:
      "Use AI to generate customer-facing release notes from Jira cha...",
    impact_score: "6/10",
  },
  {
    function: "product",
    owner: "Priya Khan",
    project_name: "AI UX insight monitor",
    description:
      "Use AI to analyse usability tests and notes to identify recurring U...",
    impact_score: "6/10",
  },
  {
    function: "foundation",
    owner: "CTO",
    project_name: "Enterprise AI platform layer",
    description: "Use AI to speed up the time it takes to generate proposal",
    impact_score: "8/10",
  },
  {
    function: "foundation",
    owner: "CTO",
    project_name: "Central data layer moder...",
    description:
      "Build secure enterprise AI layer with logging and access control.",
    impact_score: "4/10",
  },
  {
    function: "foundation",
    owner: "CTO",
    project_name: "Enterprise RAG knowledge...",
    description: "Consolidate CRM, finance and ops data into warehouse.",
    impact_score: "6/10",
  },
  {
    function: "foundation",
    owner: "CTO",
    project_name: "AI agent orchestration lay...",
    description:
      "Deploy enterprise retrieval layer for secure knowledge search.",
    impact_score: "6/10",
  },
  {
    function: "ai_projects",
    owner: "HR Director",
    project_name: "AI literacy & L&D program",
    description:
      "Build internal orchestration framework for multi-step AI agents.",
    impact_score: "8/10",
  },
  {
    function: "ai_projects",
    owner: "Mike Giles",
    project_name: "AI use policy draft rollout",
    description: "Use AI to speed up the time it takes to generate proposal",
    impact_score: "4/10",
  },
  {
    function: "ai_projects",
    owner: "CTO",
    project_name: "AI literacy & L&D program",
    description:
      "Roll out structured AI training across leadership and operational...",
    impact_score: "6/10",
  },
  {
    function: "ai_projects",
    owner: "Data Leads",
    project_name: "Model risk & governance l...",
    description:
      "Create company-wide AI Use Policy covering data usage, mod...",
    impact_score: "6/10",
  },
];
