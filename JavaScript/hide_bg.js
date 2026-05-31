import { content_footer } from './footer.js';

export default function Hide(content_next){
    const content = document.querySelector('header');
    const video = document.getElementById('bg-video');
    if (video) video.style.opacity = 0;
    
    let nextElement = content.nextElementSibling;
    while (nextElement) {
        const next = nextElement.nextElementSibling;
        nextElement.remove();
        nextElement = next;
    }

    content.insertAdjacentHTML('afterend', content_next);

    const enter = document.getElementById('main_block');
    console.log(enter);
    if(enter)
        enter.insertAdjacentHTML('afterend', content_footer)
}

// import { content_footer } from './footer.js';

// export default function Hide(content_next) {
//     const header = document.querySelector('header');
//     const video = document.getElementById('bg-video');

//     if (video) video.style.opacity = 0;

//     // удалить всё после header
//     let nextElement = header.nextElementSibling;
//     while (nextElement) {
//         const next = nextElement.nextElementSibling;
//         nextElement.remove();
//         nextElement = next;
//     }

//     const wrapper = document.createElement('main');

//     const temp = document.createElement('div');
//     temp.innerHTML = content_next + content_footer;

//     wrapper.append(...temp.childNodes);

//     header.insertAdjacentElement('afterend', wrapper);
// }