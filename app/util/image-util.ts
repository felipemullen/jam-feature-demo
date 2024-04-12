/**
 * Adapted from original source at https://stackoverflow.com/a/52187440/3654061
 */
export function getContainedSize(image: HTMLImageElement) {
    const imageRatio = image.naturalWidth / image.naturalHeight;

    let width = image.height * imageRatio;
    let height = image.height;
    if (width > image.width) {
        width = image.width;
        height = image.width / imageRatio;
    }

    const top = (image.height - height) / 2;
    const left = (image.width - width) / 2;

    const downscaleRatio = Math.min(width / image.naturalWidth, height / image.naturalHeight);

    return {
        scalingRatio: downscaleRatio,
        top,
        left,
        width,
        height
    };
}

/**
 * This was very tricky to implement.
 * I had to research a bit and settled on a basic Euclidean distance between the
 * top left points. If the distance is less than the threshold, merge the rectangles.
 * https://en.wikipedia.org/wiki/Euclidean_distance
 *
 * This algorithm also relies on the fact that the data array is expected to be
 * sorted in the order of the strokes, since the mouse is recorded in that order.
 *
 * Mostly notes for my future self:
 *
 * - Iterate over the data array
 * - If we aren't already looking at a stroke (startStroke), set it and continue to the next
 * - Calculate the distance between the current stroke and the next stroke
 *     - If the distance is less than the threshold, merge the two strokes
 *     - If the distance is greater than or equal to the threshold, add the size to the startStroke
 * - Set the previous stroke to the current stroke
 */
export function mergeStrokes(strokes: { left: number, top: number, width: number, height: number }[], maxDistanceThresholdPx = 25) {
    const mergedStrokes = [];
    let startStroke = null;

    for (const currentStroke of strokes) {
        if (!startStroke) {
            startStroke = { ...currentStroke };
            continue;
        }

        // Eucledian distance calculation using top left points
        const distance = Math.sqrt(Math.pow(currentStroke.left - startStroke.left, 2) + Math.pow(currentStroke.top - startStroke.top, 2));

        // If the distance is less than the threshold, merge the two strokes
        if (distance < maxDistanceThresholdPx) {
            startStroke.width += currentStroke.width;
        } else {
            // If the distance is greater than or equal to the threshold, add it as it's own stroke
            mergedStrokes.push(startStroke);
            startStroke = { ...currentStroke };
            startStroke = { ...currentStroke };
        }

    }

    // This is just a failsafe to make sure the last stroke is added
    if (startStroke) {
        mergedStrokes.push({ ...startStroke });
    }

    return mergedStrokes;
}