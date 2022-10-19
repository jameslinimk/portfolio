<script lang="ts">
	import { Canvas, OrbitControls, PerspectiveCamera, type ThrelteContext } from "@threlte/core"
	import { onMount } from "svelte"
	import { Mesh as tMesh, MeshBasicMaterial, SphereGeometry } from "three"

	let ctx: ThrelteContext

	onMount(() => {
		const stars: tMesh<SphereGeometry, MeshBasicMaterial>[] = []
		for (let z = -1000; z < 1000; z += 10) {
			const geometry = new SphereGeometry(0.5, 32, 32)
			const material = new MeshBasicMaterial({ color: 0xffffff })
			const sphere = new tMesh(geometry, material)

			sphere.position.x = Math.random() * 1000 - 500
			sphere.position.y = Math.random() * 1000 - 500
			sphere.position.z = z
			sphere.scale.x = sphere.scale.y = 2

			ctx.scene.add(sphere)
			stars.push(sphere)
		}

		const animate = () => {
			stars.forEach((star, i) => {
				star.position.z += i / 20
				if (star.position.z > 1000) star.position.z -= 2000
			})
			requestAnimationFrame(animate)
		}
		animate()
	})
</script>

<div class="fixed top-0 left-0 w-full h-full pointer-events-none max-w-full max-h-full">
	<Canvas bind:ctx>
		<PerspectiveCamera>
			<OrbitControls enableDamping autoRotate={false} enableRotate={false} />
		</PerspectiveCamera>
	</Canvas>
</div>
