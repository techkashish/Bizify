// SAMPLE data for reels and freelancers
const reels = [
  
  
  {
    id: "r1",
    title: "Trends in Janpath Market",
    category: "fashion",
    caption: "Quick style transformation. Bookings open!",
    video: "assets/videos/video2.mp4",
    poster: "assets/images/salon.jpg",
    likes: 152
  },
  {
    id: "r2",
    title: "Tasty Food Hub",
    category: "food",
    caption: "Our new tandoori special — 30% off today",
    video: "assets/videos/video1.mp4",
    poster: "assets/images/food.jpg",
    likes: 421
  },
  {
    id: "r3",
    title: "Fashion Trendz",
    category: "shop",
    caption: "Summer collection drop — upload & check!",
    video: "assets/videos/video3.mp4",
    poster: "assets/images/shop.jpg",
    likes: 88
  },
  {
    id: "r4",
    title: "Desi Saree with local touch",
    category: "salon",
    caption: "have authentic saree collections",
    video: "assets/videos/video4.mp4", 
    poster: "assets/images/salon.jpg",
    likes: 67
  },
  {
    id: "r5",
    title: "Street Bites",
    category: "food",
    caption: "Late night chaat — signature chutney included!",
    video: "assets/videos/video5.mp4",
    poster: "assets/images/food.jpg",
    likes: 210
  }
];

const freelancers = [
  {
    id: 0,
    name: "Riya Sharma",
    role: "Video Editor",
    skills: ["Video Editing", "Color Grading", "Thumbnails"],
    img: "assets/images/riya.jpg",
    portfolio: ["assets/images/salon.jpg","assets/images/food.jpg"]
  },
  {
    id: 1,
    name: "Aman Gupta",
    role: "Graphic Designer",
    skills: ["Posters","Branding","Ads"],
    img: "assets/images/aman.jpg",
    portfolio: ["assets/images/shop.jpg"]
  },
  {
    id: 2,
    name: "Neha Verma",
    role: "Social Media Manager",
    skills: ["Content Strategy","Copywriting"],
    img: "assets/images/neha.jpg",
    portfolio: ["assets/images/food.jpg"]
  }
];

// ------------------------------------
// --- NEW FUNCTION TO TOGGLE MUTE ---
function toggleMute(reelId) {
  // FINAL FIX on Line 80: Using string concatenation ("" +)
  const video = document.getElementById("video-" + reelId); 
  // Using string concatenation for the second element ID
  const icon = document.getElementById("mute-icon-" + reelId);
  
  if (video.muted) {
    video.muted = false;
    icon.innerText = '🔊'; // Speaker ON icon
  } else {
    video.muted = true;
    icon.innerText = '🔇'; // Speaker OFF icon
  }
}
// ------------------------------------

// Render reels to page
function renderReels(filter="all"){
  const list = document.getElementById("reelList");
  if(!list) return;

  list.innerHTML = "";
  const items = reels.filter(r => filter === "all" ? true : r.category === filter);

  items.forEach(r => {
    const div = document.createElement("div");
    div.className = "reel";
    div.innerHTML = `
      <div class="reel-media">
        <video id="video-${r.id}" muted playsinline preload="metadata" poster="${r.poster}" src="${r.video}"></video>
        
        <div class="reel-controls">
          <div class="mute-toggle" style="position:absolute; left:20px; top:20px; cursor:pointer;" onclick="toggleMute('${r.id}')">
            <div id="mute-icon-${r.id}" style="font-size:24px;">🔇</div>
          </div>
        </div>

        <div class="reel-side" style="position:absolute; right:20px; top:20vh;">
          <div style="text-align:center">
            <div style="font-size:24px;">❤️</div>
            <div style="font-size:14px; color:var(--muted)">${r.likes}</div>
          </div>
          <div style="text-align:center; margin-top:8px; cursor:pointer" onclick="openCollab(0)">
            <div style="font-size:24px;">📩</div>
            <div style="font-size:12px; color:var(--muted)">Hire</div>
          </div>
        </div>
      </div>
      <div class="reel-info">
        <div class="reel-left">
          <h3>${r.title}</h3>
          <p>${r.caption}</p>
        </div>
        <div class="reel-right">
          <div style="font-size:13px; color:var(--muted)">Category</div>
          <div style="font-weight:700; margin-top:6px">${r.category}</div>
        </div>
      </div>
    `;
    list.appendChild(div);
  });

  setupAutoplayObserver();
}

// Autoplay Videos
let observer;
function setupAutoplayObserver(){
  if(observer) observer.disconnect();
  const videos = document.querySelectorAll(".reel video");
  observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.play().catch(()=>{});
      } else {
        entry.target.pause();
      }
    });
  },{threshold:0.6});
  videos.forEach(v => observer.observe(v));
}

// Filters
function filterReels(){
  const sel = document.getElementById("categorySelect");
  renderReels(sel.value);
}

function shuffleReels(){
  reels.sort(()=>Math.random()-0.5);
  filterReels();
}

// Modal
function openCollab(idx){
  const modal = document.getElementById("collabModal");
  const f = freelancers[idx];

  document.getElementById("modalProfilePic").src = f.img;
  document.getElementById("modalName").innerText = f.name;
  document.getElementById("modalRole").innerText = f.role;

  const skills = document.getElementById("modalSkills");
  skills.innerHTML = "";
  f.skills.forEach(s => {
    // Using standard string concatenation
    skills.innerHTML += "<span>" + s + "</span>"; 
  });

  document.getElementById("reqMsg").value =
    // Using standard string concatenation
    "Hi " + f.name + ", I'm interested in hiring you for a short reel/post.";

  modal.classList.remove("hidden");
}

function closeCollab(){
  document.getElementById("collabModal").classList.add("hidden");
}

function submitCollab(e){
  e.preventDefault();
  document.getElementById("collabResult").innerText =
    "Request sent! Freelancer will review your message.";
  setTimeout(()=>closeCollab(),1500);
}

// Page load
window.addEventListener("load", ()=>{
  if(document.getElementById("reelList")){
    renderReels();
  }
});