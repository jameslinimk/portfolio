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
	import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
	import { clamp, randFloat, randInt } from "three/src/math/MathUtils.js"

	let ctx: ThrelteContext

	interface Planet {
		mesh: Mesh<SphereGeometry, MeshPhongMaterial>
		rotateY: number
		rotateX: number
		speed: number
		radius: number
	}

	interface PlanetConfig {
		rotateY: number
		rotateX: number
		speed: number
		radius: number
		image: string
		ring?: string
	}

	const planetConfigs: PlanetConfig[] = [
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
			rotateY: 0.015,
			speed: 15,
			radius: 25
		},
		{
			image: "jupiter.jpg",
			rotateX: 0.005,
			rotateY: 0.005,
			speed: 7,
			radius: 100
		},
		{
			image: "venus.jpg",
			rotateX: 0.017,
			rotateY: 0.017,
			speed: 18,
			radius: 20
		},
		{
			image: "saturn.jpg",
			ring: "saturn_rings.png",
			rotateX: 0.01,
			rotateY: 0.01,
			speed: 6,
			radius: 75
		},
		{
			image: "sun.jpg",
			rotateX: 0.005,
			rotateY: 0.005,
			speed: 5,
			radius: 150
		},
		{
			image: "neptune.jpg",
			rotateX: 0.01,
			rotateY: 0.01,
			speed: 15,
			radius: 12
		}
	]

	/* --------------------------------- Planets -------------------------------- */
	onMount(async () => {
		const planets: Planet[] = []

		/* ----------------------------- Texture loader ----------------------------- */
		const loader = new TextureLoader()
		loader.setPath("images/planets/")
		const loadPlanet = async (config: PlanetConfig, delay: number) => {
			const extras: Object3D[] = []

			/* ---------------------------- Ring (for saturn) --------------------------- */
			const texture = config.ring ? await loader.loadAsync(config.ring) : null
			if (texture) {
				texture.encoding = sRGBEncoding
				const geometry = new RingGeometry(config.radius * 2 + 10, 1, 20)

				// Make sure image is mapped to ring correctly
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

			/* --------------------------------- Planet --------------------------------- */
			const map = await loader.loadAsync(config.image)
			map.encoding = sRGBEncoding

			const geometry = new SphereGeometry(config.radius, 20, 20)
			const material = new MeshPhongMaterial({
				map,
				shininess: 0.1
			})
			const planet = new Mesh(geometry, material)

			/* -------------------------------- Position -------------------------------- */
			planet.position.x = randInt(-2500, 2500)
			planet.position.y = randInt(-2500, 2500)
			planet.position.z = -10000
			extras.forEach((mesh) => planet.add(mesh))
			ctx.scene.add(planet)

			/* ------------------------------- Staggering ------------------------------- */
			setTimeout(() => {
				planets.push({
					mesh: planet,
					...config
				})
			}, delay)
		}

		/* -------------------------- Stagger planet spawn -------------------------- */
		planetConfigs.forEach((config) => {
			loadPlanet(config, randInt(0, 5000))
		})

		/* ---------------------------- Animating planets --------------------------- */
		const animate = () => {
			planets.forEach((planet) => {
				planet.mesh.position.z += planet.speed
				planet.mesh.rotation.y += planet.rotateY
				planet.mesh.rotation.x += planet.rotateX

				// Reset planet
				if (planet.mesh.position.z > 5000) {
					planet.mesh.position.z -= 15000
					planet.mesh.position.x = randInt(-2500, 2500)
					planet.mesh.position.y = randInt(-2500, 2500)
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

	/* ------------------------------- Space ship ------------------------------- */
	onMount(async () => {
		const loader = new GLTFLoader()
		loader.setResourcePath("station/")
		const object = await loader.loadAsync("station/scene.gltf")
		ctx.scene.add(object.scene)

		object.scene.scale.set(0.03, 0.03, 0.03)

		object.scene.position.z -= 15000
		object.scene.position.x = randInt(-2500, 2500)
		object.scene.position.y = randInt(-2500, 2500)

		const animate = () => {
			object.scene.position.z += 5
			object.scene.rotation.y += 0.001
			object.scene.rotation.x += 0.001

			// Reset station
			if (object.scene.position.z > 1000) {
				object.scene.position.z -= 15000
				object.scene.position.x = randInt(-2500, 2500)
				object.scene.position.y = randInt(-2500, 2500)
			}
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
