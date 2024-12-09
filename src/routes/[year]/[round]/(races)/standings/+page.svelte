<script lang="ts">
  import { rounds } from '$lib/stores';
  import { Consumer } from '$lib/api/consumer';
  import DriverStandings from '$lib/components/DriverStandings.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { onMount } from 'svelte';
  import ConstructorStandings from '$lib/components/ConstructorStandings.svelte';

  let { data }: { data: { year: number; round: number } } = $props();
  const year = data.year;
  const round = data.round;

  onMount(async () => {
    const drivers = await Consumer.getDriverStandings(year, round + 1);
    const constructors = await Consumer.getConstructorStandings(year, round + 1);
    rounds.update((value) => {
      $rounds[year][round].driverStandings = drivers;
      $rounds[year][round].constructorStandings = constructors;
      return value;
    });
  });
</script>

{#if $rounds[year] !== undefined && $rounds[year][round] !== undefined && $rounds[year][round].driverStandings !== undefined && $rounds[year][round].constructorStandings !== undefined}
  <h1 class="mb-4 text-4xl font-bold">{year} {$rounds[year][round].raceName}</h1>
  <h2 class="mb-1 text-2xl font-bold">Standings after the race</h2>

  {#if $rounds[year][round].driverStandings !== undefined}
    <h3 class="mb-1 text-xl font-bold">Driver Standings</h3>
    <DriverStandings drivers={$rounds[year][round].driverStandings} />
  {/if}

  {#if $rounds[year][round].constructorStandings !== undefined}
    <h3 class="mb-1 mt-4 text-xl font-bold">Constructor Standings</h3>
    <ConstructorStandings constructors={$rounds[year][round].constructorStandings} />
  {/if}
{:else}
  <Loader />
{/if}
