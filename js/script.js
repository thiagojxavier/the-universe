import { Router } from "./router.js";

const linksNavigator = document.querySelectorAll('a');
const router = new Router();

router.addRoute("/", "/index.html");
router.addRoute("/universe", "/pages/universe.html");
router.addRoute("/exploration", "/pages/exploration.html");
router.addRoute(404, "/pages/404.html");

function route(event) {
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    router.handle();
}

window.onpopstate = () => router.handle();
window.route = () => route();
router.handle();

linksNavigator.forEach(a => {
    a.addEventListener("click", route);
})