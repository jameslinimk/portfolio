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
	import { spring } from "svelte/motion"
	import type { Writable } from "svelte/store"
	import type { Camera } from "three"
	import {
		BoxGeometry,
		MeshLambertMaterial,
		Plane,
		Raycaster,
		sRGBEncoding,
		TextureLoader,
		Vector3
	} from "three"

	const scale = spring(1)

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

	const loader = new TextureLoader()
	loader.setPath("images/cube/")
	const loadImage = (path: string) => {
		const mat = loader.load(path)
		mat.encoding = sRGBEncoding
		return new MeshLambertMaterial({ map: mat })
	}
	const materials = ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"].map((path) =>
		loadImage(path)
	)
</script>

<svelte:window on:mousemove={onPointerMove} />

<div bind:this={container} class="fixed bottom-2 left-2 w-24 h-24">
	<Canvas bind:ctx>
		<PerspectiveCamera position={{ x: 0, y: 0, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }} />

		<DirectionalLight position={{ x: 0, y: 0, z: 3 }} />
		<AmbientLight color={0x000000} intensity={1.25} />

		<Mesh
			scale={$scale}
			interactive
			material={materials}
			position={{ x: 0, y: 0, z: 0 }}
			geometry={new BoxGeometry(0.8, 0.8, 0.8)}
			{lookAt}
			on:pointerenter={() => ($scale = 1.5)}
			on:pointerleave={() => ($scale = 1)}
		/>
	</Canvas>
</div>
