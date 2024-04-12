import { RefObject, useEffect, useRef, useState } from 'react';
import { Bbox, RecognizeResult } from 'tesseract.js';
import { getContainedSize } from '../../util/image-util';

export interface OCROverlayProps {
    imageRef: RefObject<HTMLImageElement>;
    data?: RecognizeResult;
}

export function OCROverlay({ data, imageRef }: OCROverlayProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [ocrItems, setOcrItems] = useState<React.JSX.Element[]>([]);

    function getScaledSize(bbox: Bbox, ratio: number) {
        return {
            x: bbox.x0 * ratio,
            y: bbox.y0 * ratio,
            width: (bbox.x1 - bbox.x0) * ratio,
            height: (bbox.y1 - bbox.y0) * ratio
        };
    }

    useEffect(() => {
        if (data && wrapperRef.current && imageRef.current) {
            const { top, left, width, height, scalingRatio } = getContainedSize(imageRef.current);

            wrapperRef.current.style.top = `${top}px`;
            wrapperRef.current.style.left = `${left}px`;
            wrapperRef.current.style.width = `${width}px`;
            wrapperRef.current.style.height = `${height}px`;

            const ocrItems = data.data.lines.map((line, index) => {
                const size = getScaledSize(line.bbox, scalingRatio);

                return (
                    <div key={index} style={{ top: size.y, left: size.x, width, height }} className="cursor-highlight absolute border border-fuchsia-500" ></div>
                );
            });

            setOcrItems(ocrItems);
        }
    }, [data, imageRef, wrapperRef]);

    return (
        <div ref={wrapperRef} className="absolute text-white text-center border border-fuchsia-500">
            {ocrItems}
        </div>
    );
}

