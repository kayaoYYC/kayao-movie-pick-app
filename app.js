// CinePick Movie Night Selection Logic

// Default Pre-seeded Database (Fallback in case movies.json fails to load)
const FALLBACK_DATABASE = [
  {
    "title": "Inside Out 2",
    "year": 2024,
    "rating": "8.0",
    "runtime": "96 min",
    "genres": ["Animation", "Comedy", "Family"],
    "overview": "Riley is officially a teenager, and headquarters is undergoing a sudden demolition to make room for new Emotions! Joy, Sadness, Anger, Fear, and Disgust aren't sure how to feel when Anxiety, Envy, Embarrassment, and Ennui show up.",
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Inside_Out_2_poster.jpg/250px-Inside_Out_2_poster.jpg",
    "imdb_id": "tt22022452"
  },
  {
    "title": "The Wild Robot",
    "year": 2024,
    "rating": "8.4",
    "runtime": "102 min",
    "genres": ["Animation", "Sci-Fi", "Family"],
    "overview": "After a shipwreck, an intelligent robot named Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/r/r2/The_Wild_Robot_poster.jpg/250px-The_Wild_Robot_poster.jpg",
    "imdb_id": "tt29623480"
  },
  {
    "title": "Kung Fu Panda 4",
    "year": 2024,
    "rating": "6.3",
    "runtime": "94 min",
    "genres": ["Animation", "Action", "Comedy"],
    "overview": "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as the Dragon Warrior. As such, he trains a new kung fu practitioner and encounters a villain called the Chameleon.",
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Kung_Fu_Panda_4_poster.jpg/250px-Kung_Fu_Panda_4_poster.jpg",
    "imdb_id": "tt21692408"
  },
  {
    "title": "The Fall Guy",
    "year": 2024,
    "rating": "7.0",
    "runtime": "126 min",
    "genres": ["Action", "Comedy", "Romance"],
    "overview": "A battered stuntman, fresh off an almost career-ending accident, has to track down a missing movie star, solve a conspiracy, and try to win back the love of his life while still doing his day job.",
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/The_Fall_Guy_%282024%29_poster.jpg/250px-The_Fall_Guy_%282024%29_poster.jpg",
    "imdb_id": "tt1684562"
  },
  {
    "title": "Barbie",
    "year": 2023,
    "rating": "6.9",
    "runtime": "114 min",
    "genres": ["Comedy", "Fantasy", "Adventure"],
    "overview": "Stereotypical Barbie experiences a full-on existential crisis and must travel to the real world in order to understand herself and discover her true purpose, alongside a very eager Ken.",
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
    "imdb_id": "tt1517268"
  },
  {
    "title": "Wonka",
    "year": 2023,
    "rating": "7.0",
    "runtime": "116 min",
    "genres": ["Adventure", "Comedy", "Family", "Musical"],
    "overview": "Focusing on a young Willy Wonka and how he met the Oompa-Loompas on one of his earliest adventures, this movie serves as a magical prequel showing how the world's greatest chocolatier began.",
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Wonka_2023_poster.jpg/250px-Wonka_2023_poster.jpg",
    "imdb_id": "tt6166392"
  },
  {
    "title": "Spider-Man: Across the Spider-Verse",
    "year": 2023,
    "rating": "8.6",
    "runtime": "140 min",
    "genres": ["Animation", "Action", "Sci-Fi", "Adventure"],
    "overview": "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg/250px-Spider-Man-_Across_the_Spider-Verse_poster.jpg",
    "imdb_id": "tt9362722"
  },
  {
    "title": "Moana 2",
    "year": 2024,
    "rating": "6.8",
    "runtime": "100 min",
    "genres": ["Animation", "Adventure", "Comedy", "Family"],
    "overview": "After receiving an unexpected call from her wayfinding ancestors, Moana journeys to the far seas of Oceania and into long-lost, dangerous waters for an adventure unlike anything she's ever faced.",
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Moana_2_poster.jpeg/250px-Moana_2_poster.jpeg",
    "imdb_id": "tt13622970"
  },
  {
    "title": "Deadpool & Wolverine",
    "year": 2024,
    "rating": "7.7",
    "runtime": "128 min",
    "genres": ["Action", "Comedy", "Sci-Fi"],
    "overview": "A listless Wade Wilson toils in civilian life with his days as the morally flexible mercenary behind him. But when his homeworld faces an existential threat, he must reluctantly suit-up with an even more reluctant Wolverine.",
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Deadpool_%26_Wolverine_poster.jpg/250px-Deadpool_%26_Wolverine_poster.jpg",
    "imdb_id": "tt6263850"
  },
  {
    "title": "IF (Imaginary Friends)",
    "year": 2024,
    "rating": "6.5",
    "runtime": "104 min",
    "genres": ["Comedy", "Family", "Fantasy"],
    "overview": "A young girl who goes through a difficult experience begins to see everyone's imaginary friends who have been left behind as their real-life friends grew up, teaming up with a neighbor to reconnect them.",
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/IF_2024_poster.jpg/250px-IF_2024_poster.jpg",
    "imdb_id": "tt11136638"
  }
];

