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
 * - If we aren't already looking at a stroke (startStroke), set it
 * - Calculate the distance between the end of the start stroke and the next stroke
 *     - If the distance is less than the threshold, merge the two strokes by adding the width
 *     - If the distance is greater than or equal to the threshold, consider it completed and add it to the list
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
        const rightMostPoint = startStroke.left + startStroke.width;
        const distance = Math.sqrt(Math.pow(currentStroke.left - rightMostPoint, 2) + Math.pow(currentStroke.top - startStroke.top, 2));

        // If the distance is less than the threshold, merge the two strokes
        if (distance < maxDistanceThresholdPx) {
            startStroke.width += currentStroke.width;
            startStroke.height = Math.max(startStroke.height, currentStroke.height);
        } else {
            // If the distance is greater than or equal to the threshold, add it as it's own stroke
            mergedStrokes.push(startStroke);
            startStroke = { ...currentStroke };
        }
    }

    // This is just a failsafe to make sure the last stroke is added
    if (startStroke) {
        mergedStrokes.push({ ...startStroke });
    }

    return mergedStrokes;
}