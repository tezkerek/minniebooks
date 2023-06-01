import { post } from "./requests"

export async function login(email: string, password: string) {
  return post("login/", { email, password }).then(({ token }) => {
    localStorage.setItem("authToken", token)
    return true
  })
}
export async function register(firstName: string, lastName: string, email: string, password: string) {
  return post("register/", { first_name: firstName, last_name: lastName, email, password })
}

export async function logout() {
  localStorage.removeItem("authToken")
}

export function isAuthenticated(): boolean {
  return typeof window !== "undefined" && localStorage.getItem("authToken") !== null
}
