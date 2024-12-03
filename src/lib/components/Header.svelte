<script lang="ts">
	import type { Snippet } from 'svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import Icon from '@iconify/svelte';

	let { lead, links }: { lead: Snippet<[]> | undefined; links: Snippet<[]> } = $props();
	let menuHidden = $state(true);

	function switchMenu() {
		menuHidden = !menuHidden;
	}
</script>

<header
	class="grid-rows-[auto, auto] sticky top-0 z-10 grid w-full grid-cols-2 items-center justify-between space-y-4 bg-zinc-300 px-4 dark:bg-zinc-900 dark:text-zinc-100 sm:flex sm:px-0 sm:py-0 sm:pb-4"
>
	<div class="justify-self-start h-12">
		{#if lead !== undefined}
			<div class="btn">
				{@render lead()}
			</div>
		{/if}
	</div>

	<button class="btn h-12 justify-self-end sm:hidden" onclick={switchMenu} style="margin:0">
		<Icon icon="lucide:menu" height="1.5rem" />
	</button>

	<nav
		class="btn-group col-span-2 mb-16 w-auto flex-col px-2 preset-outlined-surface-200-800 sm:mb-0 sm:flex sm:flex-row"
		class:hidden={menuHidden}
	>
		{@render links()}

		<ThemeToggle />
	</nav>

	<div class="hidden sm:flex"></div>
</header>

<!-- <header
	class="sticky top-0 z-10 flex flex justify-between bg-zinc-300 p-4 px-8 backdrop-blur-sm dark:bg-zinc-900 dark:text-zinc-100"
>
	{@render children()}

	<button type="button" class="btn preset-outlined-surface-500 rounded-full" onclick={switchTheme}>
		{#if $darkMode}
			<Icon icon="lucide:sun" height="1.5rem" />
		{:else}
			<Icon icon="lucide:moon-star" height="1.5rem" />
		{/if}
	</button>
</header> -->
