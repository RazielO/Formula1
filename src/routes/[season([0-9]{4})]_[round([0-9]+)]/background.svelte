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

    import Loader from "../../components/Loader.svelte";

    import wtf from "wtf_wikipedia";

    import { rounds } from "../../stores.js";

    export let data;

    let season = data.season;
    let round = data.round;

    let name;
    let url;
    let hasBackground;

    onMount(async () => {
        if ($rounds[season] === undefined) {
            goto("/");
        } else if ($rounds[season][round] === undefined) {
            goto("/");
        } else {
            name = `${season} ${$rounds[season][round].name}`;

            if ($rounds[season][round].background === undefined) {
                let info = {};

                await wtf.fetch(name).then((doc) => {
                    hasBackground =
                        doc.sections().filter((s) => s._title === "Background")
                            .length !== 0;
                    if (hasBackground) {
                        let section = doc.section("Background");
                        info["text"] = section.text();
                        info["children"] = [];

                        for (let i = 0; i < section.children().length; i++) {
                            const element = section.children()[i];
                            info["children"][i] = {
                                title: element.json().title,
                                text: element.text(),
                            };
                        }
                    } else {
                        info["text"] = doc.sections()[0].text();
                        info["children"] = [];
                    }
                    url = doc.url();
                });

                rounds.update((value) => {
                    value[season][round].background = {
                        info: info,
                        hasBackground: hasBackground,
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

            {#if !$rounds[season][round].background.hasBackground}
                <h3>
                    The wikipedia site did not have a 'Background' section, so
                    this is the general information of the GP.
                </h3>
            {/if}

            {#each $rounds[season][round].background.info.text.split("\n") as paragraph}
                <p>{paragraph}</p>
            {/each}

            {#each $rounds[season][round].background.info.children as child}
                <h3>{child.title}</h3>

                {#each child.text.split("\n") as paragraph}
                    <p>{paragraph}</p>
                {/each}
            {/each}

            <small>
                Info obtained from <a
                    href={$rounds[season][round].background.url}>wikipedia</a
                >
            </small>
        {:else}
            <Loader />
        {/if}
    {/if}
{/if}
