import {Dashboard} from "./components/dashboard";
import {Login} from "./components/login";
import {SignUp} from "./components/sign-up";
import {FreelancersList} from "./components/freelancers/freelancers-list";
import {Logout} from "./components/freelancers/logout";

export class Router {

    constructor() {
        this.pageTitleElement = document.getElementById("page-title");
        this.contentElement = document.getElementById("content");
        this.adminLteStyleElement = document.getElementById("adminlte_style");

        this.initEvent();
        this.routes = [
            {
                route: '/',
                title: 'Dashboard',
                template: '/templates/pages/dashboard.html',
                useLayout: '/templates/layout.html',
                requiresAuth: true,
                load: () => {
                    new Dashboard();
                }

            },
            {
                route: '/404',
                title: 'Page Not Found',
                useLayout: false,
                template: '/templates/pages/404.html',
            },
            {
                route: '/login',
                title: 'Login',
                useLayout: false,
                template: '/templates/pages/login.html',
                load: () => {
                    document.body.classList.add('login-page');
                    document.body.style.height = '100vh';

                    new Login(this.openNewRoute.bind(this));
                },
                unload: () => {
                    document.body.classList.remove('login-page');
                    document.body.style.height = 'auto';
                },
                styles: [
                    'icheck-bootstrap.min.css'
                ]
            },
            {
                route: '/sign-up',
                title: 'Sign Up',
                template: '/templates/pages/sign-up.html',
                useLayout: false,
                load: () => {
                    document.body.classList.add('register-page');
                    document.body.style.height = '100vh';
                    new SignUp(this.openNewRoute.bind(this));
                },
                unload: () => {
                    document.body.classList.remove('register-page');
                    document.body.style.height = 'auto';
                },
                styles: [
                    'icheck-bootstrap.min.css'
                ]
            },{
            route: '/logout',
                load: () => {
                new Logout(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/freelancers',
                title: 'freelancers',
                template: '/templates/pages/freelancers/list.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new FreelancersList();
                }

            },
        ];
    }

    initEvent() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this))
    }
    async openNewRoute(url){
        const currentRoute = window.location.pathname;
        history.pushState({},'', url);
        await this.activateRoute(null, currentRoute);
    }

   async clickHandler(e){

        let element = null;
        if(e.target.nodeName === 'A'){
            element = e.target;
        } else if(e.target.parentNode.nodeName === 'A'){
            element = e.target.parentNode;
        }
        if(element){
            e.preventDefault();

            const url = element.href.replace(window.location.origin, '');
            if(!url || url ==='/#' || url.startsWith('javascript:void(0)')){
                return
            }
            await this.openNewRoute(url);
        }
    }

    async activateRoute(e, oldRoute = null) {
        if(oldRoute) {
            const currentRoute = this.routes.find(item => item.route === oldRoute);
            if (currentRoute.styles && currentRoute.styles.length > 0) {
                currentRoute.styles.forEach(style => {
                    document.querySelector(`link[href='/css/${style}']`).remove();
                })
                if (currentRoute.unload && typeof currentRoute.unload === 'function') {
                    currentRoute.unload();
                }
            }
        }

        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            if (newRoute.styles && newRoute.styles.length > 0) {
                newRoute.styles.forEach(style => {
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = '/css/' + style;
                    document.head.insertBefore(link, this.adminLteStyleElement);
                })

            }
            if (newRoute.title) {
                this.pageTitleElement.innerText = newRoute.title + ' | Freelance Studio';
            }
            if (newRoute.template) {

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
            history.pushState({},'', '/404');
            await this.activateRoute();
        }
    }
}