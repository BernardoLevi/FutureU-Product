// Mock data for the demo (no backend, no persistence)
window.DEMO = {
  modules: [
    {
      id: "explore",
      title: "Explore options",
      estMinutes: 40,
      lessons: [
        { id: "interests", title: "Identify interests", tasks: [
          { id: "interest-check", title: "Complete interest check", type: "reflect" },
          { id: "programs", title: "Browse 3 programs", type: "read" },
        ]},
        { id: "budget", title: "Affordability basics", tasks: [
          { id: "cost-basics", title: "Cost & aid basics", type: "watch" },
          { id: "afford-reflect", title: "Plan a budget reflection", type: "reflect" },
        ]},
      ]
    },
    {
      id: "list",
      title: "Build a college list",
      estMinutes: 45,
      lessons: [
        { id: "criteria", title: "Define criteria", tasks: [
          { id: "criteria-sheet", title: "Fill criteria checklist", type: "submit" },
        ]},
        { id: "reach-match-safety", title: "Reach/Match/Safety", tasks: [
          { id: "rms-3-3-3", title: "Draft 3/3/3 list", type: "submit" },
        ]},
      ]
    },
    {
      id: "applications",
      title: "Applications",
      estMinutes: 80,
      lessons: [
        { id: "timeline", title: "Timeline & deadlines", tasks: [
          { id: "timeline-build", title: "Build my timeline", type: "submit" },
        ]},
        { id: "essays", title: "Essays drafting", tasks: [
          { id: "essay-draft", title: "Draft personal statement", type: "submit" },
        ]},
      ]
    },
    {
      id: "fafsa",
      title: "Financial aid (FAFSA)",
      estMinutes: 45,
      lessons: [
        { id: "overview", title: "FAFSA overview", tasks: [
          { id: "create-id", title: "Create FSA ID (simulated)", type: "action" },
        ]},
        { id: "checklist", title: "FAFSA checklist", tasks: [
          { id: "fafsa-check", title: "Checklist ready", type: "submit" },
        ]},
      ]
    },
    {
      id: "decisions",
      title: "Decisions & next steps",
      estMinutes: 40,
      lessons: [
        { id: "compare", title: "Compare offers", tasks: [
          { id: "compare-table", title: "Fill comparison table", type: "submit" },
        ]},
      ]
    }
  ],

  // Example cohort for Admin view
  students: [
    { id: "s001", name: "Jordan Lee", school: "North HS", grade: 12, fafsa: "In progress", apps: 2, modulePct: 42 },
    { id: "s002", name: "Avery Patel", school: "Central HS", grade: 12, fafsa: "Not started", apps: 0, modulePct: 15 },
    { id: "s003", name: "Riley Chen", school: "West HS", grade: 11, fafsa: "N/A (11th)", apps: 0, modulePct: 8 },
    { id: "s004", name: "Samira Ali", school: "North HS", grade: 12, fafsa: "Submitted", apps: 4, modulePct: 77 }
  ]
};
