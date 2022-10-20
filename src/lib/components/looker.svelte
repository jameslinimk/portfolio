<script script lang="ts">
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		Mesh,
		PerspectiveCamera,
		type LookAt,
		type ThrelteContext
	} from "@threlte/core"
	import type { Writable } from "svelte/store"
	import type { Camera } from "three"
	import { BoxGeometry, MeshStandardMaterial, Plane, Raycaster, Vector3 } from "three"

	let ctx: ThrelteContext
	let container: HTMLDivElement
	let camera: Writable<Camera>
	let lookAt: LookAt

	const onPointerMove = (event: MouseEvent) => {
		const rect = container.getBoundingClientRect()
		const centerX = (rect.left + rect.right) / 2
		const centerY = (rect.top + rect.bottom) / 2

		const diffX = window.innerWidth / 2 - centerX
		const diffY = window.innerHeight / 2 - centerY

		const plane = new Plane(new Vector3(0, 0, 1), 0)
		const mouse = new Vector3(
			((event.clientX + diffX) / window.innerWidth) * 2 - 1,
			-((event.clientY + diffY) / window.innerHeight) * 2 + 1
		)
		const raycaster = new Raycaster()
		const intersectPoint = new Vector3()

		camera = ctx.camera
		raycaster.setFromCamera(mouse, $camera)
		raycaster.ray.intersectPlane(plane, intersectPoint)
		intersectPoint.z = $camera.position.z
		lookAt = intersectPoint
	}
</script>

<svelte:window on:mousemove={onPointerMove} />

<div class="w-96 h-96" bind:this={container}>
	<Canvas bind:ctx>
		<PerspectiveCamera position={{ x: 0, y: 0, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }} />

		<DirectionalLight position={{ x: 3, y: 3, z: 3 }} />
		<AmbientLight color={0xffffff} intensity={1.25} />

		<Mesh
			interactive
			material={new MeshStandardMaterial()}
			position={{ x: 0, y: 0, z: 0 }}
			geometry={new BoxGeometry(0.8, 0.8, 0.8)}
			{lookAt}
		/>
	</Canvas>
</div>
