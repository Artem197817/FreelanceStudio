export class AuthUtil {
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userinfoKey = 'userInfo';

    static setAuthInfo(accessToken, refreshToken, userInfo) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
        localStorage.setItem(this.userinfoKey, JSON.stringify(userInfo));
    }

    static removeAuthInfo() {
        localStorage.removeItem(AuthUtil.accessTokenKey);
        localStorage.removeItem(AuthUtil.accessTokenKey);
        localStorage.removeItem(AuthUtil.userinfoKey);
    }

    static getAuthInfo(key = null) {
        if (key && [this.accessTokenKey, this.refreshTokenKey, this.userinfoKey].includes(key)) {
            return  localStorage.getItem(key);

        } else {
            return {
                [this.accessTokenKey]: localStorage.getItem(this.accessTokenKey),
                [this.refreshTokenKey]: localStorage.getItem(this.refreshTokenKey),
                [this.userinfoKey]: localStorage.getItem(this.userinfoKey),
            }
        }
    }
}