import type { Mesh, MeshPhongMaterial, SphereGeometry } from "three"

export interface Planet {
	mesh: Mesh<SphereGeometry, MeshPhongMaterial>
	rotateY: number
	rotateX: number
	speed: number
	radius: number
}

export interface PlanetConfig {
	rotateY: number
	rotateX: number
	speed: number
	radius: number
	image: string
	ring?: string
}

export const planetConfigs: PlanetConfig[] = [
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
