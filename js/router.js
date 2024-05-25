export class Router {
    routes = {};

    addRoute(pathName, path) {
        this.routes[pathName] = path;
    }

    handle() {
        const { pathname } = window.location;

        const root = document.querySelector("#root");
    
        this.changeStrong(pathname)
    
        const routeRequest = this.routes[pathname] || this.routes[404];

        const getLoading = this.loading();

        root.innerHTML = getLoading;
    
        fetch(routeRequest)
            .then(data => data.text())
            .then(html => {
                const index = html.indexOf('<div class="content');
                const discardingUnnecessaryContent = html.slice(index);
                const indexEnd = discardingUnnecessaryContent.lastIndexOf("</div");
                root.innerHTML = discardingUnnecessaryContent.slice(0, indexEnd);
                console.log(discardingUnnecessaryContent.slice(0, indexEnd))
            })
    }

    changeStrong(pathname) {
        if(!document.querySelector('a[href="' + pathname + '"]')) {
            return
        }

        document.querySelector('.page-current').classList.remove("page-current");
    
        document.querySelector('a[href="' + pathname + '"]').classList.add("page-current");
    }

    loading() {
        const img = `<div class="container-loading"><img src="./loading/rotate.png" alt="loading" class="loading"></div>`;

        return img;
    }
}