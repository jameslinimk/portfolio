<script lang="ts">
	import Footnote from "$lib/components/footnote.svelte"
	import Space from "$lib/components/space.svelte"
	import Topbar from "$lib/components/topbar.svelte"
	import { github } from "$lib/config.js"
	import { marked } from "marked"
	import { onMount } from "svelte"
	import { MetaTags } from "svelte-meta-tags"
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

<MetaTags
	title={data.project.title}
	titleTemplate="%s | James Lin"
	description={data.project.description}
	openGraph={{
		title: `${data.project.title} | James Lin`,
		description: data.project.description,
		images: [
			{
				url: data.project.image
			}
		]
	}}
/>

<Topbar forcePinned={true} />
<Space />

<div class="min-w-full flex flex-col items-center justify-center p-3 pb-5">
	{#if readme}
		<article
			class="prose prose-lg md:prose-xl

			prose-headings:text-[#ececec]
			
			prose-p:text-[#ececec]

			prose-a:text-blue-300

			prose-td:text-[#ececec]

			prose-li:text-[#ececec]

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

<!-- Button to go back to home page -->
<a
	href="/"
	class="font-m-plus text-2xl sm:text-4xl md:text-5xl text-[#ebebeb] font-bold transition-all text-center fixed bottom-3 right-3 bg-[#1d1d21] rounded-md p-2 hover:bg-[#2d2d31] hover:scale-105 shadow-sm shadow-black"
	>Back</a
>

<Footnote />
