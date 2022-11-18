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

    const allFlashcards = result.flashcards;

    const flashcards = [];
    const memorizedFlashcards = [];
    for (let i = 0; i < allFlashcards.length; i++) {
      const flashcard = allFlashcards[i];
      if (flashcard.reviewedCount === -1) {
        memorizedFlashcards.push(flashcard);
        continue;
      }
      flashcards.push(flashcard);
    }

    flashcardStore.setFlashcards(flashcards);
    flashcardStore.setMemorizedFlashcards(memorizedFlashcards);

    flashcardStore.hasFetchedFlashcards = true;
  }
}
