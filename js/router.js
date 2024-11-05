export class Router {
    routes = {};

    addRoute(pathName, path) {
        this.routes[pathName] = path;
    }

    handle() {
        let { pathname } = window.location;

        const root = document.querySelector("#root");
    
        this.changeStrong(pathname)

        if(pathname === "/index.html") {
            pathname = "/"
        }
    
        const routeRequest = this.routes[pathname] || this.routes[404];

        const getLoading = this.loading();

        root.innerHTML = getLoading;
        this.changeBackground(pathname);
    
        fetch(routeRequest)
            .then(data => data.text())
            .then(html => {
                const index = html.indexOf('<div class="content');
                const discardingUnnecessaryContent = html.slice(index);
                const indexEnd = discardingUnnecessaryContent.lastIndexOf("</div");
                root.innerHTML = discardingUnnecessaryContent.slice(0, indexEnd);
            })
    }

    changeStrong(pathname) {
        const pathnameElement = {
            '/': document.getElementById('home'),
            '/universe': document.getElementById('universe'),
            '/exploration': document.getElementById('exploration')
        }

        if(!pathnameElement[pathname]) {
            console.log(pathnameElement[pathname])
            return
        }

        document.querySelector('.page-current').classList.remove("page-current");
    
        pathnameElement[pathname].classList.add("page-current");
    }

    loading() {
        const img = `<div class="container-loading"><img src="./loading/rotate.png" alt="loading" class="loading"></div>`;

        return img;
    }

    changeBackground(pathname) {
        const body = document.querySelector('body');

        switch (pathname) {
            case "/":
                body.className = "";
                body.classList.add("home");
                break;
            case "/universe":
                body.className = "";
                body.classList.add("universe");
                break;
            case "/exploration":
                body.className = "";
                body.classList.add("exploration")
                break;
            default:
                body.className = "";
                body.classList.add("home");
        }
    }
}
