        const video = document.getElementById('bg-video');
        const resumeBtn = document.getElementById('resume-btn');
        
        const STOP_TIME = 5; 
        let is_Paused = false;

        video.addEventListener('loadedmetadata', () => {
            video.playbackRate = 4; 
        });

        video.addEventListener('timeupdate', () => {
            if (!is_Paused && video.currentTime >= STOP_TIME) {
                    video.pause();
                    is_Paused = true;
                    resumeBtn.style.display = 'inline-block';
            }
        });

        resumeBtn.addEventListener('click', () => {
            video.play();
            resumeBtn.style.display = 'none';
        });
        
        video.addEventListener('play', () => {
            isPaused = true;
        });
