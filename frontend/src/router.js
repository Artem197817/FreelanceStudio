import {Dashboard} from "./components/dashboard";
import {Login} from "./components/login";
import {SignUp} from "./components/sign-up";

export class Router {

    constructor() {
        this.pageTitleElement = document.getElementById("page-title");
        this.contentElement = document.getElementById("content");

        this.initEvent();
        this.routes = [
            {
                route: '/',
                title: 'Dashboard',
                template: '/templates/dashboard.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Dashboard();
                }

            },
            {
                route: '/404',
                title: 'Page Not Found',
                useLayout: false,
                template: '/templates/404.html',
            },
            {
                route: '/login',
                title: 'Login',
                useLayout: false,
                template: '/templates/login.html',
                load: () => {
                    document.body.classList.add('login-page');
                    document.body.style.height = '100vh';

                    new Login();
                },
                styles: [
                    'icheck-bootstrap.min.css'
                ]
            },
            {
                route: '/sign-up',
                title: 'Sign Up',
                template: '/templates/sign-up.html',
                useLayout: false,
                load: () => {
                    new SignUp();
                }
            },
        ];
    }

    initEvent() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
    }

    async activateRoute(to, from, next) {
        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            if (newRoute.styles && newRoute.styles.length > 0) {
                newRoute.styles.forEach(style => {
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = '/css/' + style;
                })
            }
            if (newRoute.title) {
                this.pageTitleElement.innerText = newRoute.title + ' | Freelance Studio';
            }
            if (newRoute.template) {
                document.body.className = '';
                let contentBlock = this.contentElement
                if (newRoute.useLayout) {
                    this.contentElement.innerHTML = await fetch(newRoute.useLayout)
                        .then(response => response.text())
                    contentBlock = document.getElementById('content-layout');
                    document.body.classList.add('sidebar-mini');
                    document.body.classList.add('layout-fixed');
                } else{
                    document.body.classList.remove('sidebar-mini');
                    document.body.classList.remove('layout-fixed');
                }
                contentBlock.innerHTML = await fetch(newRoute.template)
                    .then(response => response.text())
            }

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        } else {
            console.log('No route found');
            location.hash = '/404';
        }
    }
}