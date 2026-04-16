import{ SUPABASE_URL, SUPABASE_ANON_KEY } from "../config.js";
        
        const content = document.querySelector('header');
        const content_text = `
<div class="content">
    <input type="email" id="email" placeholder="...@..."><br><br>
    <input type="password" id="pass" placeholder="Your pass">
        <a href="#" id="guest">Enter as guest</a>
        <!-- <a href="#" id="reg">registration</a> -->
        <button id="resume-btn">Send</button>
</div>

<div class="after_reg" id="text">
    <div class="center-board">
        <div class="box1">
            <div class="header-txt">
                <h1><b> Welcome, new visitor!</b></h1>
                <p>Hi there! As the HR Manager, I can tell you that our greatest asset isn't just our robots and technologies — it's the brilliant minds behind them. We are always looking for pioneers and problem-solvers. So if you really interested in robots, technologies and our future, please contact with us! Oh, and we hope your visit today gives you a glimpse into our culture of creativity and engineering excellence. Enjoy your stay!</p>
            </div>
        </div>
        <div class="box2">
            <img src="../samples/Robot-Era-1536x864.jpg" alt="Our goals and achivments">
        </div>
        <div class="box3">
            <div class="header-txt">
                <h1><b>Who we are?</b></h1>
                <p>A group of engineers and developers who have decided to use their knowledge, actions, and technologies to advance the modern world's evolution. Our company comprises approximately 50 highly qualified specialists in the fields of programming, engineering, physical design, and design. Over the course of our existence, we have concluded numerous successful deals with other companies, such as BSI, W.A. Robotics, Happy M.F. and others.</p>
            </div>
        </div>
        <div class="box4">
            <img src="../samples/depositphotos_237141906-stock-photo-man-in-suit-and-tie.jpg" alt="Don't let us down!">
        </div>
    </div>
</div>`;
content.insertAdjacentHTML('afterend', content_text);

        const video = document.getElementById('bg-video');
        const resumeBtn = document.getElementById('resume-btn');
        const email_inp = document.getElementById('email');
        const pass_inp = document.getElementById('pass');
        const guest_enter = document.getElementById('guest');
        const text = document.getElementById('text');
        
        const STOP_TIME = 5;
        let is_Paused = false;
        let is_Pressed = false;
        
        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        (async () => {
          const { data: { session } } = await supabaseClient.auth.getSession();
        })();
        
        video.addEventListener('loadedmetadata', () => {
            video.playbackRate = 4; 
        });

        video.addEventListener('timeupdate', () => {
            if (!is_Paused && video.currentTime >= STOP_TIME) {
                    video.pause();
                    is_Paused = true;
                    resumeBtn.style.display = 'block'; //'inline-block';
                    email_inp.style.display = 'block';
                    guest_enter.style.display = 'inline-block'
                    pass_inp.style.display = 'inline-block';
            }
        });

        resumeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            is_Pressed = true;
            const email = email_inp.value;
            const password = pass_inp.value;
            check(email, password);
            try {
                const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
                if (error) throw error;
                hide_elements();
                video.play();
            } catch (error) {
                alert(error.message);
            }
        });

        guest_enter.addEventListener('click', (e) => {
            is_Paused = true
            video.play();
            hide_elements();
        });

        function hide_elements() {
            resumeBtn.style.display = 'none';
            email_inp.style.display = 'none';
            guest_enter.style.display = 'none';
            pass_inp.style.display = 'none';
            setTimeout(() => {
                text.style.opacity = '1';
                text.style.visibility = 'visible';
            }, 1000);
        };
        
        const check = (email, password) => {
            if (!email || !password)
                {
                    alert("Email and password can not be empty!");
                    return;
                }
        }