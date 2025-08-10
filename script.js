let player;
let watchTime = 0; // in seconds
let timerInterval;
let earnings = 0;
const rewardInterval = 180; // every 3 minutes
const rewardAmount = 200; // ₦200 reward

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315',
    width: '560',
    videoId: 'Etq_mEeNho8', // ✅ your new video ID
    playerVars: { 'playsinline': 1 },
    events: { 'onStateChange': onPlayerStateChange }
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        watchTime++;
        document.getElementById("timer").innerText = `Watch Time: ${formatTime(watchTime)}`;

        if (watchTime % rewardInterval === 0) {
          earnings += rewardAmount;
          document.getElementById("reward").innerText = `Total Earnings: ₦${earnings}`;
        }
      }, 1000);
    }
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}
