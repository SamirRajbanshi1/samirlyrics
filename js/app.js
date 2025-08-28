async function loadSongs() {
  const response = await fetch("songs.json");
  const songs = await response.json();

  const songList = document.getElementById("songList");
  songList.innerHTML = "";

  songs.forEach(song => {
    const button = document.createElement("button");
    button.textContent = song.title;
    button.onclick = () => loadLyrics(song.file);
    songList.appendChild(button);
  });

  // Search filter
  document.getElementById("searchBox").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    [...songList.children].forEach(btn => {
      btn.style.display = btn.textContent.toLowerCase().includes(query) ? "block" : "none";
    });
  });
}
async function loadLyrics(file) {
  const response = await fetch(file);
  const text = await response.text();

  // Convert Markdown → HTML with line breaks
  document.getElementById("lyricsDisplay").innerHTML = marked.parse(text, { 
    breaks: true 
  });
}

loadSongs();
