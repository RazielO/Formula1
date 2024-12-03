<script lang="ts">
	import { onMount } from 'svelte';
	import { seasonSelected, startSeason } from '$lib/stores';
	import { Consumer } from '$lib/api/consumer';
	import Loader from './Loader.svelte';

	let lastSeason: undefined | number = $state(undefined);

	function createRange(start: number, end: number): number[] {
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	}

	onMount(async () => {
		lastSeason = new Date().getFullYear();

		if ($seasonSelected === undefined) {
			seasonSelected.set(lastSeason);
		}
		if ($startSeason === undefined) {
			let response: number = await Consumer.getFirstSeason();
			startSeason.set(response);
		}
	});
</script>

{#if lastSeason !== undefined && $startSeason !== undefined}
	<select class="select w-24 px-4 h-8 my-auto sm:h-12" bind:value={$seasonSelected}>
		{#each createRange($startSeason, lastSeason).reverse() as season}
			<option value={season}>{season}</option>
		{/each}
	</select>
{:else}
	<Loader />
{/if}