// App State
let movieDatabase = [];
let currentCandidates = [];
let lockedSlots = [false, false, false];
let isUpdatingDb = false;

// Selected Movies State (stored in LocalStorage)
let selectedMovies = JSON.parse(localStorage.getItem("cinepick_selected_movies")) || [];

// DOM Elements
const cardsContainer = document.getElementById("cards-container");
const refreshBtn = document.getElementById("refresh-btn");
const dbStatusText = document.getElementById("db-status-text");
const dbUpdateBtn = document.getElementById("db-update-btn");
const selectedListContainer = document.getElementById("selected-list-container");

// Celebration Elements
const celebrationOverlay = document.getElementById("celebration-overlay");
const celebrationMovieTitle = document.getElementById("celebration-movie-title");
const celebrationCloseBtn = document.getElementById("celebration-close-btn");

// Fireworks Canvas Variables
const fireworksCanvas = document.getElementById("fireworks-canvas");
const fCtx = fireworksCanvas.getContext("2d");
let fireworksActive = false;
let fireworkParticles = [];

// Fetch and load database from movies.json
async function loadMovieDatabase() {
  try {
    dbStatusText.textContent = "Database: Loading movies...";
    const response = await fetch("movies.json");
    if (!response.ok) throw new Error("Failed to load movies.json");
    const data = await response.json();
    movieDatabase = data.movies || [];
    dbStatusText.textContent = `Database: Weekly updated (${data.last_updated})`;
    console.log(`Loaded ${movieDatabase.length} movies from database.`);
  } catch (error) {
    console.warn("Could not load movies.json, falling back to pre-seeded backup list.", error);
    movieDatabase = FALLBACK_DATABASE;
    dbStatusText.textContent = "Database: Pre-seeded fallback mode";
  }
  
  if (movieDatabase.length === 0) {
    movieDatabase = FALLBACK_DATABASE;
  }
  
  // Set up initial selection
  if (currentCandidates.length === 0) {
    currentCandidates = getRandomMovies(3, []);
  } else {
    // Keep locked movies, refresh unlocked ones
    const lockedCount = lockedSlots.filter(Boolean).length;
    if (lockedCount < 3) {
      const neededCount = 3 - lockedCount;
      const newMovies = getRandomMovies(neededCount, currentCandidates);
      let newMoviesIndex = 0;
      currentCandidates = currentCandidates.map((m, idx) => lockedSlots[idx] ? m : newMovies[newMoviesIndex++]);
    }
  }
  
  renderCards();
  renderSelectedMovies();
}

// Get count unique random movies, avoiding excludeList
function getRandomMovies(count, excludeList = []) {
  const candidates = [];
  const excludeTitles = excludeList.map(m => m.title);
  
  // Shallow copy & shuffle
  const shuffled = [...movieDatabase].sort(() => 0.5 - Math.random());
  
  for (let i = 0; i < shuffled.length; i++) {
    if (!excludeTitles.includes(shuffled[i].title)) {
      candidates.push(shuffled[i]);
      if (candidates.length === count) break;
    }
  }
  
  // Fill remaining slots if db is small
  while (candidates.length < count) {
    const randomMovie = movieDatabase[Math.floor(Math.random() * movieDatabase.length)];
    candidates.push(randomMovie);
  }
  
  return candidates;
}

