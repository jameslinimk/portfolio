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
		extras: Mesh[]
	}
	/* --------------------------------- Planets -------------------------------- */
	onMount(() => {
		const planets: Planet[] = []

		/* ----------------------------- Texture loader ----------------------------- */
		const loader = new TextureLoader()
		loader.setPath("images/planets/")
		const loadPlanet = (
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
			const map = loader.load(config.image)
			map.encoding = sRGBEncoding

			const extras: Mesh[] = []

			const texture = config.ring ? loader.load(config.ring) : null
			if (texture) {
				console.log("Loading ring", config.ring)

				texture.encoding = sRGBEncoding
				const geometry = new RingGeometry(1000, 1, 20)
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

			const x = Math.random() * 5000 - 500
			const y = Math.random() * 5000 - 500
			;[...extras, planet].forEach((mesh) => {
				mesh.position.x = x
				mesh.position.y = y
				mesh.position.z = -10000
				mesh.visible = false

				ctx.scene.add(mesh)
			})

			setTimeout(() => {
				;[...extras, planet].forEach((mesh) => {
					mesh.visible = true
				})

				planets.push({
					mesh: planet,
					extras,
					...config
				})
			}, delay)
		}

		/* -------------------------- Stagger planet spawn -------------------------- */
		;[
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
				speed: 0,
				radius: 500
			}
		].forEach((config) => {
			loadPlanet(config, randInt(0, 5000))
		})

		/* ---------------------------- Animating planets --------------------------- */
		const animate = () => {
			planets.forEach((planet) => {
				;[...planet.extras, planet.mesh].forEach((mesh) => {
					mesh.position.z += planet.speed
					mesh.rotation.y += planet.rotateY
					mesh.rotation.x += planet.rotateX
					if (mesh.position.z > 5000) {
						mesh.position.z -= 10000
						mesh.position.x = Math.random() * 1000 - 500
						mesh.position.y = Math.random() * 1000 - 500
						planet.speed = clamp(planet.speed + randFloat(-5, 5), 2, 25)
					}
				})
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
