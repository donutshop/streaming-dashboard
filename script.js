// Control video playback (Start/Pause)
function controlAllVideos(action) {
    const iframes = document.querySelectorAll('.youtube-frame');
    iframes.forEach(iframe => {
        const player = iframe.contentWindow;
        if (action === 'play') {
            player.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        } else if (action === 'pause') {
            player.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });
}

// Refresh all iframes
function refreshAllVideos() {
    const iframes = document.querySelectorAll('.youtube-frame');
    iframes.forEach(iframe => {
        iframe.src = iframe.src;  // Reload the iframe source
    });
}

// Mute all videos
function muteAllVideos() {
    const iframes = document.querySelectorAll('.youtube-frame');
    iframes.forEach(iframe => {
        const player = iframe.contentWindow;
        player.postMessage('{"event":"command","func":"mute","args":""}', '*'); // Mute command for iframe
    });
}

// Unmute all videos
function unmuteAllVideos() {
    const iframes = document.querySelectorAll('.youtube-frame');
    iframes.forEach(iframe => {
        const player = iframe.contentWindow;
        player.postMessage('{"event":"command","func":"unMute","args":""}', '*'); // Unmute command for iframe
    });
}

// Change video URL in the iframe
function changeVideo(iframeNumber) {
    const newUrl = document.getElementById('newVideoUrl').value;
    const iframe = document.getElementById(`iframe${iframeNumber}`);
    const videoId = extractVideoId(newUrl);
    if (videoId) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    } else {
        alert('Invalid YouTube URL');
    }
}

// Extract the video ID from a YouTube URL
function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null; // Return the video ID or null if not found
}

// Toggle fullscreen mode
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
