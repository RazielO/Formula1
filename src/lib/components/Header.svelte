<script lang="ts">
	import { darkMode } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet<[]> } = $props();

	function switchTheme() {
		darkMode.update((value) => (value = !value));
	}
</script>

<header
	class="px-8 sticky top-0 z-10 flex flex justify-between bg-zinc-300 p-4 backdrop-blur-sm dark:bg-zinc-900 dark:text-zinc-100"
>
	{@render children()}

	<button type="button" class="btn preset-outlined-surface-500 rounded-full" onclick={switchTheme}>
		{#if $darkMode}
			<Icon icon="ph:sun-dim" height="1.5rem" />
		{:else}
			<Icon icon="ph:sun-dim-fill" height="1.5rem" />
		{/if}
	</button>
</header>
