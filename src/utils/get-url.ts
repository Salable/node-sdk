function getUrl(url: string, params?: Record<string, unknown>) {
    if (!params) return url;
    const paramList = Object.entries(params);
    if (!paramList.length) return url;
    const searchParams = paramList.map(([k, v]) => (Array.isArray(v) ? `${k}=${v.join(',')}` : `${k}=${v}`));
    return `${url}?${searchParams.join('&')}`;
}

export default getUrl;
