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
    const { username, email, hasConfirmedEmail} = result;

    userStore.setUsername(username);
    userStore.setEmail(email);
    userStore.setHasConfirmedEmail(hasConfirmedEmail);
  };

  const loadFlashcardsData = async () => {
    const flashcardStore = useFlashcardStore();

    const result = await flashcardsResponse.json();
    const flashcards = result.flashcards;

    flashcardStore.setFlashcards(flashcards);
    flashcardStore.hasFetchedFlashcards = true;
  };

  loadUserData();
  loadFlashcardsData();
}
