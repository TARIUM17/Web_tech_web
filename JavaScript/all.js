const content_main = `
<video id="bg-video" autoplay muted playsinline>
    <source src="samples/Web_animation_test.mp4" type="video/mp4">
    <h1>Your brawser can not support video format.</h1>
</video>


<header>
        <div class = "wrapper">
    <div class = "logo"> 
        <img src="samples/Cyberfun_Tech_Logo.svg" alt="CyberFun Tech logo">
    </div>
    <h2>
        <span class = "text-logo"> The place where 
            <span class = "text_logo_color">
                fun
            </span> 
            <br> 
            <span class = "Up_text_mover">and 
                <span class = "text_logo_color"> 
                    technologies
                </span> unite!
            </span>
        </span>
        <nav class = "Upper_logo_menu">
            <span class = "Up_placer">
                <a href = "#" id = "about-link">About Us</a>
                <a href = "#" id = "Developments-link">Developments</a>
                <a href = "#" id = "profile-link">Profile</a>
            </span>
        </nav>
    </h2>
</div>
</header>
`;
document.body.innerHTML = content_main; 