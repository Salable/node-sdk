function getUrl(url: string, params: Record<string, unknown>) {
    const paramList = Object.entries(params);
    if (!paramList.length) return url;
    const searchParams = [];
    for (const [k, v] of Object.entries(params)) {
        if (Array.isArray(v)) {
            searchParams.push(`${k}=${v.join(',')}`)
            continue;
        }
        searchParams.push(`${k}=${v}`)
    }
    return `${url}?${searchParams.join('&')}`;
}

export default getUrl;