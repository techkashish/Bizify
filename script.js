const reels = [
  {id: "r1", title: "Trends in Janpath Market", category: "salon", caption: "Quick style transformation. Bookings open!", video: "video2.mp4", poster: "salon.jpg", likes: 152, trendingScore: 5},
  {id: "r2", title: "Tasty Food Hub", category: "food", caption: "Our new tandoori special — 30% off today", video: "video1.mp4", poster: "food.jpg", likes: 421, trendingScore: 8},
  {id: "r3", title: "Fashion Trendz", category: "shop", caption: "Summer collection drop — upload & check!", video: "video3.mp4", poster: "shop.jpg", likes: 88, trendingScore: 4},
  {id: "r4", title: "Desi Saree with local touch", category: "shop", caption: "Have authentic saree collections", video: "video4.mp4", poster: "salon.jpg", likes: 67, trendingScore: 6},
  {id: "r5", title: "Street Bites", category: "food", caption: "Late night chaat — signature chutney included!", video: "video5.mp4", poster: "food.jpg", likes: 210, trendingScore: 7}
];

const freelancers = [
  { id: 0, name: "Riya Sharma", role: "Video Editor", skills: ["Video Editing", "Color Grading", "Thumbnails"], img: "riya.jpg", portfolio: ["salon.jpg"] },
  { id: 1, name: "Aman Gupta", role: "Graphic Designer", skills: ["Posters","Branding","Ads"], img: "aman.jpg", portfolio: ["shop.jpg"] },
  { id: 2, name: "Neha Verma", role: "Social Media Manager", skills: ["Content Strategy","Copywriting"], img: "neha.jpg", portfolio: ["food.jpg"] }
];

// --- RENDER REELS ---
function renderReels(filter="all"){
  const list = document.getElementById("reelList");
  if(!list) return;
  list.innerHTML = "";

  let items = reels.filter(r => filter === "all" ? true : r.category === filter);

  items.forEach(r => {
    const div = document.createElement("div");
    div.className = "reel";
    div.innerHTML = `
      <div class="reel-media" style="position: relative;">
        <video id="video-${r.id}" poster="${r.poster}" src="${r.video}" muted></video>
        <button class="mute-btn">🔇</button>
        <button class="wishlist-btn">♡</button>
      </div>
      <div class="reel-info">
        <div class="reel-left">
          <h3>${r.title}</h3>
          <p>${r.caption}</p>
        </div>
        <div class="reel-right">❤ ${r.likes}</div>
      </div>
    `;
    list.appendChild(div);

    const video = div.querySelector("video");
    const muteBtn = div.querySelector(".mute-btn");
    const wishBtn = div.querySelector(".wishlist-btn");

    // --- VIDEO AUTOPLAY ON HOVER ---
    video.addEventListener("mouseenter", ()=> video.play());
    video.addEventListener("mouseleave", ()=> video.pause());

    // --- MUTE/UNMUTE ---
    muteBtn.addEventListener("click", e=>{
      e.stopPropagation();
      video.muted = !video.muted;
      muteBtn.innerText = video.muted ? "🔇" : "🔊";
    });

    // --- WISHLIST ---
    wishBtn.addEventListener("click", e=>{
      e.stopPropagation();
      wishBtn.innerText = wishBtn.innerText === "♡" ? "♥" : "♡";
    });
  });
}

// --- MODAL FUNCTIONS ---
function openCollab(id) {
  const freelancer = freelancers[id];
  document.getElementById("modalProfilePic").src = freelancer.img;
  document.getElementById("modalName").innerText = freelancer.name;
  document.getElementById("modalRole").innerText = freelancer.role;

  const skillsContainer = document.getElementById("modalSkills");
  skillsContainer.innerHTML = "";
  freelancer.skills.forEach(skill => {
    const span = document.createElement("span");
    span.innerText = skill;
    skillsContainer.appendChild(span);
  });

  document.getElementById("collabModal").classList.remove("hidden");
}

function closeCollab() {
  document.getElementById("collabModal").classList.add("hidden");
}

function submitCollab(e) {
  e.preventDefault();
  document.getElementById("collabResult").innerText = "Request Sent!";
  e.target.reset();
}

// --- SORT & FILTER ---
function sortReels(criteria){
  if(criteria === "popular") reels.sort((a,b)=>b.likes-a.likes);
  if(criteria === "trending") reels.sort((a,b)=>b.trendingScore-b.trendingScore);
  renderReels();
}

function applyTagFilter(tag){
  if(tag === "top") reels.sort((a,b)=>b.likes-b.likes);
  if(tag === "trending") reels.sort((a,b)=>b.trendingScore-b.trendingScore);
  renderReels();
}

// --- SMART SEARCH ---
function setupAutoSuggest(){
  const searchInput = document.getElementById("searchInput");
  const suggestBox = document.getElementById("suggestBox");
  if(!searchInput || !suggestBox) return;

  searchInput.addEventListener("input", e=>{
    const val = e.target.value.toLowerCase();
    suggestBox.innerHTML = "";
    if(val.length < 1) return;

    const suggestions = [
      ...reels.map(r=>r.title),
      ...reels.map(r=>r.category),
      ...freelancers.map(f=>f.name)
    ].filter(s=>s.toLowerCase().includes(val)).slice(0,5);

    suggestions.forEach(s=>{
      const div = document.createElement("div");
      div.className = "suggest-item";
      div.innerText = s;
      div.addEventListener("click", ()=>{
        searchInput.value = s;
        renderReels("all");
        Array.from(document.getElementById("reelList").children).forEach(div=>{
          if(!div.querySelector("h3").innerText.toLowerCase().includes(s.toLowerCase())){
            div.style.display = "none";
          }
        });
        suggestBox.innerHTML = "";
      });
      suggestBox.appendChild(div);
    });
  });
}

// --- LOCATION FILTER (demo) ---
function filterByLocation(){
  if(!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(pos=>{
    const userLat = pos.coords.latitude;
    const userLng = pos.coords.longitude;

    // dummy distances for demo
    reels.forEach(r=> r.distance = Math.random()*10 );
    reels.sort((a,b)=>a.distance - b.distance);
    renderReels();
  });
}

// --- INIT ---
document.addEventListener("DOMContentLoaded", ()=>{
  renderReels();

  const select = document.getElementById("categorySelect");
  if(select) select.addEventListener("change", e=>renderReels(e.target.value));

  const sortSelect = document.getElementById("sortSelect");
  if(sortSelect) sortSelect.addEventListener("change", e=>sortReels(e.target.value));

  const search = document.getElementById("searchInput");
  if(search) setupAutoSuggest();

  const locationBtn = document.getElementById("locationBtn");
  if(locationBtn) locationBtn.addEventListener("click", filterByLocation);

  const tagButtons = document.querySelectorAll(".tag-filter-btn");
  tagButtons.forEach(btn=> btn.addEventListener("click", ()=> applyTagFilter(btn.dataset.tag)));
});

