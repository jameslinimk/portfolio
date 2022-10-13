<script lang="ts">
</script>

<div class="absolute top-0 left-0 min-w-full min-h-full bg-[#222225] -z-50">
	<div
		class="w-full flex flex-col items-center justify-center bg-[#1d1d21] border-b-4 border-b-[#272729] p-3 sticky top-0"
	>
		<h1 class="font-m-plus text-6xl text-[#ebebeb] font-bold">James Lin</h1>
		<h2 class="font-mono text-2xl text-[#ebebeb] font-semibold">I am a programmer</h2>
	</div>

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
	{#each [["Chess engine", "Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo"], ["Chess engine", "Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo"]] as project}
		<div
			class="bg-[#2a2b2e] w-fit max-w-sm p-4 rounded-md shadow-black shadow-sm relative overflow-hidden hover:scale-110 transition-all cursor-pointer group"
		>
			<img
				src="https://static.wixstatic.com/media/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png/v1/fill/w_278,h_249,q_90/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png"
				alt="chess"
				class="absolute w-full h-auto opacity-30 -top-32 group-hover:scale-125 group-hover:opacity-80 transition-all"
			/>
			<h1 class="font-m-plus text-[#ebebeb] text-center text-2xl font-bold relative">
				{project[0]}
			</h1>
			<p class="font-m-plus text-[#ebebeb] text-center text-sm relative">{project[1]}</p>
		</div>
	{/each}
</div>
