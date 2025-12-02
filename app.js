// Demo SPA with hash-based routing. No persistence.

const AppState = {
  // ephemeral UI-only state: completed tasks during this session
  completed: new Set(), // keys like `${moduleId}::${lessonId}::${taskId}`
};

// DOM helpers
const $app = document.getElementById("app");
const $year = document.getElementById("year");
if ($year) $year.textContent = new Date().getFullYear();
const $menuBtn = document.getElementById("menuBtn");
const $nav = document.getElementById("mainNav");
$menuBtn?.addEventListener("click", ()=> $nav.classList.toggle("open"));
$nav?.addEventListener("click", (e)=> { if(e.target.tagName==="A") $nav.classList.remove("open"); });
document.querySelectorAll("a.to-top").forEach(a=>{
  a.addEventListener("click",(e)=>{ e.preventDefault(); window.scrollTo({ top:0, behavior:"smooth" });});
});

// Reset demo state
document.getElementById("resetDemo")?.addEventListener("click", ()=>{
  AppState.completed.clear();
  routeTo(location.hash || "#/");
});

// Router
window.addEventListener("hashchange", ()=> routeTo(location.hash));
window.addEventListener("DOMContentLoaded", ()=> routeTo(location.hash || "#/"));

function routeTo(hash){
  const path = (hash || "#/").replace(/^#/, "");
  const [_, seg1, seg2, seg3] = path.split("/"); // '' , 'student' / 'module' / 'task' etc.

  // highlight nav
  document.querySelectorAll("#mainNav a").forEach(a=>{
    a.classList.toggle("active", a.getAttribute("href") === `#/${seg1 ?? ""}`);
    if(!seg1 && a.getAttribute("href")==="#/") a.classList.add("active");
  });

  if (!seg1 || seg1 === "") return renderHome();
  if (seg1 === "student") return renderStudentDashboard();
  if (seg1 === "module" && seg2) return renderModule(seg2);
  if (seg1 === "task" && seg2 && seg3) return renderTask(seg2, seg3);
  if (seg1 === "admin") {
    if (seg2 === "student" && seg3) return renderAdminStudent(seg3);
    return renderAdmin();
  }
  return renderNotFound();
}

// Views
function renderHome(){
  $app.innerHTML = `
    <section class="section">
      <div class="card">
        <h1>FutureU - the ultimate college prep for your school</h1>
        <p class="muted">Navigate the experience as a student or as an admin. This is a front-end only demo - no login, no data retention. Feel free to complete the modules in your order of preference</p>
        <div class="mt-1">
          <a class="btn primary" href="#/student">I’m a Student</a>
          <a class="btn outline" href="#/admin">I’m an Admin</a>
        </div>
      </div>

      <div class="grid-3 mt-2">
        <div class="card kpi">
          <span class="value">5</span>
          <span class="label">Modules</span>
        </div>
        <div class="card kpi">
          <span class="value">${DEMO.students.length}</span>
          <span class="label">Mock students</span>
        </div>
        <div class="card kpi">
          <span class="value">0</span>
          <span class="label">Data stored</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="grid-2">
        <div class="card">
          <h2>Student flow</h2>
          <p>Dashboard → Module → Task. Press “Mark as done” to simulate a submission. Progress bars update in this session only.</p>
          <a class="btn" href="#/student">Open student dashboard →</a>
        </div>
        <div class="card">
          <h2>Admin view</h2>
          <p>See a district-level snapshot with mock data. Export a CSV generated on the fly.</p>
          <a class="btn" href="#/admin">Open admin portal →</a>
        </div>
      </div>
    </section>
  `;
}

function renderStudentDashboard(){
  const modules = DEMO.modules;
  const cards = modules.map(m=>{
    const totals = countModuleProgress(m);
    const pct = totals.total ? Math.round((totals.done/totals.total)*100) : 0;
    return `
      <div class="card">
        <h3>${m.title}</h3>
        <p class="muted">${m.estMinutes} min · ${totals.done}/${totals.total} tasks complete</p>
        <div class="progress mt-1"><span style="width:${pct}%"></span></div>
        <div class="mt-1">
          <a class="btn" href="#/module/${m.id}">Continue</a>
        </div>
      </div>
    `;
  }).join("");

  $app.innerHTML = `
    <nav class="breadcrumbs"><a href="#/">Home</a> › Student</nav>
    <h1>Student dashboard</h1>
    <p class="muted">Pick a module to continue. Use “Reset demo” to start over.</p>
    <div class="grid-3 mt-2">${cards}</div>
  `;
}

function renderModule(moduleId){
  const mod = DEMO.modules.find(m=>m.id===moduleId);
  if(!mod) return renderNotFound();

  const lessons = mod.lessons.map(l=>{
    const totals = countLessonProgress(mod.id, l);
    const pct = totals.total ? Math.round((totals.done/totals.total)*100) : 0;
    const tasks = l.tasks.map(t=>{
      const key = keyFor(mod.id, l.id, t.id);
      const done = AppState.completed.has(key);
      return `
        <li>
          <span>${t.title}</span>
          <span class="badge">${t.type}</span>
          <a class="btn small ${done?'outline':''}" href="#/task/${mod.id}/${t.id}">
            ${done ? 'Review' : 'Open'}
          </a>
        </li>
      `;
    }).join("");

    return `
      <div class="card">
        <h3>${l.title}</h3>
        <div class="progress mt-1"><span style="width:${pct}%"></span></div>
        <ul class="lesson-tasks mt-1">${tasks}</ul>
      </div>
    `;
  }).join("");

  $app.innerHTML = `
    <nav class="breadcrumbs"><a href="#/">Home</a> › <a href="#/student">Student</a> › ${mod.title}</nav>
    <h1>${mod.title}</h1>
    <p class="muted">${mod.estMinutes} min estimated</p>
    <div class="grid-2 mt-2">${lessons}</div>
  `;
  // quick styling for list
  document.querySelectorAll(".lesson-tasks").forEach(ul=>{
    ul.style.listStyle = "none"; ul.style.padding = "0"; ul.style.margin = "0";
    ul.querySelectorAll("li").forEach(li=>{
      li.style.display = "flex"; li.style.justifyContent="space-between"; li.style.alignItems="center";
      li.style.padding = ".35rem 0"; li.style.gap = ".5rem";
    });
  });
}

function renderTask(moduleId, taskId){
  const mod = DEMO.modules.find(m=>m.id===moduleId);
  if(!mod) return renderNotFound();
  const { lesson, task } = findTask(mod, taskId) || {};
  if(!lesson || !task) return renderNotFound();

  const key = keyFor(mod.id, lesson.id, task.id);
  const isDone = AppState.completed.has(key);
  const showGoalVideo = mod.id === "start" && task.id === "goal-reflection";

  const metaLine = showGoalVideo ? "" : `<p class="muted">${task.type.toUpperCase()} · Part of “${lesson.title}”</p>`;
  const goalVideoModal = showGoalVideo ? `
      <div class="modal-overlay open" id="goalVideoModal" role="dialog" aria-modal="true" aria-label="Goal setting video">
        <div class="modal card">
          <button class="modal-close" id="closeGoalVideo" aria-label="Close video">×</button>
          <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/qtg-7bqWx5g" title="Goal setting video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
      </div>
  ` : "";

  const goalVideoCta = showGoalVideo ? `
      <div class="inline-banner">
        <div>
          <p class="muted">Watch this quick video to spark ideas before you write.</p>
        </div>
        <button class="btn small" id="openGoalVideo">Open video again</button>
      </div>
  ` : "";

  const goalVideoEmbed = showGoalVideo ? `
      <div class="section">
        <h3>Goal-setting video</h3>
        <p class="muted">Keep the video handy below after closing the pop up.</p>
        <div class="video-wrapper">
          <iframe src="https://www.youtube.com/embed/qtg-7bqWx5g" title="Goal setting video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div>
  ` : "";

  $app.innerHTML = `
    <nav class="breadcrumbs"><a href="#/">Home</a> › <a href="#/student">Student</a> › <a href="#/module/${mod.id}">${mod.title}</a> › ${task.title}</nav>
    <div class="card">
      <h1>${task.title}</h1>
      ${metaLine}

      ${goalVideoModal}
      ${goalVideoCta}

      ${goalVideoEmbed}

      <div class="section">
        <h3>Instructions</h3>
        <p>${instructionsFor(task.type)}</p>
      </div>

      <div class="mt-1">
        <button id="markDone" class="btn ${isDone?'outline':''}">${isDone?'Marked as done':'Mark as done'}</button>
        <a class="btn" href="#/module/${mod.id}">Back to module</a>
      </div>
    </div>
  `;

  document.getElementById("markDone")?.addEventListener("click", ()=>{
    if(AppState.completed.has(key)){ AppState.completed.delete(key); }
    else { AppState.completed.add(key); }
    routeTo(`#/task/${moduleId}/${taskId}`);
  });

  if(showGoalVideo){
    const modal = document.getElementById("goalVideoModal");
    const closeBtn = document.getElementById("closeGoalVideo");
    const openBtn = document.getElementById("openGoalVideo");
    const openModal = ()=> modal?.classList.add("open");
    const closeModal = ()=> modal?.classList.remove("open");

    closeBtn?.addEventListener("click", closeModal);
    openBtn?.addEventListener("click", openModal);
    modal?.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });
  }
}

