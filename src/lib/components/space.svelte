<script lang="ts">
	import {
		Canvas,
		DirectionalLight,
		OrbitControls,
		PerspectiveCamera,
		type ThrelteContext
	} from "@threlte/core"
	import { onMount } from "svelte"
	import {
		Mesh,
		MeshBasicMaterial,
		MeshPhongMaterial,
		SphereGeometry,
		sRGBEncoding,
		TextureLoader
	} from "three"

	let ctx: ThrelteContext

	/* --------------------------------- Planets -------------------------------- */
	onMount(() => {
		const planets: Mesh<SphereGeometry, MeshBasicMaterial>[] = []

		const loader = new TextureLoader()
		loader.setPath("images/planets/")
		const loadPlanet = (image: string) => {
			const map = loader.load(image)
			map.encoding = sRGBEncoding
			const geometry = new SphereGeometry(50, 12, 12)
			const material = new MeshPhongMaterial({ map })
			const planet = new Mesh(geometry, material)

			planet.castShadow = false

			planet.position.x = 0
			planet.position.y = 0
			planet.position.z = -200

			ctx.scene.add(planet)
			planets.push(planet)
		}

		loadPlanet("earth.jpg")

		// TODO finish this, rotation isnt working
		// TODO add more planets, https://www.solarsystemscope.com/textures/
		const animate = () => {
			planets.forEach((planet, i) => {
				planet.position.z += i / 20
				planet.rotateX(i / 20)
				if (planet.position.z > 1000) planet.position.z -= 2000
			})
			requestAnimationFrame(animate)
		}
		animate()
	})

	/* ---------------------------------- Stars --------------------------------- */
	onMount(() => {
		const stars: Mesh<SphereGeometry, MeshBasicMaterial>[] = []
		for (let z = -1000; z < 1000; z += 10) {
			const geometry = new SphereGeometry(0.5, 3, 2)
			const material = new MeshBasicMaterial({ color: 0xffffff })
			const sphere = new Mesh(geometry, material)

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

<div class="fixed top-0 left-0 w-full h-full pointer-events-none max-w-full max-h-full -z-40">
	<Canvas bind:ctx>
		<PerspectiveCamera>
			<OrbitControls enableDamping autoRotate={false} enableRotate={false} />
		</PerspectiveCamera>

		<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
	</Canvas>
</div>
