<script lang="ts">
  import { Consumer } from '$lib/api/consumer';
  import type { Race } from '$lib/api/types/Races';
  import Loader from '$lib/components/Loader.svelte';
  import { seasonSelected, rounds } from '$lib/stores';
  import { onMount } from 'svelte';
  import { Tooltip } from '@skeletonlabs/skeleton-svelte';

  async function queryRaces() {
    if (
      $seasonSelected !== undefined &&
      ($rounds[$seasonSelected] === undefined || $rounds[$seasonSelected].length === 0)
    ) {
      let races: Race[] = await Consumer.getRaces($seasonSelected);

      rounds.update((value) => {
        value[$seasonSelected] = races;
        return value;
      });
    }
  }

  onMount(() => {
    seasonSelected.subscribe(() => queryRaces());
  });
</script>

<svelte:head><title>Formula One Data</title></svelte:head>

{#if $seasonSelected !== undefined && $rounds[$seasonSelected] !== undefined}
  <h1 class="text-4xl font-bold">{$seasonSelected} Formula One World Championship</h1>
  <h2 class="text-2xl">Races</h2>

  <table class="table mb-16">
    <thead>
      <tr>
        <th class="round-column">No.</th>
        <th>GP</th>
        <th class="circuit-column">Circuit</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each $rounds[$seasonSelected] as race}
        <tr>
          <td class="round-column">{race.round}</td>
          <td>{race.raceName.replace('Grand Prix', 'GP')}</td>
          <td class="circuit-column">
            <div class="tooltip">
              <Tooltip
                open={false}
                positioning={{ placement: 'top' }}
                triggerBase="underline"
                contentBase="card preset-filled p-4"
                openDelay={200}
              >
                {#snippet trigger()}
                  {race.Circuit.circuitName}
                {/snippet}
                {#snippet content()}
                  {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                {/snippet}
              </Tooltip>
            </div>
          </td>
          <td>
            <a
              href="/{$seasonSelected}/{race.round}/background"
              class="text-blue-700 underline dark:text-blue-500">Info</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <Loader />
{/if}

<style>
  @media (max-width: 600px) {
    .circuit-column {
      display: none;
    }
  }
</style>
