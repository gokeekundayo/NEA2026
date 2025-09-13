export function getID(element) {
	return document.getElementById(element);
}
export function polygonsCollide(polyA, polyB) {
	return !hasSeparatingAxis(polyA, polyB) && !hasSeparatingAxis(polyB, polyA);
}

function hasSeparatingAxis(polyA, polyB) {
	for (let i = 0; i < polyA.length; i++) {
		const p1 = polyA[i];
		const p2 = polyA[(i + 1) % polyA.length];
		const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
		const axis = { x: -edge.y, y: edge.x };

		const [minA, maxA] = projectPolygon(polyA, axis);
		const [minB, maxB] = projectPolygon(polyB, axis);

		if (maxA < minB || maxB < minA) return true; // gap found
	}
	return false;
}

function projectPolygon(poly, axis) {
	let min = Infinity;
	let max = -Infinity;
	const len = Math.hypot(axis.x, axis.y);
	const nx = axis.x / len;
	const ny = axis.y / len;

	for (const p of poly) {
		const projection = p.x * nx + p.y * ny;
		if (projection < min) min = projection;
		if (projection > max) max = projection;
	}
	return [min, max];
}
