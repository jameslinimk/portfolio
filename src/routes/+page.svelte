<script lang="ts">
	const projects = [
		[
			"Chess engine",
			"Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
			"https://static.wixstatic.com/media/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png/v1/fill/w_278,h_249,q_90/ 2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png"
		],
		[
			"Chess engine",
			"Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
			"https://static.wixstatic.com/media/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png/v1/fill/w_278,h_249,q_90/ 2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png"
		],
		[
			"Chess engine",
			"Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
			"https://static.wixstatic.com/media/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png/v1/fill/w_278,h_249,q_90/ 2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png"
		],
		[
			"Chess engine",
			"Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
			"https://static.wixstatic.com/media/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png/v1/fill/w_278,h_249,q_90/ 2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png"
		],
		[
			"Chess engine",
			"Lorem ipsum dolor sit amet ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo",
			"https://static.wixstatic.com/media/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png/v1/fill/w_278,h_249,q_90/ 2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png"
		]
	]
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

	<div class="flex flex-col justify-center items-center">
		<h1 class="font-m-plus font-bold text-4xl text-[#ebebeb] mb-2">Projects</h1>
		<div class="text-center">
			{#each projects as project}
				<div
					class="bg-[#2a2b2e] w-fit max-w-sm p-4 rounded-md shadow-black shadow-sm relative overflow-hidden hover:scale-110 transition-all cursor-pointer group hover:z-10 clear-left inline-block mx-[0.18rem]"
				>
					<img
						src="https://static.wixstatic.com/media/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png/v1/fill/w_278,h_249,q_90/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png"
						alt="chess"
						class="absolute w-full h-auto opacity-30 -top-32 group-hover:scale-125 group-hover:opacity-60 transition-all"
					/>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="absolute bottom-2 right-2 w-6 group-hover:scale-110 transition-all"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>

					<h1
						class="font-m-plus text-[#ebebeb] text-center text-2xl font-bold relative group-hover:scale-110 transition-all"
					>
						{project[0]}
					</h1>
					<p
						class="font-m-plus text-[#ebebeb] text-center text-sm relative group-hover:scale-105 transition-all"
					>
						{project[1]}
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>