// Render the 3 Movie Cards
function renderCards() {
  cardsContainer.innerHTML = "";
  
  currentCandidates.forEach((movie, index) => {
    const isLocked = lockedSlots[index];
    const isHearted = selectedMovies.some(m => m.title === movie.title);
    const card = document.createElement("div");
    card.className = `movie-card ${isLocked ? "locked" : ""}`;
    card.id = `movie-card-${index}`;
    
    // Genre tags HTML
    const genresHTML = movie.genres.map(g => `<span class="genre-tag">${g}</span>`).join("");
    
    // Construct IMDb URL (Scraped ID or fallback search)
    const imdbURL = movie.imdb_id 
      ? `https://www.imdb.com/title/${movie.imdb_id}/` 
      : `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}&s=tt`;
    
    card.innerHTML = `
      <div class="movie-poster-container">
        <button class="heart-btn ${isHearted ? 'hearted' : ''}" aria-label="Heart movie ${movie.title}">
          ${isHearted ? '❤️' : '♡'}
        </button>
        ${isLocked ? `<div class="lock-badge">🔒 Locked</div>` : ""}
        <img class="movie-poster-img" src="${movie.poster_url}" alt="${movie.title} Poster" onerror="this.src='https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400&auto=format&fit=crop'">
      </div>
      <div class="movie-info">
        <div class="movie-title-row">
          <h3 class="movie-title">${movie.title}</h3>
          <a href="${imdbURL}" target="_blank" rel="noopener" class="imdb-badge" title="View on IMDb">IMDb</a>
        </div>
        <div class="movie-meta-tags">
          <span class="tag-year">${movie.year}</span>
          <span class="tag-runtime">${movie.runtime}</span>
          <span class="tag-rating">⭐ ${movie.rating}</span>
        </div>
        <div class="movie-genres">
          ${genresHTML}
        </div>
        <p class="movie-overview">${movie.overview}</p>
      </div>
      <button class="lock-toggle-btn" aria-label="Toggle lock for ${movie.title}">
        <span class="lock-icon">${isLocked ? "🔒 Keep Option" : "🔓 Keep Movie"}</span>
      </button>
    `;
    
    // Lock Button Event Listener
    const lockBtn = card.querySelector(".lock-toggle-btn");
    lockBtn.addEventListener("click", () => {
      if (!isUpdatingDb) toggleLock(index);
    });
    
    // Heart Button Event Listener
    const heartBtn = card.querySelector(".heart-btn");
    heartBtn.addEventListener("click", () => {
      if (!isUpdatingDb) toggleHeart(movie);
    });
    
    cardsContainer.appendChild(card);
  });
  
  // Disable refresh button if all are locked
  const lockedCount = lockedSlots.filter(Boolean).length;
  refreshBtn.disabled = lockedCount === 3 || isUpdatingDb;
}

// Toggle Lock State
function toggleLock(index) {
  lockedSlots[index] = !lockedSlots[index];
  renderCards();
}

// Toggle Heart Selected Movie
function toggleHeart(movie) {
  const existingIdx = selectedMovies.findIndex(m => m.title === movie.title);
  
  if (existingIdx > -1) {
    // Unheart / Remove
    selectedMovies.splice(existingIdx, 1);
  } else {
    // Heart / Add
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    
    selectedMovies.unshift({
      title: movie.title,
      poster_url: movie.poster_url,
      dateSelected: formattedDate
    });
    
    // Trigger celebration & fireworks!
    triggerCelebration(movie.title);
  }
  
  // Save to LocalStorage
  localStorage.setItem("cinepick_selected_movies", JSON.stringify(selectedMovies));
  
  renderCards();
  renderSelectedMovies();
}

