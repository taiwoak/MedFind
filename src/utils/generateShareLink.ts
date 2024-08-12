export const generateShareLink = (params: any) => {
    const baseUrl = window.location.href;
    const queryString = new URLSearchParams(params).toString();
    return `${baseUrl}?${queryString}`;
  };
  