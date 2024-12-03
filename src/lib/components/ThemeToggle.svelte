<script>
	import { darkMode } from '$lib/stores';

	import Icon from '@iconify/svelte';
</script>

<button
	type="button"
	class="button flex items-center gap-2 rounded-md px-2 py-2"
	onclick={() => darkMode.update((value) => (value = !value))}
>
	{#if $darkMode}
		<Icon icon="lucide:sun" />
	{:else}
		<Icon icon="lucide:moon-star" />
	{/if}
	Switch theme
</button>
