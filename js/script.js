// Smooth scroll to main content
function scrollToSection() {
    document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
}

// Animation for card click effect
function animateCard(card) {
    card.classList.add("animate");
    setTimeout(() => {
        card.classList.remove("animate");
    }, 300);
}

// Morceau
// Smooth scroll to main content
function scrollToSection() {
    document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
}

// Animation for card click effect
function animateCard(card) {
    card.classList.add("animate");
    setTimeout(() => {
        card.classList.remove("animate");
    }, 300);
}

// Morceau
let currentSound = null; // Variable to keep track of the current playing sound
let currentAudioId = null; // To keep track of the current audio ID

// Function to play audio using Howler.js
function playAudio(audioId) {
    // Stop the currently playing sound if any
    if (currentSound) {
        currentSound.stop();
        resetProgress();
    }

    const audioElement = document.getElementById(audioId);
    const sound = new Howl({
        src: [audioElement.src],
        html5: true, // enable streaming for larger files
        onplay: function () {
            currentSound = sound; // Set the current sound being played
            currentAudioId = audioId; // Save the current audio ID
            updateProgress(audioId, sound);
            hideReplayButton(audioId); // Hide replay button when playing
        },
        onend: function () {
            resetProgress();
            currentSound = null; // Clear current sound on end
            hideReplayButton(audioId); // Hide replay button when finished
        }
    });

    sound.play();
    updateTimeDisplay(audioId, sound);
}

// Function to pause the currently playing audio
function pauseAudio() {
    if (currentSound) {
        currentSound.pause();
        showReplayButton(currentAudioId); // Show replay button when paused
    }
}

// Function to replay the audio from the current position
function replayAudio() {
    if (currentSound) {
        currentSound.play(); // Play from current position
        hideReplayButton(currentAudioId); // Hide replay button
    }
}

// Function to update progress bar and time display
function updateProgress(audioId, sound) {
    const progressBar = document.getElementById('progress' + audioId.charAt(audioId.length - 1));
    const timeDisplay = document.getElementById('time' + audioId.charAt(audioId.length - 1));

    function update() {
        const progress = (sound.seek() / sound.duration()) * 100;
        progressBar.style.width = progress + '%';
        const currentTime = sound.seek();
        const duration = sound.duration();
        timeDisplay.innerText = formatTime(currentTime) + ' / ' + formatTime(duration);
        if (currentSound) {
            requestAnimationFrame(update);
        }
    }

    update();

    // Add click event to progress bar for navigation
    progressBar.parentElement.onclick = function (e) {
        const rect = progressBar.parentElement.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const totalWidth = rect.width;
        const newTime = (clickPosition / totalWidth) * sound.duration();
        sound.seek(newTime);
    };
}

// Function to show replay button
function showReplayButton(audioId) {
    const replayButton = document.getElementById('replay' + audioId.charAt(audioId.length - 1));
    replayButton.style.display = 'inline-block'; // Show the replay button
}

// Function to hide replay button
function hideReplayButton(audioId) {
    const replayButton = document.getElementById('replay' + audioId.charAt(audioId.length - 1));
    replayButton.style.display = 'none'; // Hide the replay button
}

// Function to reset progress bar and time display
function resetProgress() {
    const progressBars = document.querySelectorAll('.progress-bar');
    const timeDisplays = document.querySelectorAll('.audio-time');

    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });

    timeDisplays.forEach(display => {
        display.innerText = '0:00 / 0:00';
    });
}

// Function to format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return minutes + ':' + (secs < 10 ? '0' : '') + secs;
}
