import { useAuthStore } from "../stores/authStore";
import router from "../router";

export default function logout() {
  const authStore = useAuthStore();

  localStorage.setItem("isAuthenticated", "false");
  authStore.setIsAuthenticated(false);
  // delete secondary cookie
  
  return router.push("/signin");
}
