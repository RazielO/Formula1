<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { darkMode } from '$lib/stores';
	import '../app.css';
	let { children } = $props();
</script>

<div class="{$darkMode ? 'dark' : ''} h-full">
	<Header />

	<div class="py-8">
		<main class="flex justify-center bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-100">
			<div class="max-w-[50rem]">
				{@render children()}
			</div>
		</main>
	</div>
</div>
