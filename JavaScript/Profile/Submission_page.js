import {content_sub_page} from "./Submission_page_html.js";
import  Hide  from "../hide_bg.js";
import { navigate } from "../router.js";
import { addProduct } from "../../API/products/addProduct.js";
import { requireAuth } from "../../API/auth/reqAuth.js";
import { getCurrentSession } from "../../API/services/session.js";

export async function renderSubmissionPage() {
    const isAuth = await requireAuth();
    if (!isAuth) {
        navigate('/enter');
        return;
    }

    await SubmissionPage();
}

export function SubmissionPage() {
    Hide(content_sub_page);

    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const uploadText = document.getElementById('uploadText');
    const uploadArea = document.getElementById('uploadArea');
    const clearButton = document.getElementById('clearButton');
    const sendButton = document.getElementById('sendButton');
    const formTitle = document.getElementById('formTitle');
    const formDescript = document.getElementById('formDescript');

    fileInput.addEventListener('change', handleFile);  // load from file

    uploadArea.addEventListener('dragover', (e) => {          // Drag & Drop function
        e.preventDefault();
        uploadArea.style.borderColor = '#000';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#999';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#999';
        const file = e.dataTransfer.files[0];
        showImage(file);
    });

    function handleFile() {
        const file = fileInput.files[0];
        showImage(file);
    }

    function showImage(file) {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Выберите изображение');
            return;
        }
        const imageUrl = URL.createObjectURL(file);

        preview.src = imageUrl;
        preview.style.display = 'block';
        uploadText.style.display = 'none';
    }

    if(clearButton) {
        clearButton.addEventListener("click", (e) => {
            e.preventDefault();
            formDescript.value = '';
            formTitle.value = '';
        })
    }

    if(sendButton) {
        sendButton.addEventListener("click", async (e) => {
            e.preventDefault();
            const file = fileInput.files[0];
            console.log(formTitle.value);
            console.log(formDescript.value);
            console.log(file);
            const data = await getCurrentSession();
            console.log(data.session);
            if(formTitle.value != '' && formDescript.value != '' && file != null)
                addProduct(formTitle.value, formDescript.value, file);
        })
    }
}