function renderAdmin(){
  // KPIs (mock rollups)
  const total = DEMO.students.length;
  const avgPct = Math.round(DEMO.students.reduce((s,x)=>s+(x.modulePct||0),0)/total);
  const fafsaSubmitted = DEMO.students.filter(s=>String(s.fafsa).toLowerCase()==="submitted").length;

  const rows = DEMO.students.map(s=>`
    <tr>
      <td><a href="#/admin/student/${s.id}">${s.name}</a></td>
      <td>${s.school}</td>
      <td>${s.grade}</td>
      <td><div class="progress"><span style="width:${clampPct(s.modulePct)}%"></span></div></td>
      <td>${s.fafsa}</td>
      <td>${s.plan}</td>
    </tr>
  `).join("");

  $app.innerHTML = `
    <nav class="breadcrumbs"><a href="#/">Home</a> › Admin</nav>
    <h1>District overview</h1>
    <p class="muted">Mock data. Generate and download a CSV anytime.</p>

    <div class="grid-3 mt-2">
      <div class="card kpi"><span class="value">${total}</span><span class="label">Students</span></div>
      <div class="card kpi"><span class="value">${avgPct}%</span><span class="label">Avg module progress</span></div>
      <div class="card kpi"><span class="value">${fafsaSubmitted}</span><span class="label">FAFSA submitted</span></div>
    </div>

    <div class="card mt-2">
      <div class="mt-1" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap">
        <h2 style="margin:0">Student table</h2>
        <div>
          <button id="exportCsv" class="btn small">Export CSV</button>
        </div>
      </div>
      <div class="mt-1" style="overflow:auto">
        <table class="table">
          <thead>
            <tr><th>Name</th><th>School</th><th>Grade</th><th>Module %</th><th>FAFSA</th><th>Postsecondary plan</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("exportCsv")?.addEventListener("click", ()=>{
    const csvRows = DEMO.students.map(s=>({
      id: s.id, name: s.name, school: s.school, grade: s.grade,
      module_percent: clampPct(s.modulePct), fafsa_status: s.fafsa, postsecondary_plan: s.plan
    }));
    const blob = toCSV(csvRows);
    downloadBlob(blob, "futureu-demo-students.csv");
  });
}

function renderAdminStudent(studentId){
  const s = DEMO.students.find(x=>x.id===studentId);
  if(!s) return renderNotFound();

  $app.innerHTML = `
    <nav class="breadcrumbs">
      <a href="#/">Home</a> › <a href="#/admin">Admin</a> › ${s.name}
    </nav>
    <h1>${s.name} <span class="badge">Grade ${s.grade}</span></h1>
    <p class="muted">${s.school}</p>

    <div class="grid-2 mt-2">
      <div class="card">
        <h3>Milestones</h3>
        <ul class="bullets">
          <li>FAFSA: <strong>${s.fafsa}</strong></li>
          <li>Postsecondary plan: <strong>${s.plan}</strong></li>
          <li>Module progress:</li>
        </ul>
        <div class="progress"><span style="width:${clampPct(s.modulePct)}%"></span></div>
      </div>

      <div class="card">
        <h3>Timeline (sample)</h3>
        <ul class="bullets">
          <li>Exploration module started</li>
          <li>College list saved</li>
          <li>FAFSA status updated</li>
        </ul>
      </div>
    </div>

    <div class="mt-2">
      <a class="btn" href="#/admin">Back to overview</a>
    </div>
  `;
}

function renderNotFound(){
  $app.innerHTML = `
    <div class="card">
      <h1>Page not found</h1>
      <p class="muted">Use the navigation above to continue.</p>
      <a class="btn" href="#/">Go home</a>
    </div>
  `;
}

// Helpers
function keyFor(mId, lId, tId){ return `${mId}::${lId}::${tId}`; }

function countModuleProgress(mod){
  let total = 0, done = 0;
  mod.lessons.forEach(l=>{
    l.tasks.forEach(t=>{
      total++;
      if(AppState.completed.has(keyFor(mod.id, l.id, t.id))) done++;
    });
  });
  return { total, done };
}
function countLessonProgress(moduleId, lesson){
  let total = 0, done = 0;
  lesson.tasks.forEach(t=>{
    total++;
    if(AppState.completed.has(keyFor(moduleId, lesson.id, t.id))) done++;
  });
  return { total, done };
}
function findTask(mod, taskId){
  for(const l of mod.lessons){
    const t = l.tasks.find(x=>x.id===taskId);
    if(t) return { lesson: l, task: t };
  }
  return null;
}
function instructionsFor(type){
  switch(type){
    case "read": return "Read the provided guidance and note 1–2 takeaways.";
    case "watch": return "Watch a short video and jot down key points.";
    case "reflect": return "Write a short reflection (2–3 sentences).";
    case "submit": return "Prepare the requested artifact (doc/link) and mark as done.";
    case "action": return "Complete the action described and mark as done.";
    default: return "Complete the task and mark as done.";
  }
}
