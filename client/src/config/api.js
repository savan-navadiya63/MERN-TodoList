const apiBaseUrl = import.meta.env.VITE_API_URL || "";

export function buildApiUrl(path) {
  const cleanBaseUrl = apiBaseUrl.replace(/\/$/, "");
  return `${cleanBaseUrl}${path}`;
}
