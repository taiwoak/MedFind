export const generateShareLink = (params: Record<string, string>) => {
  const baseUrl = `${window.location.origin}/search`;
  const queryString = new URLSearchParams(params).toString();
  return `${baseUrl}?${queryString}`;
};