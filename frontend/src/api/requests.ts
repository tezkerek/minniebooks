const BASE_URL = "http://127.0.0.1:8000/api";

export async function post(url: string, data: any) {
  const headers: HeadersInit = { "Content-Type": "application/json" };

  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    headers["Authorization"] = `Token ${authToken}`;
  }

  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(await response.json());
  }
}
