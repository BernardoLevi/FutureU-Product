// Mock data for the demo (no backend, no persistence)
window.DEMO = {
  modules: [
    {
      id: "start",
      title: "Start Here: My Goals & Timeline",
      estMinutes: 30,
      lessons: [
        { id: "goals", title: "Set my goals", tasks: [
          { id: "goal-reflection", title: "Write my goals", type: "reflect" },
          { id: "goal-timeline", title: "Outline milestones", type: "submit" },
        ]},
        { id: "support", title: "Build my support team", tasks: [
          { id: "mentor-check", title: "Identify mentors", type: "action" },
          { id: "meeting-plan", title: "Plan check-ins", type: "plan" },
        ]},
      ]
    },
    {
      id: "explore",
      title: "Explore Paths After High School",
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
      title: "Build My College & Alternatives List",
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
      title: "Applications: Essays, Forms & Deadlines",
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
      title: "Paying for College: FAFSA & Scholarships",
      estMinutes: 45,
      lessons: [
        { id: "overview", title: "FAFSA overview", tasks: [
          { id: "create-id", title: "Create FSA ID (simulated)", type: "action" },
        ]},
        { id: "checklist", title: "FAFSA checklist", tasks: [
          { id: "fafsa-check", title: "Checklist ready", type: "submit" },
        ]},
        { id: "scholarships", title: "Scholarship search", tasks: [
          { id: "scholarship-list", title: "List 3 scholarships", type: "submit" },
        ]},
      ]
    },
    {
      id: "decisions",
      title: "Decide & Prepare for What’s Next",
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
    { id: "s001", name: "Jordan Lee", school: "North HS", grade: 12, fafsa: "In progress", plan: "4-year", modulePct: 42 },
    { id: "s002", name: "Avery Patel", school: "Central HS", grade: 12, fafsa: "Not started", plan: "Undecided", modulePct: 15 },
    { id: "s003", name: "Riley Chen", school: "West HS", grade: 11, fafsa: "N/A (11th)", plan: "Trades", modulePct: 8 },
    { id: "s004", name: "Samira Ali", school: "North HS", grade: 12, fafsa: "Submitted", plan: "Work", modulePct: 77 },
    { id: "s005", name: "Diego Martinez", school: "East HS", grade: 12, fafsa: "In progress", plan: "4-year", modulePct: 63 },
    { id: "s006", name: "Priya Desai", school: "Central HS", grade: 11, fafsa: "N/A (11th)", plan: "4-year", modulePct: 11 },
    { id: "s007", name: "Marcus Johnson", school: "South HS", grade: 12, fafsa: "Submitted", plan: "Military", modulePct: 82 },
    { id: "s008", name: "Leah Kim", school: "North HS", grade: 12, fafsa: "Not started", plan: "2-year", modulePct: 34 },
    { id: "s009", name: "Ethan Wright", school: "West HS", grade: 11, fafsa: "N/A (11th)", plan: "Trades", modulePct: 19 },
    { id: "s010", name: "Tessa Nguyen", school: "East HS", grade: 12, fafsa: "Submitted", plan: "4-year", modulePct: 91 },
    { id: "s011", name: "Noah Brooks", school: "Central HS", grade: 11, fafsa: "N/A (11th)", plan: "Undecided", modulePct: 5 },
    { id: "s012", name: "Fatima Rahman", school: "South HS", grade: 12, fafsa: "In progress", plan: "Work", modulePct: 47 },
    { id: "s013", name: "Caleb Rivers", school: "North HS", grade: 12, fafsa: "Submitted", plan: "4-year", modulePct: 74 },
    { id: "s014", name: "Alina Popov", school: "Central HS", grade: 12, fafsa: "Not started", plan: "Gap year", modulePct: 22 },
    { id: "s015", name: "Zoe Carter", school: "East HS", grade: 11, fafsa: "N/A (11th)", plan: "4-year", modulePct: 17 },
    { id: "s016", name: "Imani Washington", school: "West HS", grade: 12, fafsa: "Submitted", plan: "4-year", modulePct: 68 },
    { id: "s017", name: "Mateo Silva", school: "South HS", grade: 11, fafsa: "N/A (11th)", plan: "2-year", modulePct: 13 },
    { id: "s018", name: "Ruby Foster", school: "Central HS", grade: 12, fafsa: "In progress", plan: "Trades", modulePct: 51 },
    { id: "s019", name: "Jamal Owens", school: "North HS", grade: 12, fafsa: "Submitted", plan: "Military", modulePct: 85 },
    { id: "s020", name: "Helena Costa", school: "East HS", grade: 11, fafsa: "N/A (11th)", plan: "Work", modulePct: 9 },
    { id: "s021", name: "Maya Thompson", school: "West HS", grade: 12, fafsa: "Not started", plan: "4-year", modulePct: 27 },
    { id: "s022", name: "Owen Garcia", school: "Central HS", grade: 12, fafsa: "In progress", plan: "4-year", modulePct: 58 },
    { id: "s023", name: "Sofia Morales", school: "South HS", grade: 11, fafsa: "N/A (11th)", plan: "Undecided", modulePct: 12 },
    { id: "s024", name: "Isaac Green", school: "North HS", grade: 12, fafsa: "Submitted", plan: "2-year", modulePct: 79 },
    { id: "s025", name: "Emily Zhao", school: "East HS", grade: 12, fafsa: "In progress", plan: "4-year", modulePct: 44 },
    { id: "s026", name: "Logan Pierce", school: "Central HS", grade: 11, fafsa: "N/A (11th)", plan: "Trades", modulePct: 6 },
    { id: "s027", name: "Chloe Adams", school: "West HS", grade: 12, fafsa: "Submitted", plan: "4-year", modulePct: 88 },
    { id: "s028", name: "Santiago Rivera", school: "South HS", grade: 12, fafsa: "Not started", plan: "Military", modulePct: 31 },
    { id: "s029", name: "Harper Scott", school: "North HS", grade: 11, fafsa: "N/A (11th)", plan: "2-year", modulePct: 14 },
    { id: "s030", name: "Grace Liu", school: "Central HS", grade: 12, fafsa: "Submitted", plan: "4-year", modulePct: 93 },
    { id: "s031", name: "Dylan Baker", school: "East HS", grade: 12, fafsa: "In progress", plan: "Trades", modulePct: 39 },
    { id: "s032", name: "Kiara James", school: "West HS", grade: 11, fafsa: "N/A (11th)", plan: "4-year", modulePct: 7 },
    { id: "s033", name: "Leo Bennett", school: "South HS", grade: 12, fafsa: "Submitted", plan: "Gap year", modulePct: 70 },
    { id: "s034", name: "Amira Hassan", school: "Central HS", grade: 11, fafsa: "N/A (11th)", plan: "Work", modulePct: 10 },
    { id: "s035", name: "Carter Williams", school: "North HS", grade: 12, fafsa: "Not started", plan: "4-year", modulePct: 23 },
    { id: "s036", name: "Valentina Rossi", school: "East HS", grade: 12, fafsa: "Submitted", plan: "2-year", modulePct: 81 },
    { id: "s037", name: "Miles Turner", school: "Central HS", grade: 12, fafsa: "In progress", plan: "Work", modulePct: 55 },
    { id: "s038", name: "Nora Sullivan", school: "West HS", grade: 11, fafsa: "N/A (11th)", plan: "Undecided", modulePct: 18 },
    { id: "s039", name: "Abel Flores", school: "South HS", grade: 12, fafsa: "Submitted", plan: "Trades", modulePct: 76 },
    { id: "s040", name: "Lena Fischer", school: "North HS", grade: 12, fafsa: "Not started", plan: "Gap year", modulePct: 29 },
    { id: "s041", name: "Khalil Walker", school: "Central HS", grade: 11, fafsa: "N/A (11th)", plan: "Military", modulePct: 16 },
    { id: "s042", name: "Ivy Chen", school: "East HS", grade: 12, fafsa: "Submitted", plan: "4-year", modulePct: 89 },
    { id: "s043", name: "Jonas Meyer", school: "West HS", grade: 12, fafsa: "In progress", plan: "2-year", modulePct: 52 },
    { id: "s044", name: "Amani Diallo", school: "South HS", grade: 11, fafsa: "N/A (11th)", plan: "Trades", modulePct: 20 },
    { id: "s045", name: "Camila Ortiz", school: "North HS", grade: 12, fafsa: "Submitted", plan: "4-year", modulePct: 95 },
    { id: "s046", name: "Wyatt Brooks", school: "Central HS", grade: 12, fafsa: "Not started", plan: "Work", modulePct: 33 },
    { id: "s047", name: "Naomi Alvarez", school: "East HS", grade: 11, fafsa: "N/A (11th)", plan: "4-year", modulePct: 21 },
    { id: "s048", name: "Oliver Stone", school: "West HS", grade: 12, fafsa: "In progress", plan: "2-year", modulePct: 46 },
    { id: "s049", name: "Bianca Russo", school: "South HS", grade: 12, fafsa: "Submitted", plan: "4-year", modulePct: 84 },
    { id: "s050", name: "Amari King", school: "Central HS", grade: 11, fafsa: "N/A (11th)", plan: "Gap year", modulePct: 4 }
  ]
};
