<script lang="ts">
	export let image: string
	export let url: string
	export let text: string
	export let space: boolean

	let element: HTMLAnchorElement
	$: if (element) {
		element.style.marginRight = space ? "0.5rem" : ""
	}
</script>

<a
	bind:this={element}
	href={url}
	class="inline-flex justify-center items-center gap-1 group translate-y-[3px]"
	target="_blank"
>
	<img src={image} alt={text} class="w-6 h-6 inline group-hover:scale-110 transition-all" />
	{text}
</a>
