export const content_sub_page = `
<div id="main_block">
    <div class="all">
        <div class = "photo">
            <label class="upload-area" id="uploadArea">
                <span class="upload-text" id="uploadText">+</span>
                <img id="preview" style="display: none;">
                <input type="file" id="fileInput" accept="image/*">
            </label>
        </div>
        <div class = "name">
            <input type="text" id="formTitle" placeholder="Title...">
        </div>
        <div class = "desc">
            <textarea name="description" id="formDescript" rows="5" cols="80" placeholder="Description..."></textarea>
        </div>
    </div>
    
    <div class = "form_buttons">
        <button id="clearButton">Clear</button>
        <button id="sendButton">Send</button>
    </div>
</div>
`;