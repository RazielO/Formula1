<script context="module">
    export function preload({ params }) {
        const data = {
            season: params.season,
            round: params.round - 1,
            roundApi: params.round,
        };

        return { data };
    }
</script>

<script>
    import { onMount } from "svelte";
    import { goto } from "@sapper/app";

    import wtf from "wtf_wikipedia";

    import { rounds } from "../../stores.js";

    export let data;

    let season = data.season;
    let round = data.round;
    let d = data.data;

    let info;
    let name;
    let url;

    onMount(async () => {
        if ($rounds[season] === undefined) {
            goto("/");
        } else if ($rounds[season][round] === undefined) {
            goto("/");
        } else {
            name = `${season} ${$rounds[season][round].name}`;

            if ($rounds[season][round].background === undefined) {
                await wtf.fetch(name).then((doc) => {
                    info = doc.section("Background").text();
                    url = doc.url();
                });

                rounds.update((value) => {
                    value[season][round].background = {
                        info: info,
                        url: url,
                    };
                    return value;
                });
            }
        }
    });
</script>

{#if $rounds[season] !== undefined}
    {#if $rounds[season][round] !== undefined}
        {#if $rounds[season][round].background !== undefined}
            <h1>{name}</h1>
            <h2>Background</h2>

            {#each $rounds[season][round].background.info.split("\n") as paragraph}
                <p>{paragraph}</p>
            {/each}

            <small>
                Info obtained from <a
                    href={$rounds[season][round].background.url}>wikipedia</a
                >
            </small>
        {/if}
    {/if}
{/if}
