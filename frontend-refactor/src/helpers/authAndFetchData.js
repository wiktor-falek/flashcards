import { useFlashcardStore } from "../stores/flashcardStore";
import { useUserStore } from "../stores/userStore";
import { getFlashcards } from "../api/flashcardApi";
import { getUser } from "../api/userApi";
import logout from "./logout";

export default async function authAndFetchData() {
  const fetchFlashcards = getFlashcards();
  const fetchUser = getUser();

  const flashcardsResponse = await fetchFlashcards;
  const userResponse = await fetchUser;

  if (flashcardsResponse.status === 401 || userResponse.status === 401) {
    return logout();
  }

  const loadUserData = async () => {
    const userStore = useUserStore();

    const result = await userResponse.json();
    const userData = result;

    userStore.setUsername(userData.username);
    userStore.setEmail(userData.email);
    userStore.setHasConfirmedEmail(userData.hasConfirmedEmail);
  };

  const loadFlashcardsData = async () => {
    const flashcardStore = useFlashcardStore();

    const result = await flashcardsResponse.json();
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
  };

  loadUserData();
  loadFlashcardsData();
}
