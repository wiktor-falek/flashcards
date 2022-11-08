import { useAuthStore } from "../stores/authStore";
import router from "../router";

export default function logout() {
  const authStore = useAuthStore();

  localStorage.setItem("isAuthenticated", "false");
  authStore.setIsAuthenticated(false);
  console.log(document.cookie);
  document.cookie = "sessionId2= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  console.log(document.cookie);
  return router.push("/signin");
}
