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