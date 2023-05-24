import { post } from "./requests"

export async function login(email: string, password: string) {
  return post("login/", { email, password }).then(({ token }) => {
    localStorage.setItem("authToken", token)
    return true
  })
}
export async function register(first_name: string, last_name: string, email: string, password: string) {
  return post("register/", { first_name, last_name, email, password })
}

export async function logout() {
  localStorage.removeItem("authToken")
}

export function isAuthenticated(): boolean {
  return typeof window !== "undefined" && localStorage.getItem("authToken") !== null
}
