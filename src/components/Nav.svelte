<script>
	import Seasons from "./Seasons.svelte";

	export let segment;
</script>

<nav>
	<ul>
		{#if segment !== "qualy"}
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
				<a
					aria-current={segment === undefined ? "page" : undefined}
					href="/"
				>
					<i class="fas fa-arrow-left" /></a
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
