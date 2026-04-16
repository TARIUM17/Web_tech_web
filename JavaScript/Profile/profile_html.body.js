export const content_profile = `
    <div class="enter_box">
        Enter your ID card
        <input type="email" id="profile_email" placeholder="...@...">
        <input type="password" id="profile_pass" placeholder="Your pass">
        <input type="name" id="username" placeholder="Your username">
        <input type="text" id="code_word" placeholder="Secret word">
        <div class="inline_buttons">
            <button id="reg_button">Registration</button>
            <button id="send_data">Send</button>
        </div>
    </div>

    <div class="data_block_info">
        <p>Hi, <span class="data_username"></span>!
        We glad to see you here.</p>
        <h3>Your level: <span class="depen_role"></span>.</h3>
        <br>
        <div class=".user_devs"></div>
        <br>
        <h3>Marked products:</h3><div class="list_of_fav"></div>
        <br>
        <div>
        Do you want to send your development to us? Please send the information here: <a href="#" target="_self" id = "invention_form">Form for projects</a>.
        </div>
    </div>
</div>
`;