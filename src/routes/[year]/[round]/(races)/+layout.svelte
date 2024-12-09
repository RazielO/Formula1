<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Consumer } from '$lib/api/consumer';
  import type { Race } from '$lib/api/types/Races';
  import Header from '$lib/components/Header.svelte';
  import HeaderLink from '$lib/components/HeaderLink.svelte';
  import MainContainer from '$lib/components/MainContainer.svelte';
  import { darkMode, rounds } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import { onMount, type Snippet } from 'svelte';
  import '../../../../app.css';

  let { data, children }: { data: { year: number; round: number }; children: Snippet<[]> } =
    $props();
  const year = data.year;
  const round = data.round;

  let active = $state(0);

  onMount(async () => {
    if (year === undefined || round === undefined) {
      goto('/');
    } else if (year !== undefined && ($rounds[year] === undefined || $rounds[year].length === 0)) {
      let races: Race[] = await Consumer.getRaces(year);

      rounds.update((value) => {
        value[year] = races;
        return value;
      });
    } else if ($rounds[year][round] === undefined) {
      goto('/');
    }

    page.subscribe((value) => {
      const url = value.url.href;
      if (url.includes('background')) {
        active = 0;
      } else if (url.includes('qualy')) {
        active = 1;
      } else if (url.includes('results')) {
        active = 2;
      } else if (url.includes('sprint')) {
        active = 3;
      } else if (url.includes('standings')) {
        active = 4;
      }
    });
  });
</script>

<div class="{$darkMode ? 'dark' : ''} h-full">
  <Header>
    {#snippet lead()}
      <a href="/">
        <Icon icon="ion:arrow-back" height="1.5rem" />
      </a>
    {/snippet}

    {#snippet links()}
      <HeaderLink
        href="/{year}/{round}/background"
        active={active === 0}
        icon="fa:info"
        text="Background"
      />

      <HeaderLink
        href="/{year}/{round}/qualy"
        active={active === 1}
        icon="octicon:stopwatch-16"
        text="Qualy"
      />

      <HeaderLink
        href="/{year}/{round}/results"
        active={active === 2}
        icon="icons8:finish-flag"
        text="Results"
      />

      {#if $rounds[year] !== undefined && $rounds[year][round - 1] !== undefined && $rounds[year][round - 1].Sprint !== undefined}
        <HeaderLink
          href="/{year}/{round}/sprint"
          active={active === 3}
          icon="icons8:finish-flag"
          text="Sprint"
        />
      {/if}

      <HeaderLink
        href="/{year}/{round}/standings"
        text="Standings"
        active={active === 4}
        icon="material-symbols:trophy-outline"
      />
    {/snippet}
  </Header>

  <MainContainer>
    {@render children()}
  </MainContainer>
</div>
