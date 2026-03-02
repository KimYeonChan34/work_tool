export default class CookieUtils {
    static get(name) {
        if (typeof name !== 'string' || name.trim() === '') {
            return null;
        }

        const encodedName = encodeURIComponent(name);
        const cookie = `; ${document.cookie}`;
        const value = cookie.split(`; ${encodedName}=`);

        if (value.length === 2) {
            return decodeURIComponent(value[1].split(';')[0]);
        }

        return null;
    }

    /**
     * @param {string} name
     * @param {string} value
     * @param {number} expires - seconds
     */
    static set(name, value, expires) {
        if (typeof name !== 'string' || name.trim() === '') {
            return;
        }

        if (value === null || value === undefined) {
            return;
        }

        if (typeof expires !== 'number' || expires < 0) {
            return;
        }

        const encodedName = encodeURIComponent(name);
        const encodedValue = encodeURIComponent(String(value));

        document.cookie = `${encodedName}=${encodedValue}; max-age=${expires}; path=/; Secure; SameSite=None`;
    }
}
