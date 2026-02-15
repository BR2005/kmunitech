import axios from 'axios';

function normalizeBaseUrl(url: string): string {
    return url.replace(/\/+$/, '');
}

const envApiUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? '';
const baseURL = envApiUrl
    ? normalizeBaseUrl(envApiUrl)
    : (import.meta.env.DEV ? 'http://localhost:3000' : '');

if (!baseURL) {
    // In production, missing VITE_API_URL usually means the app was built without the env var.
    // Axios will then fall back to same-origin requests (Vercel), which often shows up as NOT_FOUND.
    // Keep this as a runtime signal to catch misconfigured deployments quickly.
    // eslint-disable-next-line no-console
    console.error('Missing VITE_API_URL. Set it in Vercel Environment Variables and redeploy.');
}

const api = axios.create({
    // If baseURL is empty, axios will treat requests as relative.
    // That is intentionally noisy in production so misconfig doesn't go unnoticed.
    baseURL: baseURL || undefined,
});

export default api;
export { baseURL };
