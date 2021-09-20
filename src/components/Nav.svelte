<script>
	import Seasons from "./Seasons.svelte";

	export let segment;

	import { stores } from "@sapper/app";
	const { page } = stores();

	const yearRound = /(\d{4})_(\d+)/g;
	const driver = /drivers\/([a-z_]+)/g;

	let path;
	let showingMenu = false;

	$: {
		if (segment !== undefined) {
			if (segment.match(yearRound)) {
				let parts = yearRound.exec(segment);

				path = parts !== null ? `${parts[1]}_${parts[2]}` : "";
			} else if ($page.path.match(driver)) {
				let parts = driver.exec($page.path);

				path = parts !== null ? parts[1] : "";
			}
		}
	}
</script>

<nav>
	<ul>
		{#if segment === undefined || (!segment.match(yearRound) && segment !== "drivers")}
			<div class="top">
				<li>
					<Seasons />
				</li>

				<button
					class="menu-btn"
					on:click={() => (showingMenu = !showingMenu)}
					><i class="fas fa-bars" /></button
				>
			</div>

			<div class="menu" style="display: {showingMenu ? 'flex' : 'none'};">
				<li>
					<a
						aria-current={segment === undefined
							? "page"
							: undefined}
						on:click={() => (showingMenu = false)}
						href=".">Races</a
					>
				</li>

				<li>
					<a
						aria-current={segment === "constructor_standings"
							? "page"
							: undefined}
						on:click={() => (showingMenu = false)}
						href="constructor_standings">Constructor Standings</a
					>
				</li>

				<li>
					<a
						aria-current={segment === "driver_standings"
							? "page"
							: undefined}
						on:click={() => (showingMenu = false)}
						href="driver_standings">Driver Standings</a
					>
				</li>
			</div>
		{:else if segment === "drivers"}
			<div class="top">
				<li>
					<a href="/"> <i class="fas fa-arrow-left" /></a>
				</li>

				<button
					class="menu-btn"
					on:click={() => (showingMenu = !showingMenu)}
					><i class="fas fa-bars" /></button
				>
			</div>
			<div class="menu" style="display: {showingMenu ? 'flex' : 'none'};">
				<li>
					<a
						aria-current={$page.path === `/drivers/${path}` ||
						$page.path === `/drivers/${path}/`
							? path
							: undefined}
						on:click={() => (showingMenu = false)}
						href="drivers/{path}"
					>
						Information</a
					>
				</li>
				<li>
					<a
						aria-current={$page.path.includes("history")
							? "history"
							: undefined}
						on:click={() => (showingMenu = false)}
						href="drivers/{path}/history"
					>
						History</a
					>
				</li>
			</div>
		{:else}
			<div class="top">
				<li>
					<a href="/"> <i class="fas fa-arrow-left" /></a>
				</li>

				<button
					class="menu-btn"
					on:click={() => (showingMenu = !showingMenu)}
					><i class="fas fa-bars" /></button
				>
			</div>

			<div class="menu" style="display: {showingMenu ? 'flex' : 'none'};">
				<li>
					<a
						aria-current={$page.path.includes("background")
							? "background"
							: undefined}
						on:click={() => (showingMenu = false)}
						href="{path}/background"
					>
						Background</a
					>
				</li>
				<li>
					<a
						aria-current={$page.path.includes("qualy")
							? "qualy"
							: undefined}
						on:click={() => (showingMenu = false)}
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
						on:click={() => (showingMenu = false)}
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
						on:click={() => (showingMenu = false)}
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
						on:click={() => (showingMenu = false)}
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
						on:click={() => (showingMenu = false)}
						href="{path}/graph"
					>
						Graph
					</a>
				</li>
			</div>
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

	@media only screen and (min-width: 768px) {
		.menu {
			display: unset !important;
		}

		.menu-btn {
			display: none;
		}
	}

	@media only screen and (max-width: 768px) {
		.menu-btn {
			background: none;
			border: none;
			font-size: 1.25rem;
		}

		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.menu {
			flex-direction: column;
		}
	}
</style>
