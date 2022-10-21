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
	import { clamp, randFloat, randInt } from "three/src/math/MathUtils.js"

	let ctx: ThrelteContext

	interface Planet {
		mesh: Mesh<SphereGeometry, MeshPhongMaterial>
		rotateY: number
		rotateX: number
		speed: number
		radius: number
	}
	/* --------------------------------- Planets -------------------------------- */
	onMount(() => {
		const planets: Planet[] = []

		/* ----------------------------- Texture loader ----------------------------- */
		const loader = new TextureLoader()
		loader.setPath("images/planets/")
		const loadPlanet = (config: {
			rotateY: number
			rotateX: number
			speed: number
			radius: number
			image: string
		}) => {
			const map = loader.load(config.image)
			map.encoding = sRGBEncoding
			const geometry = new SphereGeometry(config.radius, 20, 20)
			const material = new MeshPhongMaterial({ map })

			const planet = new Mesh(geometry, material)

			planet.position.x = Math.random() * 5000 - 500
			planet.position.y = Math.random() * 5000 - 500
			planet.position.z = -10000

			ctx.scene.add(planet)
			planets.push({
				mesh: planet,
				...config
			})
		}

		/* -------------------------- Stagger planet spawn -------------------------- */
		;[
			{
				image: "earth.jpg",
				rotateX: 0.01,
				rotateY: 0.01,
				speed: 10,
				radius: 50
			},
			{
				image: "mars.jpg",
				rotateX: 0.01,
				rotateY: 0.05,
				speed: 15,
				radius: 25
			},
			{
				image: "jupiter.jpg",
				rotateX: 0.005,
				rotateY: 0.005,
				speed: 7,
				radius: 75
			}
		].forEach((config) => {
			setTimeout(() => {
				loadPlanet(config)
			}, randInt(0, 5000))
		})

		/* ---------------------------- Animating planets --------------------------- */
		const animate = () => {
			planets.forEach((planet) => {
				planet.mesh.position.z += planet.speed
				planet.mesh.rotation.y += planet.rotateY
				planet.mesh.rotation.x += planet.rotateX
				if (planet.mesh.position.z > 5000) {
					planet.mesh.position.z -= 10000
					planet.mesh.position.x = Math.random() * 1000 - 500
					planet.mesh.position.y = Math.random() * 1000 - 500
					planet.speed = clamp(planet.speed + randFloat(-5, 5), 2, 25)
					console.log({ speed: planet.speed })
				}
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
				if (star.position.z > 100) star.position.z -= 2000
			})
			requestAnimationFrame(animate)
		}
		animate()
	})
</script>

<div class="fixed top-0 left-0 w-full h-full pointer-events-none max-w-full max-h-full -z-40">
	<Canvas bind:ctx>
		<PerspectiveCamera far={10000}>
			<OrbitControls enableDamping autoRotate={false} enableRotate={false} />
		</PerspectiveCamera>

		<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
	</Canvas>
</div>
