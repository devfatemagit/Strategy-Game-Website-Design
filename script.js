const board = document.getElementById("board");
const cells = 64;
const pieces = {
  3:{type:"blue",label:"◆",name:"Guard"}, 11:{type:"blue",label:"◇",name:"Scout"},
  18:{type:"blue",label:"●",name:"Core"}, 27:{type:"blue",label:"◆",name:"Guard"},
  35:{type:"red",label:"◆",name:"Enemy"}, 42:{type:"red",label:"◇",name:"Enemy"},
  50:{type:"red",label:"●",name:"Core"}, 57:{type:"red",label:"◆",name:"Enemy"}
};
const moves = new Set([19,20,26,28,34,36,43]);
const attacks = new Set([10,12,21,25,29,43]);

for(let i=0;i<cells;i++){
  const cell=document.createElement("button");
  cell.className="cell";
  cell.dataset.index=i;
  if(moves.has(i)) cell.classList.add("move");
  if(attacks.has(i)) cell.classList.add("attack");
  if(i===27) cell.classList.add("selected");
  if(pieces[i]){
    const p=document.createElement("span");
    p.className=`piece ${pieces[i].type}${i===18||i===50?" core":""}`;
    p.innerHTML=`${pieces[i].label}<small>${pieces[i].name}</small>`;
    cell.appendChild(p);
  }
  cell.addEventListener("click",()=>selectCell(cell));
  board.appendChild(cell);
}
function selectCell(cell){
  document.querySelectorAll(".cell").forEach(c=>c.classList.remove("selected"));
  cell.classList.add("selected");
  const hasPiece=cell.querySelector(".piece");
  document.querySelector(".primary-btn").firstChild.textContent=hasPiece?"SELECT UNIT ":"CONFIRM MOVE ";
}
document.getElementById("endTurn").addEventListener("click",()=>{
  const btn=document.getElementById("endTurn"); btn.textContent="Turn submitted ✓";
  setTimeout(()=>btn.innerHTML="End Turn <b>↵</b>",1200);
});
document.getElementById("undoBtn").addEventListener("click",()=>{
  document.querySelectorAll(".cell.selected").forEach(c=>c.classList.remove("selected"));
  document.querySelector('[data-index="27"]').classList.add("selected");
});
let sec=38;
setInterval(()=>{if(sec>0)sec--;document.getElementById("timer").textContent=`00:${String(sec).padStart(2,"0")}`},1000);

const modal=document.getElementById("modal");
document.querySelectorAll("[data-modal]").forEach(b=>b.addEventListener("click",()=>modal.classList.add("open")));
document.getElementById("modalClose").addEventListener("click",()=>modal.classList.remove("open"));
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});

function setTheme(bg, boardTheme){
  document.body.classList.remove("bg-steel","bg-concrete","bg-sand","bg-forest","bg-stone","board-obsidian","board-slate","board-sand","board-wood","board-stone");
  document.body.classList.add(bg,boardTheme);
  document.querySelectorAll(".theme-card").forEach(x=>x.classList.toggle("active",x.dataset.bg===bg && x.dataset.board===boardTheme));
}
document.querySelectorAll(".theme-card,.modal-theme-grid button").forEach(b=>b.addEventListener("click",()=>{
  setTheme(b.dataset.bg,b.dataset.board);
  if(b.closest(".modal-theme-grid")) modal.classList.remove("open");
}));
document.getElementById("darkMode").onclick=()=>{
  document.body.classList.add("theme-dark"); document.body.classList.remove("theme-light");
  document.getElementById("darkMode").classList.add("active");document.getElementById("lightMode").classList.remove("active");
};
document.getElementById("lightMode").onclick=()=>{
  document.body.classList.add("theme-light"); document.body.classList.remove("theme-dark");
  document.getElementById("lightMode").classList.add("active");document.getElementById("darkMode").classList.remove("active");
};
document.querySelectorAll(".nav-item,.mobile-nav a").forEach(a=>a.addEventListener("click",()=>{
  document.querySelectorAll(".nav-item,.mobile-nav a").forEach(x=>x.classList.remove("active"));a.classList.add("active");
}));
