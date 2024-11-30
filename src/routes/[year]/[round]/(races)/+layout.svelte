<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { darkMode } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: { year: number; round: number }; children: Snippet<[]> } =
		$props();
	const year = data.year;
	const round = data.round;
</script>

<div class="{$darkMode ? 'dark' : ''} h-full">
	<Header>
		<div class="flex items-center">
			<button class="btn">
				<Icon icon="ion:arrow-back" height="1.5rem" />
			</button>
			<a href="/{year}/{round}/background">Background</a>
		</div>
	</Header>

	<main class="flex h-full justify-center bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-100">
		<div class="max-w-[50rem] py-8">
			{@render children()}
		</div>
	</main>
</div>
