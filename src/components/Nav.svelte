<script>
	import Seasons from "./Seasons.svelte";

	export let segment;

	import { stores } from "@sapper/app";
	const { page } = stores();

	const regex = /(\d{4})_(\d+)/g;
	let path;

	const createPath = () => {
		let parts = regex.exec(segment);

		if (parts !== null) {
			return `${parts[1]}_${parts[2]}`;
		} else {
			return "";
		}
	};

	$: {
		if (segment !== undefined && segment.match(regex)) {
			path = createPath();
		}
	}
</script>

<nav>
	<ul>
		{#if segment === undefined || !segment.match(regex)}
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
		{:else}
			<li>
				<a href="/"> <i class="fas fa-arrow-left" /></a>
			</li>
			<li>
				<a
					aria-current={$page.path.includes("qualy")
						? "qualy"
						: undefined}
					href="{path}/qualy"
				>
					Qualy</a
				>
			</li>
			<li>
				<a
					aria-current={$page.path.includes("result")
						? "result"
						: undefined}
					href="{path}/result"
				>
					Position
				</a>
			</li>
			<li>
				<a
					aria-current={$page.path.includes("laps_lead")
						? "laps_lead"
						: undefined}
					href="{path}/laps_lead"
				>
					Laps lead
				</a>
			</li>
			<li>
				<a
					aria-current={$page.path.includes("fastest_lap")
						? "fastest_lap"
						: undefined}
					href="{path}/fastest_lap"
				>
					Fastest laps
				</a>
			</li>
			<li>
				<a
					aria-current={$page.path.includes("graph")
						? "graph"
						: undefined}
					href="{path}/graph"
				>
					Graph
				</a>
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
