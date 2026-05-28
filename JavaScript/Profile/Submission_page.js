import {content_sub_page} from "./Submission_page_html.js";
import  Hide  from "../hide_bg.js";
import { addRoute, navigate } from "../router.js";
import { addProduct } from "../../API/products/addProduct.js";

const page_button = document.getElementById('invention_form');

if(page_button) { 
    page_button.addEventListener("click", (e) => {
        e.preventDefault();
        navigate('/profile/form_page');
    })
}

export async function renderSubmissionPage() {
    const isAuth = await requireAuth();
    if (!isAuth) {
        navigate('/enter');
        return;
    }

    await SubmissionPage();
}

export async function SubmissionPage() {
    Hide(content_sub_page);

    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const uploadText = document.getElementById('uploadText');
    const uploadArea = document.getElementById('uploadArea');

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
}