import {AuthUtil} from "../../utils/auth-util";
import {HttpUtils} from "../../utils/http-utils";

export class Logout {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtil.getAuthInfo(AuthUtil.accessTokenKey) && !AuthUtil.getAuthInfo(AuthUtil.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }


        this.logout().then();
    }

    async logout() {
        await HttpUtils.request('/logout', 'POST',
            {
                refreshToken: AuthUtil.getAuthInfo(AuthUtil.refreshTokenKey),
            })

        AuthUtil.removeAuthInfo();

        this.openNewRoute('/login');
    }

}