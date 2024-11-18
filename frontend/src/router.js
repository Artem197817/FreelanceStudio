import {Dashboard} from "./components/dashboard";

export class Router{

    constructor(){
        this.pageTitleElement = document.getElementById("page-title");
        this.contentElement = document.getElementById("content");


       this.initEvent();
       this.routes = [
           {
               route: '/',
               title: 'Dashboard',
               template: '/templates/dashboard.html',
               load: () => {

               }

           },
           {
               route: '/404',
               title: 'Page Not Found',
               template: '/templates/404.html',
           },
           {
               route: '/login',
               title: 'Login',
               template: '/templates/login.html',
               load: () => {
                   new Dashboard();
               }
           },
           {
               route: '/sign-up',
               title: 'Sign Up',
               template: '/templates/sign-up.html',
               load: () => {

               }
           },
       ];
    }
    initEvent(){
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
    }
  async activateRoute(to, from, next){
      const urlRoute = window.location.pathname;
      const newRoute = this.routes.find(item => item.route === urlRoute);

      if(newRoute){
        if(newRoute.title){
            this.pageTitleElement.innerText = newRoute.title + ' | Freelance Studio';
        }
        if(newRoute.template){
            this.contentElement.innerHTML = await fetch(newRoute.template)
                .then(response => response.text())
        }
      } else {
          console.log('No route found');
          location.hash = '/404';
      }
    }
}