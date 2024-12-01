<script lang="ts">
	import { Consumer } from '$lib/api/consumer';
	import type { RaceResult } from '$lib/api/types/RaceResult';
	import Loader from '$lib/components/Loader.svelte';
	import { rounds } from '$lib/stores';
	import { timeToMilliseconds } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let { data }: { data: { year: number; round: number } } = $props();
	const year = data.year;
	const round = data.round;
	let fastest: RaceResult | undefined = $state();

	onMount(async () => {
		const info = await Consumer.getSprintResults(year, round + 1);

		rounds.update((value) => {
			$rounds[year][round].SprintResults = info;
			return value;
		});
		fastest = info.filter(r => r.FastestLap.rank === "1")[0];
	});
</script>

{#if $rounds[year] !== undefined && $rounds[year][round] !== undefined && $rounds[year][round].SprintResults !== undefined}
	{#if $rounds[year][round].SprintResults.length === 0}
		<h1 class="mb-4 text-4xl font-bold">Sorry! There is no information for this race</h1>
	{:else}
		<h1 class="mb-4 text-4xl font-bold">{year} {$rounds[year][round].raceName}</h1>

		{#if fastest !== undefined}
			<div class="py-4">
				<h2 class="mb-1 text-2xl font-bold">Fastest Lap</h2>
				<p class="text-lg">
					{fastest.Driver.givenName}
					{fastest.Driver.familyName} ({fastest.Constructor.name})
				</p>
				<span class="flex items-center gap-2 text-lg">
					<Icon icon="octicon:stopwatch-16" />
					{fastest.FastestLap.Time.time}
				</span>
			</div>
		{/if}

		<h2 class="mb-1 text-2xl font-bold">Sprint results</h2>

		<table class="mb-16 table">
			<thead>
				<tr>
					<th>Pos.</th>
					<th>Name</th>
					<th class="constructor-column">Constructor</th>
					<th class="status-column">Status</th>
					<th class="points-column">Points</th>
				</tr>
			</thead>
			<tbody>
				{#each $rounds[year][round].SprintResults as result, i}
					<tr>
						<td>
							<div class="flex items-center">
								{i + 1}
								(
								{#if parseInt(result.grid) === i + 1}
									<Icon icon="material-symbols:equal-rounded" />
								{:else if parseInt(result.grid) > i + 1}
									<div class="dark:text-success-500 text-success-900 flex items-center">
										<Icon icon="mdi:chevron-up" />
										{parseInt(result.grid) - (i + 1)}
									</div>
								{:else}
									<div class="dark:text-error-500 text-error-900 flex items-center">
										<Icon icon="mdi:chevron-down" />
										{i + 1 - parseInt(result.grid)}
									</div>
								{/if}
								)
							</div>
						</td>
						<td>{result.Driver.givenName} {result.Driver.familyName}</td>
						<td class="constructor-column">{result.Constructor.name}</td>
						<td class="status-column">{result.status}</td>
						<td class="points-column">{result.points}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
{:else}
	<Loader />
{/if}

<style>
	@media (max-width: 800px) {
		.status-column {
			display: none;
		}
	}

	@media (max-width: 500px) {
		.constructor-column {
			display: none;
		}
	}
</style>
