let songs = [];
let filteredSongs = [];
let currentCategory = null;

async function loadSongs() {
  const res = await fetch("songs.json");
  songs = await res.json();
  filteredSongs = songs;
  displayCategories();
  displaySongs(songs);
}

function displayCategories() {
  const categoriesDiv = document.getElementById("categories");
  const uniqueCategories = [...new Set(songs.map(s => s.category))];
  categoriesDiv.innerHTML = "";

  uniqueCategories.forEach(cat => {
    const btn = document.createElement("div");
    btn.className = "category";
    btn.textContent = cat;
    btn.onclick = () => filterByCategory(cat);
    categoriesDiv.appendChild(btn);
  });

  // "All" category
  const allBtn = document.createElement("div");
  allBtn.className = "category";
  allBtn.textContent = "All";
  allBtn.onclick = () => {
    currentCategory = null;
    filteredSongs = songs;
    displaySongs(songs);
  };
  categoriesDiv.appendChild(allBtn);
}

function displaySongs(list) {
  const songsDiv = document.getElementById("songs");
  songsDiv.innerHTML = "";
  list.forEach(song => {
    const div = document.createElement("div");
    div.className = "song";
    div.textContent = song.title;
    div.onclick = () => openLyrics(song);
    songsDiv.appendChild(div);
  });
}

function filterByCategory(cat) {
  currentCategory = cat;
  filteredSongs = songs.filter(s => s.category === cat);
  displaySongs(filteredSongs);
}

// Search
document.getElementById("searchBar").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const list = (currentCategory ? filteredSongs : songs).filter(s =>
    s.title.toLowerCase().includes(term)
  );
  displaySongs(list);
});

// Open Lyrics Modal
async function openLyrics(song) {
  const res = await fetch("lyrics/" + song.file);
  const text = await res.text();
  document.getElementById("songTitle").textContent = song.title;
  document.getElementById("lyrics").innerHTML = marked.parse(text);
  document.getElementById("lyricsModal").style.display = "block";
}

// Close Modal
document.getElementById("closeModal").onclick = () => {
  document.getElementById("lyricsModal").style.display = "none";
};
window.onclick = (event) => {
  if (event.target === document.getElementById("lyricsModal")) {
    document.getElementById("lyricsModal").style.display = "none";
  }
};

loadSongs();
