function getUrl(path: string, params: Record<string, unknown>) {
    const url = new URL(path);
    for (const [k, v] of Object.entries(params)) {
        if (Array.isArray(v)) {
            url.searchParams.set(k, v.join(','));
            continue;
        }
        url.searchParams.set(k, String(v));
    }
    return url.toString();
}

export default getUrl;