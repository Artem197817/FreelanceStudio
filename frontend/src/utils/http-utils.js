import config from "../config/config";
import result from "admin-lte/plugins/jszip/jszip";

export class HttpUtils {
    static async request(url, method = 'GET', body = null) {
        const result = {
            error: false,
            response: null,
        }
        const params = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        if (body) {
            params.body = JSON.stringify(body);
        }

        let response = null;
        try {
            response = await fetch(config.api + url, params);
            result.response = await response.json();
        } catch (err) {
            result.error = true;
            return result;
        }
        if (!response.ok) {
            result.error = true;
        }
        return result;
    }
}