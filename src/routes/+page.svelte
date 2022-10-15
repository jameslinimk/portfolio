<script lang="ts">
	import Projects from "$lib/components/projects.svelte"
	import Topbar from "$lib/components/topbar.svelte"

	const projects: [name: string, description: string, image: string, href: string][] = [
		[
			"Chess engine",
			"Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
			"https://wallpaperaccess.com/full/2918041.jpg",
			"https://www.google.com/"
		],
		[
			"Chess engine",
			"Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
			"https://wallpaperaccess.com/full/2918041.jpg",
			"https://www.google.com/"
		],
		[
			"Chess engine",
			"Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
			"https://wallpaperaccess.com/full/2918041.jpg",
			"https://www.google.com/"
		],
		[
			"Chess engine",
			"Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
			"https://wallpaperaccess.com/full/2918041.jpg",
			"https://www.google.com/"
		],
		[
			"Chess engine",
			"Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
			"https://wallpaperaccess.com/full/2918041.jpg",
			"https://www.google.com/"
		]
	]
	const titles = ["programmer", "student", "coder", "learner"]
</script>

<div class="absolute top-0 left-0 min-w-full min-h-full bg-[#222225] -z-50">
	<Topbar {titles} github="jameslinimk" discord="400029130219061260" />

	<p class="font-m-plus text-xl text-[#ebebeb] mx-5 sm:mx-24 md:mx-32 mt-2">
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
		ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
		dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
		sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
		invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
		justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
		ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
		eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
		et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
		est Lorem ipsum dolor sit amet.
	</p>

	<Projects {projects} />
</div>
