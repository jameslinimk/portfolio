<script lang="ts">
	import Topbar from "$lib/components/topbar.svelte"
	import { github } from "$lib/config.js"
	import { marked } from "marked"
	import { onMount } from "svelte"
	import type { PageData } from "./$types.js"

	export let data: PageData

	let readme: string
	onMount(async () => {
		const res = await fetch(
			`https://raw.githubusercontent.com/${github}/${data.project.github}/master/README.md`
		)
		const text = await res.text()
		readme = marked.parse(text)
	})
</script>

<Topbar forcePinned={true} />
<div class="min-w-full flex flex-col items-center justify-center p-3 pb-5">
	<h1 class="font-m-plus text-5xl font-bold text-[#ececec] mb-7">
		{data.project.title}
	</h1>
	{#if readme}
		<article
			class="prose prose-lg md:prose-xl

			prose-headings:text-[#ececec]
			
			prose-p:text-[#ececec]

			prose-a:text-blue-300

			prose-td:text-[#ececec]

			prose-code:bg-[#1d1d21]
			prose-code:rounded-md
			prose-code:text-[#ececec]"
		>
			{@html readme}
		</article>
	{:else}
		<h1>Loading</h1>
	{/if}
</div>
