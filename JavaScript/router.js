const routes = {};

export function addRoute(path, handler) {
    routes[path] = handler;
}

export function navigate(path) {
    if (path) window.location.hash = path;
    const current = window.location.hash.slice(1) || '/';
    if (current === '/' || current === '') {
        window.location.hash = '/lobby';
        return;
    }
    if (routes[current]) routes[current]();
    else console.warn(`Маршрут "${current}" не найден`);
}

export function initRouter() {
    window.addEventListener('hashchange', () => navigate());
    
    // Ждём пока DOM полностью загрузится и all.js отрендерит контент
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(navigate, 100));
    } else {
        setTimeout(navigate, 100);
    }
}