// Render "Movies You've Selected" Section
function renderSelectedMovies() {
  if (selectedMovies.length === 0) {
    selectedListContainer.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">💖</span>
        <p>No movies selected yet. Click the heart icon on any movie poster above to save it here!</p>
      </div>
    `;
    return;
  }
  
  selectedListContainer.innerHTML = "";
  
  selectedMovies.forEach((movie, index) => {
    const row = document.createElement("div");
    row.className = "selected-item-row";
    row.innerHTML = `
      <div class="selected-thumb-container">
        <img class="selected-thumb-img" src="${movie.poster_url}" alt="${movie.title} Poster" onerror="this.src='https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400&auto=format&fit=crop'">
      </div>
      <div class="selected-item-details">
        <h4 class="selected-item-title">❤️ ${movie.title}</h4>
        <span class="selected-item-timestamp">Hearted on ${movie.dateSelected}</span>
      </div>
      <button class="selected-remove-btn" aria-label="Remove ${movie.title} from selected list" title="Remove Movie">
        &times;
      </button>
    `;
    
    // Remove Click Handler
    row.querySelector(".selected-remove-btn").addEventListener("click", () => {
      // Remove from state
      selectedMovies.splice(index, 1);
      localStorage.setItem("cinepick_selected_movies", JSON.stringify(selectedMovies));
      
      renderCards();
      renderSelectedMovies();
    });
    
    selectedListContainer.appendChild(row);
  });
}

// Refresh Unlocked Movies
function refreshMovies() {
  if (isUpdatingDb) return;
  
  const lockedCount = lockedSlots.filter(Boolean).length;
  if (lockedCount === 3) return; // All locked, do nothing
  
  // Gather currently locked movies
  const lockedMovies = currentCandidates.filter((_, idx) => lockedSlots[idx]);
  
  // Fetch needed count
  const neededCount = 3 - lockedCount;
  const newMovies = getRandomMovies(neededCount, currentCandidates);
  
  let newMoviesIndex = 0;
  
  // Apply roll effect to unlocked slots
  currentCandidates.forEach((movie, index) => {
    if (!lockedSlots[index]) {
      const card = document.getElementById(`movie-card-${index}`);
      if (card) {
        card.classList.add("rolling");
        
        // Swap movie halfway through the roll transition
        setTimeout(() => {
          currentCandidates[index] = newMovies[newMoviesIndex++];
          renderCards();
        }, 275);
        
        // Remove animation class
        setTimeout(() => {
          const freshCard = document.getElementById(`movie-card-${index}`);
          if (freshCard) freshCard.classList.remove("rolling");
        }, 550);
      }
    }
  });
}

// Refresh / Scrape database via Python backend API
async function updateMovieDatabase() {
  if (isUpdatingDb) return;
  
  isUpdatingDb = true;
  dbUpdateBtn.classList.add("loading");
  dbUpdateBtn.disabled = true;
  refreshBtn.disabled = true;
  
  const originalStatusText = dbStatusText.textContent;
  dbStatusText.textContent = "Database: Scraping IMDb & Wikipedia (resolving posters)...";
  
  try {
    const response = await fetch("/api/refresh", { method: "POST" });
    if (!response.ok) throw new Error("API responded with an error");
    
    const data = await response.json();
    if (data.status === "success") {
      console.log("Database successfully updated via server!");
      // Reload the updated json database
      await loadMovieDatabase();
    } else {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Failed to update database via API:", error);
    alert("Could not update database from server. Using local fallback instead.");
    dbStatusText.textContent = originalStatusText;
  } finally {
    isUpdatingDb = false;
    dbUpdateBtn.classList.remove("loading");
    dbUpdateBtn.disabled = false;
    renderCards();
  }
}

// Celebration Fireworks and Banner Handler
function triggerCelebration(title) {
  celebrationMovieTitle.textContent = title;
  celebrationOverlay.classList.add("active");
  celebrationOverlay.setAttribute("aria-hidden", "false");
  
  // Start Fireworks Canvas
  startFireworks();
  
  // Auto-close celebration after 4.5 seconds
  setTimeout(() => {
    closeCelebration();
  }, 4500);
}

function closeCelebration() {
  celebrationOverlay.classList.remove("active");
  celebrationOverlay.setAttribute("aria-hidden", "true");
  stopFireworks();
}

// 2D Fireworks Canvas Engine
function resizeFireworksCanvas() {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}

class FireworkParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    
    // Velocity vectors
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    
    this.gravity = 0.08;
    this.friction = 0.975;
    this.alpha = 1.0;
    this.decay = Math.random() * 0.02 + 0.01;
    this.size = Math.random() * 3.5 + 1.5;
  }
  
  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }
  
  draw() {
    fCtx.save();
    fCtx.globalAlpha = this.alpha;
    fCtx.fillStyle = this.color;
    fCtx.beginPath();
    fCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    fCtx.fill();
    fCtx.restore();
  }
}

class FireworkShell {
  constructor() {
    this.x = Math.random() * (fireworksCanvas.width - 200) + 100;
    this.y = fireworksCanvas.height;
    
    // Launch angle slightly offset from straight up
    this.targetY = Math.random() * (fireworksCanvas.height / 2.2) + 100;
    this.speed = Math.random() * 5 + 10;
    this.vy = -this.speed;
    this.vx = Math.random() * 2 - 1;
    
    this.exploded = false;
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;
  }
  
  update() {
    this.y += this.vy;
    this.x += this.vx;
    this.vy += 0.12; // launch gravity slowing down
    
    if (this.vy >= 0 || this.y <= this.targetY) {
      this.explode();
    }
  }
  
  draw() {
    fCtx.save();
    fCtx.fillStyle = this.color;
    fCtx.beginPath();
    fCtx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    fCtx.fill();
    fCtx.restore();
  }
  
  explode() {
    this.exploded = true;
    // Spawn particles
    const particleCount = 100 + Math.floor(Math.random() * 60);
    for (let i = 0; i < particleCount; i++) {
      fireworkParticles.push(new FireworkParticle(this.x, this.y, this.color));
    }
  }
}

// Shell launcher timer variables
let shellLaunchTimer = 0;
let activeShells = [];

function startFireworks() {
  resizeFireworksCanvas();
  fireworksActive = true;
  fireworkParticles = [];
  activeShells = [];
  shellLaunchTimer = 0;
  
  // Launch initial burst of shells
  activeShells.push(new FireworkShell());
  setTimeout(() => { if(fireworksActive) activeShells.push(new FireworkShell()); }, 400);
  setTimeout(() => { if(fireworksActive) activeShells.push(new FireworkShell()); }, 850);
  
  requestAnimationFrame(updateFireworks);
}

function stopFireworks() {
  fireworksActive = false;
  fCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
}

function updateFireworks(timestamp) {
  if (!fireworksActive) return;
  
  // Trail effect clearing
  fCtx.fillStyle = 'rgba(7, 5, 15, 0.2)';
  fCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  
  // Launch shells periodically
  shellLaunchTimer++;
  if (shellLaunchTimer > 45 && activeShells.length < 5) {
    activeShells.push(new FireworkShell());
    shellLaunchTimer = 0;
  }
  
  // Update and draw launch shells
  activeShells = activeShells.filter(s => !s.exploded);
  activeShells.forEach(s => {
    s.update();
    s.draw();
  });
  
  // Update and draw explosion particles
  fireworkParticles = fireworkParticles.filter(p => p.alpha > 0);
  fireworkParticles.forEach(p => {
    p.update();
    p.draw();
  });
  
  requestAnimationFrame(updateFireworks);
}

// Setup Event Listeners
function setupEventListeners() {
  refreshBtn.addEventListener("click", refreshMovies);
  dbUpdateBtn.addEventListener("click", updateMovieDatabase);
  celebrationCloseBtn.addEventListener("click", closeCelebration);
  
  celebrationOverlay.addEventListener("click", (e) => {
    if (e.target === celebrationOverlay) {
      closeCelebration();
    }
  });
  
  window.addEventListener("resize", () => {
    if (fireworksActive) resizeFireworksCanvas();
  });
}

// Load database on start
window.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadMovieDatabase();
});
