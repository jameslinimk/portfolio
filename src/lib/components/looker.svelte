<script script lang="ts">
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		Mesh,
		PerspectiveCamera,
		type LookAt,
		type ThreltePointerEvent
	} from "@threlte/core"
	import { BoxGeometry, MeshStandardMaterial, Vector3 } from "three"

	let lookAt: LookAt
	const onPointerMove = (event: CustomEvent<ThreltePointerEvent>) => {
		const obj = event.detail.object

		const unpr = new Vector3().copy(event.detail.point)
		const unprwtl = obj.worldToLocal(unpr).add(new Vector3(0, 0, 1))
		lookAt = unprwtl
	}
</script>

<Canvas>
	<PerspectiveCamera position={{ x: 0, y: 0, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }} />

	<DirectionalLight position={{ x: 3, y: 3, z: 3 }} />
	<AmbientLight color="0xffffff" intensity={1.25} />

	<Mesh
		interactive
		material={new MeshStandardMaterial()}
		position={{ x: 0, y: 0, z: 0 }}
		geometry={new BoxGeometry(0.8, 0.8, 0.8)}
		{lookAt}
		on:pointermove={onPointerMove}
	/>
</Canvas>
