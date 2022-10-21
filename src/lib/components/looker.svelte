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
	import { onMount } from "svelte"
	import { spring } from "svelte/motion"
	import type { Writable } from "svelte/store"
	import {
		BoxGeometry,
		Color,
		MeshLambertMaterial,
		Plane,
		Raycaster,
		sRGBEncoding,
		TextureLoader,
		Vector3,
		type Camera
	} from "three"

	export let scaleBase: number
	$: {
		$scale = scaleBase
	}

	/* ----------------------------- Vars / bindings ---------------------------- */
	const scale = spring(scaleBase)
	let ctx: ThrelteContext
	let container: HTMLAnchorElement
	let camera: Writable<Camera>
	let lookAt: LookAt

	/* ---------------------------- Loading materials --------------------------- */
	let materials: MeshLambertMaterial[] = []
	onMount(() => {
		const loader = new TextureLoader()
		loader.setPath("images/cube/")
		const map = loader.load("face.png")
		map.encoding = sRGBEncoding
		const img = new MeshLambertMaterial({ map })
		materials = [img, img, img, img, img, img]
	})

	/* ---------------------------- Looking at mouse ---------------------------- */
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

	/* ------------------------------ Anchor hover ------------------------------ */
	let fadeToWhite = spring(0)
	const fadeMultiplier = 0.05
	const currentColor = (fade: number) => {
		fade *= fadeMultiplier
		const color = new Color(0xa8a8a8)
		const vector = new Color((255 - color.r) * fade, (255 - color.g) * fade, (255 - color.b) * fade)
		return new Color(color.r + vector.r, color.g + vector.g, color.b + vector.b)
	}
	$: {
		for (let i = 0; i < materials.length; i++) {
			materials[i].color = currentColor($fadeToWhite)
		}
	}

	let mousePointer = false
	$: {
		$scale = mousePointer ? scaleBase * 1.1 : scaleBase
		$fadeToWhite = mousePointer ? 1 : 0
	}
	onMount(() => {
		document.querySelectorAll("a").forEach((element) => {
			element.onpointerenter = () => (mousePointer = true)
			element.onpointerleave = () => (mousePointer = false)
		})
	})
</script>

<svelte:window on:mousemove={onPointerMove} />

<a
	href="/"
	bind:this={container}
	class="fixed top-0 left-0 z-50 -translate-x-0.5 -translate-y-0.5 w-12 h-12"
>
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
			on:pointerenter={() => ($scale = scaleBase * 1.25)}
			on:pointerleave={() => ($scale = scaleBase)}
		/>
	</Canvas>
</a>
