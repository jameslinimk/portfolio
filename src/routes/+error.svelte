<script lang="ts">
	import Topbar from "$lib/components/topbar.svelte"
</script>

<Topbar forcePinned={true} />

<div class="min-w-full min-h-full absolute top-0 left-0 flex items-center justify-center">
	<div class="flex-col">
		<h1 class="font-m-plus text-7xl text-center font-bold text-[#ececec]">Whoops!</h1>
		<h2 class="font-m-plus text-4xl text-center text-[#ececec] mt-1">404 page not found</h2>
		<div class="flex items-center justify-center">
			<a
				href="/"
				class="bg-[#3a6fe5] mt-7 rounded-md shadow-md shadow-[rgb(0, 0, 0, 75)] px-2 py-1 font-m-plus text-3xl text-[#ececec] hover:scale-105 hover:bg-blue-500 transition-all"
				>Back to home</a
			>
		</div>
	</div>
</div>
