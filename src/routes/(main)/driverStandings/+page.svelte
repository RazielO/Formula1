<script lang="ts">
  import { Consumer } from '$lib/api/consumer';
  import DriverStandings from '$lib/components/DriverStandings.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { seasonSelected, driverStandings } from '$lib/stores';
  import { onMount } from 'svelte';

  async function queryPositions() {
    if ($driverStandings[$seasonSelected] === undefined) {
      let result = await Consumer.getDriverStandings($seasonSelected);

      driverStandings.update((value) => {
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

{#if $seasonSelected !== undefined && $driverStandings[$seasonSelected] !== undefined}
  <h1 class="text-4xl font-bold">{$seasonSelected} Formula One World Championship</h1>
  <h2 class="text-2xl">Driver Standings</h2>

  <DriverStandings drivers={$driverStandings[$seasonSelected]} />
{:else}
  <Loader />
{/if}
