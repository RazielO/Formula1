<script>
	import Seasons from "./Seasons.svelte";

	import { stores } from "@sapper/app";
	const { page } = stores();

	export let segment;
</script>

<nav>
	<ul>
		{#if segment === "qualy"}
			<li>
				<a
					aria-current={segment === undefined ? "page" : undefined}
					href="/"
				>
					<i class="fas fa-arrow-left" /></a
				>
			</li>
		{:else if segment === "result"}
			<li>
				<a
					aria-current={segment === undefined ? "page" : undefined}
					href="/"
				>
					<i class="fas fa-arrow-left" /></a
				>
			</li>
			<li>
				<a
					aria-current={segment === "results" ? "page" : undefined}
					href={$page.path
						.replace("/graph", "")
						.replace("/laps_lead", "")
						.replace("/fastest_lap", "")}
				>
					Position
				</a>
			</li>
			<li>
				<a
					aria-current={segment === "laps_lead" ? "page" : undefined}
					href="{$page.path
						.replace('/graph', '')
						.replace('/laps_lead', '')
						.replace('/fastest_lap', '')}/laps_lead"
				>
					Laps lead
				</a>
			</li>
			<li>
				<a
					aria-current={segment === "fastest_lap"
						? "page"
						: undefined}
					href="{$page.path
						.replace('/graph', '')
						.replace('/laps_lead', '')
						.replace('/fastest_lap', '')}/fastest_lap"
				>
					Fastest laps
				</a>
			</li>
			<li>
				<a
					aria-current={segment === "graph"
						? "page"
						: undefined}
					href="{$page.path
						.replace('/graph', '')
						.replace('/laps_lead', '')
						.replace('/fastest_lap', '')}/graph"
				>
					Graph
				</a>
			</li>
		{:else}
			<li>
				<Seasons />
			</li>

			<li>
				<a
					aria-current={segment === undefined ? "page" : undefined}
					href=".">Races</a
				>
			</li>

			<li>
				<a
					aria-current={segment === "constructor_standings"
						? "page"
						: undefined}
					href="constructor_standings">Constructor Standings</a
				>
			</li>

			<li>
				<a
					aria-current={segment === "driver_standings"
						? "page"
						: undefined}
					href="driver_standings">Driver Standings</a
				>
			</li>
		{/if}
	</ul>
</nav>

<style>
	nav {
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: "";
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: "";
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255, 62, 0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>
