<script lang="ts">
	import {
		Canvas,
		DirectionalLight,
		OrbitControls,
		PerspectiveCamera,
		type ThrelteContext
	} from "@threlte/core"
	import { onMount } from "svelte"
	import type { Object3D } from "three"
	import {
		DoubleSide,
		Mesh,
		MeshBasicMaterial,
		MeshPhongMaterial,
		RingGeometry,
		SphereGeometry,
		sRGBEncoding,
		TextureLoader,
		Vector3
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
	onMount(async () => {
		const planets: Planet[] = []

		/* ----------------------------- Texture loader ----------------------------- */
		const loader = new TextureLoader()
		loader.setPath("images/planets/")
		const loadPlanet = async (
			config: {
				rotateY: number
				rotateX: number
				speed: number
				radius: number
				image: string
				ring?: string
			},
			delay: number
		) => {
			const map = await loader.loadAsync(config.image)
			map.encoding = sRGBEncoding

			const extras: Object3D[] = []

			const texture = config.ring ? await loader.loadAsync(config.ring) : null
			if (texture) {
				console.log("Loading ring", config.ring)

				texture.encoding = sRGBEncoding
				const geometry = new RingGeometry(config.radius * 2 + 10, 1, 20)
				console.log(config.radius * 2 + 15, config.radius * 3 + 15)
				const pos = geometry.attributes.position
				const v3 = new Vector3()
				for (let i = 0; i < pos.count; i++) {
					v3.fromBufferAttribute(pos, i)
					geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1)
				}

				const material = new MeshBasicMaterial({
					map: texture,
					color: 0xffffff,
					side: DoubleSide,
					transparent: true
				})
				const mesh = new Mesh(geometry, material)

				extras.push(mesh)
			}

			const geometry = new SphereGeometry(config.radius, 20, 20)
			const material = new MeshPhongMaterial({
				map,
				shininess: 0.1
			})

			const planet = new Mesh(geometry, material)

			planet.position.x = Math.random() * 5000 - 500
			planet.position.y = Math.random() * 5000 - 500
			planet.position.z = -10000
			planet.visible = false

			extras.forEach((mesh) => planet.add(mesh))

			ctx.scene.add(planet)

			setTimeout(() => {
				planet.visible = true
				planets.push({
					mesh: planet,
					...config
				})
			}, delay)
		}

		/* -------------------------- Stagger planet spawn -------------------------- */
		const planetConfigs = [
			{
				image: "earth.jpg",
				rotateX: 0.01,
				rotateY: 0.01,
				speed: 10,
				radius: 75
			},
			{
				image: "mars.jpg",
				rotateX: 0.01,
				rotateY: 0.015,
				speed: 15,
				radius: 50
			},
			{
				image: "jupiter.jpg",
				rotateX: 0.005,
				rotateY: 0.005,
				speed: 7,
				radius: 150
			},
			{
				image: "venus.jpg",
				rotateX: 0.017,
				rotateY: 0.017,
				speed: 18,
				radius: 30
			},
			{
				image: "saturn.jpg",
				ring: "saturn_rings.png",
				rotateX: 0.01,
				rotateY: 0.01,
				speed: 6,
				radius: 125
			},
			{
				image: "sun.jpg",
				rotateX: 0.005,
				rotateY: 0.005,
				speed: 5,
				radius: 200
			},
			{
				image: "neptune.jpg",
				rotateX: 0.01,
				rotateY: 0.01,
				speed: 15,
				radius: 15
			}
		]

		planetConfigs.forEach((config) => {
			loadPlanet(config, randInt(0, 5000))
		})

		/* ---------------------------- Animating planets --------------------------- */
		const animate = () => {
			planets.forEach((planet) => {
				planet.mesh.position.z += planet.speed
				planet.mesh.rotation.y += planet.rotateY
				planet.mesh.rotation.x += planet.rotateX
				if (planet.mesh.position.z > 5000) {
					planet.mesh.position.z -= 15000
					planet.mesh.position.x = Math.random() * 1000 - 500
					planet.mesh.position.y = Math.random() * 1000 - 500
					planet.speed = clamp(planet.speed + randFloat(-5, 5), 2, 25)
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

		<DirectionalLight shadow position={{ x: 3, y: 3, z: 10 }} />
	</Canvas>
</div>
