import { useFlashcardStore } from "../stores/flashcardStore";
import { getFlashcards } from "../api/flashcardApi";
import logout from "./logout";

export default async function authAndLoadFlashcards() {
  const flashcardStore = useFlashcardStore();

  const response = await getFlashcards();

  if (response.status === 401) {
    logout();
  }

  if (response.status === 200) {
    const result = await response.json();

    const flashcards = result.flashcards;
    flashcardStore.setFlashcards(flashcards);

    const memorizedFlashcards = result.memorized;
    flashcardStore.setMemorizedFlashcards(memorizedFlashcards);

    flashcardStore.hasFetchedFlashcards = true;
  }
}
