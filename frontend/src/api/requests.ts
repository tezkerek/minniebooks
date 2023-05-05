const BASE_URL = "http://127.0.0.1:8000/api";

export async function post(url: string, data: any) {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(await response.json());
  }
}
