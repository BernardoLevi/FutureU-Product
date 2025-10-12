// Small utilities for the demo

// Format percent safely (0..100)
function clampPct(n){ return Math.max(0, Math.min(100, Math.round(n))) }

// Generate a CSV Blob from an array of objects
function toCSV(rows){
  if(!rows || !rows.length) return new Blob([""], { type:"text/csv" });
  const headers = Object.keys(rows[0]);
  const escape = (v)=> `"${String(v ?? "").replaceAll('"','""')}"`;
  const lines = [headers.map(escape).join(",")];
  for(const r of rows){
    lines.push(headers.map(h=>escape(r[h])).join(","));
  }
  return new Blob([lines.join("\n")], { type:"text/csv" });
}

// Trigger a download for a Blob
function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 0);
}
