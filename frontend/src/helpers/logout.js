import { useAuthStore } from "../stores/authStore";
import router from "../router";

export default function logout() {
  const authStore = useAuthStore();

  localStorage.setItem("isAuthenticated", "false");
  authStore.setIsAuthenticated(false);
  document.cookie = "sessionId2= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  return router.push("/signin");
}
