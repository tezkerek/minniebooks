const BASE_URL = "http://127.0.0.1:8000/";

const fetcher = (url: string) =>
  fetch(joinPaths(BASE_URL, url)).then((response) =>
    response.ok
      ? response.json()
      : response.json().then((json) => {
          throw new Error(json);
        })
  );

const authFetcher = async (url: string) => {
  const headers: HeadersInit = { "Content-Type": "application/json" };

  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    headers["Authorization"] = `Token ${authToken}`;
  }

  const response = await fetch(joinPaths(BASE_URL, url), {
    method: "GET",
    headers,
  });

  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(await response.json());
  }
};

function joinPaths(base: string, url: string): string {
  return (
    (base.endsWith("/") ? base.substring(0, base.length - 1) : base) +
    (url.startsWith("/") ? url : "/" + url)
  );
}

export { fetcher, authFetcher };
