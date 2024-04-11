import { RefObject, useEffect, useRef, useState } from 'react';
import { Bbox, RecognizeResult } from 'tesseract.js';
import { getContainedSize } from '../util/image-util';

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

            const ocrItems = data.data.words.map((word, index) => (
                <OCRItem key={index} {...getScaledSize(word.bbox, scalingRatio)} />
            ));

            setOcrItems(ocrItems);
        }
    }, [data, imageRef, wrapperRef]);

    return (
        <div ref={wrapperRef} className="absolute bg-red-200/20 text-white text-center border border-fuchsia-500">
            {ocrItems}
        </div>
    );
}

interface OCRItemProps {
    x: number;
    y: number;
    width: number;
    height: number;
}

function OCRItem({ x, y, width, height }: OCRItemProps) {
    return (<span style={{ top: y, left: x, width, height }} className="absolute border border-red-500"></span>);
}