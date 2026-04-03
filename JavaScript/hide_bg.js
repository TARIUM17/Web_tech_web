export default function Hide(content_next){
    const content = document.querySelector('header');
    const video = document.getElementById('bg-video');
    video.style.opacity = 0;
    
    let nextElement = content.nextElementSibling;
    while (nextElement) {
        const next = nextElement.nextElementSibling;
        nextElement.remove();
        nextElement = next;
    }

    content.insertAdjacentHTML('afterend', content_next);
}