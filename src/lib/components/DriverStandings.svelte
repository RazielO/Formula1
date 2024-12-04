<script lang="ts">
	import type { DriverStanding } from '$lib/api/types/DriverStanding';
		import { nationalities } from "$lib/nationalities";
	import Icon from '@iconify/svelte';

	let { drivers }: { drivers: DriverStanding[] } = $props();

	function nationalityCode(nationality: string) {
		nationality = nationality.toLowerCase();
		if (nationalities[nationality] !== undefined) {
			return nationalities[nationality];
		} else if (nationalities[nationality.split('-')[0]] !== undefined) {
			return nationalities[nationality.split('-')[0]];
		} else if (nationalities[nationality.split('-')[1]] !== undefined) {
			return nationalities[nationality.split('-')[1]];
		}
	}
</script>

<table class="table">
	<thead>
		<tr>
			<th class="round-column">Pos.</th>
			<th>Name</th>
			<th class="nationality-column">Nationality</th>
			<th class="constructor-column">Constructor(s)</th>
			<th>Points</th>
			<th>Wins</th>
		</tr>
	</thead>
	<tbody>
		{#each drivers as driver}
			<tr>
				<td class="round-column">
					{driver.positionText}
				</td>
				<td>
					{driver.Driver.givenName}
					{driver.Driver.familyName}
				</td>
				<td class="nationality-column">
					{#if nationalityCode(driver.Driver.nationality) !== undefined}
						<Icon
							icon="flagpack:{nationalityCode(driver.Driver.nationality)}"
							width="32"
							height="24"
						/>
					{:else}
						<span>{driver.Driver.nationality}</span>
					{/if}
				</td>
				<td class="constructor-column">
					{driver.Constructors.map((c) => c.name).join(', ')}
				</td>
				<td>
					{driver.points}
				</td>
				<td>
					{driver.wins}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	@media (max-width: 600px) {
		.constructor-column {
			display: none;
		}
	}

	@media (max-width: 500px) {
		.nationality-column {
			display: none;
		}
	}
</style>
