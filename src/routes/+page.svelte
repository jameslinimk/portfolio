<script lang="ts">
	import IconText from "$lib/components/iconText.svelte"
	import Projects from "$lib/components/projects.svelte"
	import Space from "$lib/components/space.svelte"
	import Topbar from "$lib/components/topbar.svelte"
	import { MetaTags } from "svelte-meta-tags"

	const languages: [language: string, image: string, url: string][] = [
		["HTML/CSS", "html", "https://developer.mozilla.org/en-US/docs/Web/HTML"],
		["Typescript", "typescript", "https://www.typescriptlang.org/"],
		["Rust", "rust", "https://www.rust-lang.org/"],
		["Kotlin", "kotlin", "https://kotlinlang.org/"],
		["Svelte", "svelte", "https://kit.svelte.dev/"],
		["Go", "go", "https://go.dev/"]
	]
</script>

<MetaTags
	title="James Lin"
	description="14y/o coder, programmer, and high schooler. See my github projects and about me"
	openGraph={{
		title: "James Lin's portfolio",
		description: "14y/o coder, programmer, and high schooler. See my github projects and about me"
	}}
/>

<Space />
<Topbar />

<div
	class="font-m-plus text-md md:text-xl lg:text-2xl text-[#ebebeb] mx-5 sm:mx-24 md:mx-48 mt-2 text-center"
>
	<p class="text-2xl md:text-3xl lg:text-4xl mb-1">Hello!</p>
	<p class="mb-6">
		My name is James and I'm in 9th grade. I love programming, web development, and playing and
		making games
	</p>
	<p>I know many tools and languages, but I love</p>
	<p class="mb-6">
		{#each languages as lang, i}
			<IconText
				space={true}
				text="{lang[0]}{i === languages.length - 1
					? ''
					: i === languages.length - 2
					? ', and'
					: ','}"
				url={lang[2]}
				image="/images/{lang[1]}.svg"
			/>
		{/each}
	</p>
	<p class="mb-6">
		I started coding when I was in 3rd grade with <IconText
			space={false}
			text="Scratch"
			image="/images/scratch.svg"
			url="https://scratch.mit.edu"
		/>, and my first language was <IconText
			space={false}
			text="Javascript"
			image="/images/javascript.svg"
			url="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
		/>, using <IconText
			space={false}
			text="NodeJS"
			image="/images/node.svg"
			url="https://nodejs.org/en/"
		/>
	</p>
	<p>
		I am a certified PADI Rescue Diver, Emergency First Responder, and water polo player and
		wrestler.
	</p>
</div>

<Projects />
