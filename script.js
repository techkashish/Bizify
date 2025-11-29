const reels = [
  {id: "r1", title: "Trends in Janpath Market", category: "salon", caption: "Quick style transformation. Bookings open!", video: "video2.mp4", poster: "salon.jpg", likes: 152},
  {id: "r2", title: "Tasty Food Hub", category: "food", caption: "Our new tandoori special — 30% off today", video: "video1.mp4", poster: "food.jpg", likes: 421},
  {id: "r3", title: "Fashion Trendz", category: "shop", caption: "Summer collection drop — upload & check!", video: "video3.mp4", poster: "shop.jpg", likes: 88},
  {id: "r4", title: "Desi Saree with local touch", category: "shop", caption: "have authentic saree collections", video: "video4.mp4", poster: "salon.jpg", likes: 67},
  {id: "r5", title: "Street Bites", category: "food", caption: "Late night chaat — signature chutney included!", video: "video5.mp4", poster: "food.jpg", likes: 210}
];

const freelancers = [
  {
    id: 0,
    name: "Riya Sharma",
    role: "Video Editor",
    skills: ["Video Editing", "Color Grading", "Thumbnails"],
    img: "riya.jpg",
    portfolio: ["salon.jpg"],
  },
  {
    id: 1,
    name: "Aman Gupta",
    role: "Graphic Designer",
    skills: ["Posters","Branding","Ads"],
    img: "aman.jpg",
    portfolio: ["shop.jpg"]
  },
  {
    id: 2,
    name: "Neha Verma",
    role: "Social Media Manager",
    skills: ["Content Strategy","Copywriting"],
    img: "neha.jpg",
    portfolio: ["food.jpg"]
  }
];

// Render reels
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
        <video id="video-${r.id}" controls poster="${r.poster}" src="${r.video}"></video>
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
  });
}

// Open modal for a specific freelancer
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

// Close modal
function closeCollab() {
  document.getElementById("collabModal").classList.add("hidden");
}

// Handle collaboration form submission (dummy example)
function submitCollab(e) {
  e.preventDefault();
  document.getElementById("collabResult").innerText = "Request Sent!";
  e.target.reset();
}



document.addEventListener("DOMContentLoaded", ()=>{
  renderReels();
  const select = document.getElementById("categorySelect");
  if(select) select.addEventListener("change", e=>renderReels(e.target.value));

  const search = document.getElementById("searchInput");
  if(search){
    search.addEventListener("input", e=>{
      const val = e.target.value.toLowerCase();
      renderReels("all");
      const list = document.getElementById("reelList");
      Array.from(list.children).forEach(div=>{
        if(!div.querySelector("h3").innerText.toLowerCase().includes(val)){
          div.style.display = "none";
        }
      });
    });
  }
});
