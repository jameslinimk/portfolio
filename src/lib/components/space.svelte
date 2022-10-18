<script lang="ts">
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		Group,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		type ThrelteContext
	} from "@threlte/core"
	import { spring } from "svelte/motion"
	import {
		BoxGeometry,
		CircleGeometry,
		DoubleSide,
		Mesh as tMesh,
		MeshBasicMaterial,
		MeshStandardMaterial,
		SphereGeometry,
		type Scene
	} from "three"
	import { DEG2RAD } from "three/src/math/MathUtils"

	const scale = spring(1)

	let ctx: ThrelteContext
	$: if (ctx) {
	}

	const stars: tMesh<SphereGeometry, MeshBasicMaterial>[] = []

	const addSpheres = (scene: Scene) => {
		// The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
		for (var z = -1000; z < 1000; z += 20) {
			// Make a sphere (exactly the same as before).
			var geometry = new SphereGeometry(0.5, 32, 32)
			var material = new MeshBasicMaterial({ color: 0xffffff })
			var sphere = new tMesh(geometry, material)

			// This time we give the sphere random x and y positions between -500 and 500
			sphere.position.x = Math.random() * 1000 - 500
			sphere.position.y = Math.random() * 1000 - 500

			// Then set the z position to where it is in the loop (distance of camera)
			sphere.position.z = z

			// scale it up a bit
			sphere.scale.x = sphere.scale.y = 2

			//add the sphere to the scene
			scene.add(sphere)

			//finally push it to the stars array
			stars.push(sphere)
		}
	}

	const animateStars = () => {
		// loop through each star
		for (var i = 0; i < stars.length; i++) {
			const star = stars[i]

			// and move it forward dependent on the mouseY position.
			star.position.z += i / 10

			// if the particle is too close move it to the back
			if (star.position.z > 1000) star.position.z -= 2000
		}
	}
</script>

<Canvas bind:ctx>
	<PerspectiveCamera position={{ x: 10, y: 10, z: 10 }} fov={24}>
		<OrbitControls
			maxPolarAngle={DEG2RAD * 80}
			enableZoom={false}
			enableDamping
			dampingFactor={0.1}
			rotateSpeed={0.1}
			autoRotate
			target={{ y: 0.5 }}
		/>
	</PerspectiveCamera>

	<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
	<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
	<AmbientLight intensity={0.2} />

	<!-- Cube -->
	<Group scale={$scale}>
		<Mesh
			interactive
			on:pointerenter={() => ($scale = 2)}
			on:pointerleave={() => ($scale = 1)}
			position={{ y: 0.5 }}
			castShadow
			geometry={new BoxGeometry(1, 1, 1)}
			material={new MeshStandardMaterial({ color: "#333333" })}
		/>
	</Group>

	<!-- Floor -->
	<Mesh
		receiveShadow
		rotation={{ x: -90 * (Math.PI / 180) }}
		geometry={new CircleGeometry(3, 72)}
		material={new MeshStandardMaterial({ side: DoubleSide, color: "white" })}
	/>
</Canvas>
