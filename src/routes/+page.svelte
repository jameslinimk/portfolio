<script lang="ts">
	let topbar: HTMLDivElement

	// onMount(() => {
	// 	const observer = new IntersectionObserver(
	// 		([el]) => el.target.classList.toggle("is-pinned", el.intersectionRatio < 1),
	// 		{ threshold: [1] }
	// 	)

	// 	observer.observe(topbar)
	// })
</script>

<div class="absolute top-0 left-0 w-full h-full bg-[#222225]">
	<div
		bind:this={topbar}
		class="w-full flex flex-col items-center justify-center bg-[#1d1d21] border-b-4 border-b-[#272729] p-3"
	>
		<h1 class="font-m-plus text-6xl text-[#ebebeb] font-bold">James Lin</h1>
		<h2 class="font-mono text-2xl text-[#ebebeb] font-semibold">I am a programmer</h2>
	</div>

	<p class="font-m-plus text-xl text-[#ebebeb] mx-5 sm:mx-10 md:mx-20 mt-2">
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
		ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
		dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
		sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
		invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
		justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
		ipsum dolor sit amet.
	</p>
</div>
