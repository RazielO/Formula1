<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet<[]> } = $props();
</script>

<main
  class="flex justify-center overflow-x-clip overflow-y-scroll bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-100"
>
  <div class="max-w-[50rem] px-4 py-8">
    {@render children()}
  </div>
</main>
