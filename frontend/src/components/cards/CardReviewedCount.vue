<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps(["flashcard", "reviewedCount"]);
const reviewedCount = computed(() => props.flashcard.reviewedCount);

</script>

<template>
    <div class="card-reviewed-count" v-if="props.flashcard">
        <p class="card-reviewed-count__new" v-if="reviewedCount === 0">
            New ✨
        </p>
        <p class="card-reviewed-count__memorized" v-else-if="reviewedCount === -1">
            Memorized
        </p>
        <p class="card-reviewed-count__count" v-else>
            Reviewed: {{reviewedCount}}
        </p>
    </div>
</template>

<style scoped>
.card-reviewed-count__new {
    color: rgb(247, 216, 37);
}

.card-reviewed-count__memorized {
    color: orange;
}

.card-reviewed-count__count {
    color: rgb(244, 157, 248);
}
</style>