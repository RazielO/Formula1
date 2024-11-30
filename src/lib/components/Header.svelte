<script lang="ts">
	import { darkMode } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import SeasonSelector from './SeasonSelector.svelte';

	function switchTheme() {
		darkMode.update((value) => (value = !value));
	}
</script>

<header
	class="sticky top-0 z-10 flex bg-zinc-300 p-4 backdrop-blur-sm dark:bg-zinc-900 dark:text-zinc-100"
>
	<SeasonSelector />

	<button type="button" class="btn preset-outlined-surface-500" onclick={switchTheme}>
		{#if $darkMode}
			<Icon icon="ph:sun-dim" height="1.5rem" />
		{:else}
			<Icon icon="ph:sun-dim-fill" height="1.5rem" />
		{/if}
	</button>
</header>
