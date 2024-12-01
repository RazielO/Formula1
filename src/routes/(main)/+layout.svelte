<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { darkMode } from '$lib/stores';
	import type { Snippet } from 'svelte';
	import '../../app.css';
	import SeasonSelector from '$lib/components/SeasonSelector.svelte';
	let { children }: { children: Snippet<[]> } = $props();
</script>

<div class="{$darkMode ? 'dark' : ''} h-full">
	<Header>
		<SeasonSelector />
	</Header>

	<main
		class="flex h-full justify-center overflow-x-clip overflow-y-scroll bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-100"
	>
		<div class="max-w-[50rem] py-8">
			{@render children()}
		</div>
	</main>
</div>
