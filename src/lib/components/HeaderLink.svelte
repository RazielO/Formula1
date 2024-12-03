<script lang="ts">
	import Icon from '@iconify/svelte';

	let { href, active, icon, text }: { href: string; active: boolean; icon: string; text: string } =
		$props();
</script>

<a
	type="button"
	{href}
	class="button flex items-center gap-2 rounded-md px-2 py-2"
	class:hover:preset-tonal={!active}
	class:preset-filled={active}
>
	<Icon {icon} />
	{text}
</a>
