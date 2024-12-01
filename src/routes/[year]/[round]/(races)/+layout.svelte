<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import { darkMode, rounds } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import { onMount, type Snippet } from 'svelte';
	import '../../../../app.css';
	import { goto } from '$app/navigation';

	let { data, children }: { data: { year: number; round: number }; children: Snippet<[]> } =
		$props();
	const year = data.year;
	const round = data.round;

	let active = $state(0);

	onMount(() => {
		if ($rounds[year] === undefined) {
			goto('/');
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
			}
		});
	});
</script>

<div class="{$darkMode ? 'dark' : ''} h-full">
	<Header>
		<div class="flex items-center gap-2">
			<a href="/" class="btn">
				<Icon icon="ion:arrow-back" height="1.5rem" />
			</a>
			<a href="/{year}/{round}/background" class:underline={active === 0}>Background</a>
			<a href="/{year}/{round}/qualy" class:underline={active === 1}>Qualy</a>
			<a href="/{year}/{round}/results" class:underline={active === 2}>Results</a>
			{#if $rounds[year][round].Sprint !== undefined}
				<a href="/{year}/{round}/sprint" class:underline={active === 3}>Sprint</a>
			{/if}
		</div>
	</Header>

	<main
		class="flex h-full justify-center overflow-x-clip overflow-y-scroll bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-100"
	>
		<div class="max-w-[50rem] px-4 py-8">
			{@render children()}
		</div>
	</main>
</div>
