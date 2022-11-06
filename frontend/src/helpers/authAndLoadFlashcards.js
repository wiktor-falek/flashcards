import { useAuthStore } from "../stores/authStore";
import { useFlashcardStore } from "../stores/flashcardStore";
import { getFlashcards } from "../api/flashcardApi";
import router from "../router";
import logout from "./logout";

export default async function authAndLoadFlashcards() {
  const authStore = useAuthStore();
  const flashcardStore = useFlashcardStore();

  const response = await getFlashcards();

  if (response.status === 401) {
    logout()
  }

  if (response.status === 200) {
    const result = await response.json();
    const flashcards = result.flashcards;
    flashcardStore.setFlashcards(flashcards);
    flashcardStore.hasFetchedFlashcards = true;
  }
}
