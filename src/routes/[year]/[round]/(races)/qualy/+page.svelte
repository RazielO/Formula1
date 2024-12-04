<script lang="ts">
  import { Consumer } from '$lib/api/consumer';
  import Loader from '$lib/components/Loader.svelte';
  import { rounds } from '$lib/stores';
  import { timeToMilliseconds } from '$lib/utils';
  import { onMount } from 'svelte';

  let { data }: { data: { year: number; round: number } } = $props();
  const year = data.year;
  const round = data.round;

  type Times = {
    name: string;
    constructor: string;
    time: string;
  };

  let oneRunOnly: boolean = $state(true);
  let activeBtn: number = $state(0);
  let times: Times[] = $state([]);

  function updateTimes(button: number) {
    const results = $rounds[year][round].QualifyingResults;

    if (button === 0) {
      times = results.map((elem) => {
        return {
          name: `${elem.Driver.givenName} ${elem.Driver.familyName}`,
          constructor: elem.Constructor.name,
          time: elem.Q3 !== undefined ? elem.Q3 : elem.Q2 !== undefined ? elem.Q2 : elem.Q1!,
        };
      });
    } else if (button === 1) {
      times = results.map((elem) => {
        return {
          name: `${elem.Driver.givenName} ${elem.Driver.familyName}`,
          constructor: elem.Constructor.name,
          time: elem.Q1!,
        };
      });
    } else if (button === 2) {
      times = results
        .filter((elem) => elem.Q2 !== undefined)
        .map((elem) => {
          return {
            name: `${elem.Driver.givenName} ${elem.Driver.familyName}`,
            constructor: elem.Constructor.name,
            time: elem.Q2!,
          };
        });
    } else if (button === 3) {
      times = results
        .filter((elem) => elem.Q3 !== undefined)
        .map((elem) => {
          return {
            name: `${elem.Driver.givenName} ${elem.Driver.familyName}`,
            constructor: elem.Constructor.name,
            time: elem.Q3!,
          };
        });
    }
    times.sort((a, b) => timeToMilliseconds(a.time) - timeToMilliseconds(b.time));
    activeBtn = button;
  }

  onMount(async () => {
    const info = await Consumer.getQualyResults(year, round + 1);
    rounds.update((value) => {
      $rounds[year][round].QualifyingResults = info;
      return value;
    });
    oneRunOnly = info.filter((driver) => driver.Q2 !== undefined).length === 0;
    times = info.map((elem) => {
      return {
        name: `${elem.Driver.givenName} ${elem.Driver.familyName}`,
        constructor: elem.Constructor.name,
        time: elem.Q3 !== undefined ? elem.Q3 : elem.Q2 !== undefined ? elem.Q2 : elem.Q1!,
      };
    });
  });
</script>

{#if $rounds[year] !== undefined && $rounds[year][round] !== undefined && $rounds[year][round].QualifyingResults !== undefined}
  {#if $rounds[year][round].QualifyingResults.length === 0}
    <h1 class="mb-4 text-4xl font-bold">Sorry! There is no information for this race</h1>
  {:else}
    <h1 class="mb-4 text-4xl font-bold">{year} {$rounds[year][round].raceName}</h1>
    <h2 class="mb-1 text-2xl font-bold">Qualifying results</h2>

    {#if !oneRunOnly}
      <nav
        class="btn-group my-4 flex-row justify-between p-2 preset-outlined-surface-200-800 md:flex-row"
      >
        <button
          type="button"
          class="btn"
          class:hover:preset-tonal={activeBtn !== 0}
          class:preset-filled={activeBtn === 0}
          onclick={() => updateTimes(0)}
        >
          Starting grid
        </button>
        <button
          type="button"
          class="btn hover:preset-tonal"
          class:hover:preset-tonal={activeBtn !== 1}
          class:preset-filled={activeBtn === 1}
          onclick={() => updateTimes(1)}
        >
          Q1
        </button>
        <button
          type="button"
          class="btn hover:preset-tonal"
          class:hover:preset-tonal={activeBtn !== 2}
          class:preset-filled={activeBtn === 2}
          onclick={() => updateTimes(2)}
        >
          Q2
        </button>
        <button
          type="button"
          class="btn hover:preset-tonal"
          class:hover:preset-tonal={activeBtn !== 3}
          class:preset-filled={activeBtn === 3}
          onclick={() => updateTimes(3)}
        >
          Q3
        </button>
      </nav>
    {/if}
    <table class="table mb-16">
      <thead>
        <tr>
          <th>Pos.</th>
          <th>Name</th>
          <th class="constructor-column">Constructor</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {#each times as time, i}
          <tr>
            <td>{i + 1}</td>
            <td>{time.name}</td>
            <td class="constructor-column">{time.constructor}</td>
            <td>{time.time}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
{:else}
  <Loader />
{/if}

<style>
  @media (max-width: 500px) {
    .constructor-column {
      display: none;
    }
  }
</style>
