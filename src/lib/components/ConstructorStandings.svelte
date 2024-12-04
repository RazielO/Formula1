<script lang="ts">
  import type { ConstructorStanding } from '$lib/api/types/ConstructorStanding';
  import { nationalities } from '$lib/nationalities';
  import Icon from '@iconify/svelte';

  let { constructors }: { constructors: ConstructorStanding[] } = $props();
</script>

<table class="table">
  <thead>
    <tr>
      <th class="round-column">Pos.</th>
      <th>Name</th>
      <th class="nationality-column">Nationality</th>
      <th>Points</th>
      <th>Wins</th>
    </tr>
  </thead>
  <tbody>
    {#each constructors as constructor}
      <tr>
        <td class="round-column">{constructor.positionText}</td>
        <td>{constructor.Constructor.name}</td>
        <td class="nationality-column">
          {#if nationalities[constructor.Constructor.nationality.toLowerCase()] !== undefined}
            <Icon
              icon="flagpack:{nationalities[constructor.Constructor.nationality.toLowerCase()]}"
              width="32"
              height="24"
            />
          {:else}
            <span>{constructor.Constructor.nationality}</span>
          {/if}
        </td>
        <td>
          {constructor.points}
        </td>
        <td>
          {constructor.wins}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  @media (max-width: 500px) {
    .nationality-column {
      display: none;
    }
  }
</style>
