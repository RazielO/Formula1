<script lang="ts">
	import { fetchBackground } from '$lib/api/wikipedia';
	import Loader from '$lib/components/Loader.svelte';
	import { rounds } from '$lib/stores';
	import { onMount } from 'svelte';

	let { data }: { data: { year: number; round: number } } = $props();
	const year = data.year;
	const round = data.round;

	onMount(async () => {
		const info = await fetchBackground($rounds[year][round].url);
		rounds.update((value) => {
			value[year][round].hasBackground = info.hasBackground;
			value[year][round].background = info.background;
			return value;
		});
	});
</script>

{#if $rounds[year] !== undefined && $rounds[year][round] !== undefined && $rounds[year][round].background !== undefined}
	<h1 class="mb-4 text-4xl font-bold">{year} {$rounds[year][round].raceName}</h1>
	<h2 class="mb-1 text-2xl font-bold">Background</h2>

	{#if !$rounds[year][round].hasBackground}
		<h3 class="text-xl">
			The wikipedia site did not have a 'Background' section, so this is the general information of
			the GP.
		</h3>
	{/if}

	{#each $rounds[year][round].background.text.split('\n') as paragraph}
		<p class="mb-4">{paragraph}</p>
	{/each}

	{#each $rounds[year][round].background.children as child}
		<h3 class="mb-1 text-lg font-bold">{child.title}</h3>

		{#each child.text.split('\n') as paragraph}
			<p class="mb-4">{paragraph}</p>
		{/each}
	{/each}

	<small>
		Info obtained from <a class="underline" target="_blank" href={$rounds[year][round].url}
			>wikipedia</a
		>
	</small>
{:else}
	<Loader />
{/if}
