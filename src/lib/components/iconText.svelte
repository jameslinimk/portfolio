<script lang="ts">
	export let image: string
	export let url: string
	export let text: string
	export let space: boolean
</script>

<a
	href={url}
	class="inline-flex justify-center items-center gap-1 group translate-y-[3px]"
	style="margin-right: {space ? '0.5rem' : '0px'};"
	target="_blank"
	rel="noreferrer"
>
	<img src={image} alt={text} class="w-6 h-6 inline group-hover:scale-110 transition-all" />
	{text}
</a>
