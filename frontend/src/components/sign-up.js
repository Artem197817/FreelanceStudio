import {AuthUtil} from "../utils/auth-util";
import {HttpUtils} from "../utils/http-utils";

export class SignUp{

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if(AuthUtil.getAuthInfo(AuthUtil.accessTokenKey)){
            return this.openNewRoute('/');
        }

        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.repeatPassworElement = document.getElementById('repeat-password');
        this.lastNamelement = document.getElementById('lastName');
        this.nameElement = document.getElementById('name');
        this.agreeElement = document.getElementById('agree');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('button-login').addEventListener('click',
            this.signUp.bind(this));
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none';
        if (this.validateForm()) {
            const result = await HttpUtils.request('/signup', 'POST',
                {
                    name: this.nameElement.value,
                    lastName: this.lastNamelement.value,
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                })

            // const result = await response.json();

            if (result.error ||!result.response ||(result.response && !result.response.accessToken
                || !result.response.refreshToken || !result.response.id || !result.response.name)) {
                this.commonErrorElement.style.display = 'block';
                return
            }

            AuthUtil.setAuthInfo(result.response.accessToken, result.response.refreshToken,
                {
                    id: result.response.id,
                    name: result.response.name
                });


            this.openNewRoute('/');
        }
    }

    validateForm() {
        let isValid = true;

        if (this.nameElement.value.trim()) {
            this.nameElement.classList.remove('is-invalid');
        } else {
            this.nameElement.classList.add('is-invalid');
            isValid = false;
        }
        if (this.lastNamelement.value.trim()) {
            this.lastNamelement.classList.remove('is-invalid');
        } else {
            this.lastNamelement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.emailElement.value.trim() && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.emailElement.value)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.passwordElement.value.trim() &&  /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(this.passwordElement.value)) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }
        if (this.passwordElement.value.trim() === this.repeatPassworElement.value.trim()) {
            this.repeatPassworElement.classList.remove('is-invalid');
        } else {
            this.repeatPassworElement.classList.add('is-invalid');
            isValid = false;
        }
        if (this.agreeElement.checked) {
            this.agreeElement.classList.remove('is-invalid');
        } else {
            this.agreeElement.classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }
}