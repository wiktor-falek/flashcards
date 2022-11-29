import { useFlashcardStore } from "../stores/flashcardStore";
import { useUserStore } from "../stores/userStore";
import { getFlashcards } from "../api/flashcardApi";
import logout from "./logout";

export default async function authAndFetchData() {
  const flashcardStore = useFlashcardStore();
  const userStore = useUserStore();

  const fetchFlashcards = getFlashcards();
  const fetchUser = getUser();

  const flashcardsResponse = await fetchFlashcards;
  const userResponse = await fetchUser;

  if (flashcardsResponse.status === 401 || userResponse.status === 401) {
    return logout();
  }

  const loadUserData = async () => {
    const userResult = await userResponse.json();
    const userData = userResult;

    // TODO: set user data in userStore such as username, email
  };

  const loadFlashcardsData = async () => {
    const flashcardsResult = await flashcardsResponse.json();
    const allFlashcards = flashcardsResult.flashcards;

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
  };

  loadUserData();
  loadFlashcardsData()
}
