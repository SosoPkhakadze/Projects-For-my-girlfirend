// Define songs array and current song index
const songs = [
    { title: "Steve Lacy - Dark Red", artist: "Steve Lacy", path: "songs/Steve Lacy - Dark Red.mp3", albumArt: "album covers/steve-lacy.webp" },
    { title: "The Walters - I Love You So", artist: "The Walters", path: "songs/The Walters -- I Love You So.mp3", albumArt: "album covers/The walters.jpg" },
    { title: "Dzima Kobeshavidze & Irakli Balavadze - Red Wine", artist: "Dzima Kobeshavidze & Irakli Balavadze", path: "songs/Cj Borika & Dzima Kobeshavidze & Irakli Balavadze  - Red Wine.mp3", albumArt: "album covers/dzima kobeshavidze.jpg" },
    { title: "Radiohead - Jigsaw Falling Into Place", artist: "Radiohead", path: "songs/Radiohead - Jigsaw Falling Into Place.mp3", albumArt: "album covers/Radiohead - Jigsaw.jpg" },
    { title: "Milky Chance - Stolen Dance", artist: "Milky Chance", path: "songs/Milky Chance - Stolen Dance (Official Video).mp3", albumArt: "album covers/Milky chance.jpg" },
    { title: "Gorillaz - She's My Collar", artist: "Gorillaz", path: "songs/She's My Collar (feat. Kali Uchis).mp3", albumArt: "album covers/Gorillaz.jpg" },
    { title: "Fleetwood Mac - The Chain", artist: "Fleetwood Mac", path: "songs/Fleetwood Mac - The Chain (Official Audio).mp3", albumArt: "album covers/Fleetwood Mac.jpg" },
    { title: "Silver - Wham Bam", artist: "Silver", path: "songs/Wham Bam  - Silver Guardians of the Galaxy Vol  2 Official Soundtrack.mp3", albumArt: "album covers/Silver.jpg" },
    { title: "Maroon 5 - This Love", artist: "Maroon 5", path: "songs/Maroon 5 - This Love (Official Music Video).mp3", albumArt: "album covers/Maroon 5.jpg" },
    { title: "The Lumineers - Ophelia", artist: "The Lumineers", path: "songs/The Lumineers - Ophelia.mp3", albumArt: "album covers/The Lumineers.jpg" },
    { title: "Vance Joy - 'Riptide' Official Video", artist: "Vance Joy", path: "songs/Vance Joy - 'Riptide' Official Video.mp3", albumArt: "album covers/Vance Joy.jpg" },
];

let currentSongIndex = 0;
let audioPlayer = new Audio();

// Function to update the player with the current song details
function updatePlayer() {
    const currentSong = songs[currentSongIndex];
    document.getElementById('songTitle').textContent = currentSong.title;
    document.getElementById('artist').textContent = currentSong.artist;
    document.getElementById('albumArt').src = currentSong.albumArt;
    audioPlayer.src = currentSong.path;

    // Set the maximum value of the slider bar to the duration of the current song
    audioPlayer.onloadedmetadata = function() {
        document.getElementById('sliderBar').max = audioPlayer.duration;
    };
}

// Function to play or pause the current song and toggle button icon
function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('playPauseIcon').src = "icons/icons8-start-50.png"; // Change to pause icon
    } else {
        audioPlayer.pause();
        document.getElementById('playPauseIcon').src = "icons/icons8-pause-50.png"; // Change to play icon
    }
}

// Function to play the previous song
function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updatePlayer();
    audioPlayer.play();
}

// Function to play the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updatePlayer();
    audioPlayer.play();
}

// Function to shuffle the playlist
function shufflePlaylist() {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    currentSongIndex = 0;
    updatePlayer();
    audioPlayer.play();
}

// Function to display all songs in a list format
function displaySongList() {
    const modal = document.getElementById("songListModal");
    const songList = document.getElementById("songList");
  
    // Clear the existing song list
    songList.innerHTML = "";
  
    // Create list items for each song
    songs.forEach((song, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${song.title} - ${song.artist}`;
      listItem.addEventListener("click", () => {
        currentSongIndex = index;
        updatePlayer();
        audioPlayer.play();
        modal.style.display = "none";
      });
      songList.appendChild(listItem);
    });
  
    // Display the modal
    modal.style.display = "block";
  
    // Get the close button element
    const closeBtn = modal.querySelector(".close");
  
    // Add event listener to close the modal when the close button is clicked
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // Add event listener to close the modal when the user clicks outside of it
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }


// Event listener to update the slider bar when the song is playing
audioPlayer.addEventListener('timeupdate', function() {
    document.getElementById('sliderBar').value = audioPlayer.currentTime;
});

// Add event listener to detect when the current song ends
audioPlayer.addEventListener('ended', function() {
    // Play the next song when the current song ends
    nextSong();
});

// Event listener for updating the current time of the song when sliding the bar
document.getElementById('sliderBar').addEventListener('input', function() {
    audioPlayer.currentTime = this.value;
});

// Event listener to update play/pause button icon when audio player state changes
audioPlayer.addEventListener('play', function() {
    document.getElementById('playPauseIcon').src = "icons/icons8-start-50.png"; // Change to pause icon
});

audioPlayer.addEventListener('pause', function() {
    document.getElementById('playPauseIcon').src = "icons/icons8-pause-50.png"; // Change to play icon
});

// Initialize player with the first song
updatePlayer();
