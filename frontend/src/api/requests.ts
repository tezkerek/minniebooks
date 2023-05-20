const BASE_URL = "http://127.0.0.1:8000/api";

async function performRequest(method: string, url: string, data?: any) {
  const headers: HeadersInit = { "Content-Type": "application/json" };

  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    headers["Authorization"] = `Token ${authToken}`;
  }

  const response = await fetch(`${BASE_URL}/${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  if (response.ok) {
    if (response.status != 204) {
      return await response.json();
    }
  } else {
    return Promise.reject(await response.json());
  }
}

export async function post(url: string, data: any) {
  return performRequest("POST", url, data);
}

export async function performPut(url: string, data: any) {
  return performRequest("PUT", url, data);
}

export async function performDelete(url: string) {
  return performRequest("DELETE", url);
}
