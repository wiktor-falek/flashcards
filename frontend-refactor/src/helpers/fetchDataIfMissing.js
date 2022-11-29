import { useFlashcardStore } from "../stores/flashcardStore";
import { useUserStore } from "../stores/userStore";
import authAndFetchData from "../helpers/authAndFetchData";

/**
 * fetches data inside a component, if stores are missing the data
 * 
 * USAGE:
 * onBeforeMount(() => {
 *   fetchDataIfMissing();
 * });
 */
export default function fetchDataIfMissing() {
  const flashcardStore = useFlashcardStore();
  const userStore = useUserStore();

  if (!userStore.hasFetchedData || !flashcardStore.hasFetchedData) {
    authAndFetchData();
  }
}
