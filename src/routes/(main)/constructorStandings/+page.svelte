<script lang="ts">
	import { Consumer } from '$lib/api/consumer';
	import ConstructorStandings from '$lib/components/ConstructorStandings.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { constructorStandings, seasonSelected } from '$lib/stores';
	import { onMount } from 'svelte';

	async function queryPositions() {
		if ($constructorStandings[$seasonSelected] === undefined) {
			let result = await Consumer.getConstructorStandings($seasonSelected);

			constructorStandings.update((value) => {
				value[$seasonSelected] = result;
				return value;
			});
		}
	}

	onMount(() => {
		seasonSelected.subscribe(() => queryPositions());
	});
</script>

<svelte:head><title>Formula One Data</title></svelte:head>

{#if $seasonSelected !== undefined && $constructorStandings[$seasonSelected] !== undefined}
	<h1 class="text-4xl font-bold">{$seasonSelected} Formula One World Championship</h1>
	<h2 class="text-2xl">Constructors Standings</h2>

	<ConstructorStandings constructors={$constructorStandings[$seasonSelected]} />
{:else}
	<Loader />
{/if}
