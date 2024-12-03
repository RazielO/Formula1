<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { darkMode } from '$lib/stores';
	import type { Snippet } from 'svelte';
	import '../../app.css';
	import SeasonSelector from '$lib/components/SeasonSelector.svelte';
	import MainContainer from '$lib/components/MainContainer.svelte';
	let { children }: { children: Snippet<[]> } = $props();
</script>

<div class="{$darkMode ? 'dark' : ''} h-full">
	<Header>
		{#snippet lead()}
			<SeasonSelector />
		{/snippet}

		{#snippet links()}
			<div></div>
		{/snippet}
	</Header>

	<MainContainer>
		{@render children()}
	</MainContainer>
</div>
