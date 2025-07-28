export function handleRedirect(path: string = "/", lang: string = "ca-mall") {
    globalThis.window.location.href = `/${lang}${path}`;
}