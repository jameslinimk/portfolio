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
<div class="min-w-full flex items-center justify-center p-2 mt-3">
	{#if readme}
		<article
			class="prose prose-lg md:prose-xl

			prose-headings:font-m-plus
			prose-headings:text-[#ececec]
			prose-p:text-[#ececec]
			prose-a:text-blue-300
			prose-td:text-[#ececec]
			prose-code:bg-slate-800
			prose-code:rounded-md
			prose-code:text-[#ececec]"
		>
			{@html readme}
		</article>
	{:else}
		<h1>Balls</h1>
	{/if}
</div>
