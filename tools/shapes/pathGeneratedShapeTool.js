class PathGeneratedShapeTool extends ShapeTool {
	constructor() {
		super();
	}

	addPointerDownListener(e) {
		if (e.button !== 0) return;

		const startPosition = viewport.getAdjustedPosition(Vector.fromOffsets(e));
		const pathGeneratedShape = new this._shape(
			startPosition,
			propertiesPanel.getValues()
		);

		// Store the original ID to maintain consistency during drawing
		const shapeId = pathGeneratedShape.id;

		const moveCallback = function (e) {
			const mousePosition = viewport.getAdjustedPosition(
				Vector.fromOffsets(e)
			);
			
			// Preserve the shape ID to avoid flickering
			pathGeneratedShape.id = shapeId;
			pathGeneratedShape.addPoint(mousePosition);

			viewport.drawShapes([pathGeneratedShape]);
		};

		const upCallback = function (e) {
			viewport
				.getStageCanvas()
				.removeEventListener("pointermove", moveCallback);
			viewport.getStageCanvas().removeEventListener("pointerup", upCallback);

			pathGeneratedShape.recenter();
			if (
				pathGeneratedShape.size.width > 0 &&
				pathGeneratedShape.size.height > 0
			) {
				viewport.addShapes(pathGeneratedShape);
			}
		};
		viewport.getStageCanvas().addEventListener("pointermove", moveCallback);
		viewport.getStageCanvas().addEventListener("pointerup", upCallback);
	}
}
