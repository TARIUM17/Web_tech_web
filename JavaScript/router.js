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
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(navigate, 100));
    } else {
        setTimeout(navigate, 100);
    }
}