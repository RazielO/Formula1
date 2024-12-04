<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { darkMode } from '$lib/stores';
  import { page } from '$app/stores';
  import { onMount, type Snippet } from 'svelte';
  import '../../app.css';
  import SeasonSelector from '$lib/components/SeasonSelector.svelte';
  import MainContainer from '$lib/components/MainContainer.svelte';
  import HeaderLink from '$lib/components/HeaderLink.svelte';
  let { children }: { children: Snippet<[]> } = $props();

  let active = $state(0);

  onMount(() => {
    page.subscribe((value) => {
      const url = value.url.href;
      if (url.includes('driverStandings')) {
        active = 1;
      } else if (url.includes('constructorStandings')) {
        active = 2;
      } else {
        active = 0;
      }
    });
  });
</script>

<div class="{$darkMode ? 'dark' : ''} h-full">
  <Header>
    {#snippet lead()}
      <SeasonSelector />
    {/snippet}

    {#snippet links()}
      <HeaderLink href="/" text="Races" active={active === 0} icon="material-symbols:list" />

      <HeaderLink
        href="/driverStandings"
        text="Driver Standings"
        active={active === 1}
        icon="material-symbols:trophy-outline"
      />

      <HeaderLink
        href="/constructorStandings"
        text="Constructor Standings"
        active={active === 2}
        icon="iconoir:medal"
      />
    {/snippet}
  </Header>

  <MainContainer>
    {@render children()}
  </MainContainer>
</div>
