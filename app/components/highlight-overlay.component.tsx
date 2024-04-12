'use client';

import { useRef, useState, MouseEvent, useEffect, RefObject } from 'react';
import { Bbox, RecognizeResult, Rectangle } from 'tesseract.js';
import { getContainedSize } from '../util/image-util';

const HIGHLIGHT_SIZE = 15;
const HIGHLIGHT_COLOR = 'rgb(255, 255, 0)';

export interface HighlightOverlayProps {
    imageRef: RefObject<HTMLImageElement>;
    data?: RecognizeResult;
}

export function HighlightOverlay({ imageRef, data }: HighlightOverlayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);
    const [ocrItems, setOcrItems] = useState<Rectangle[]>([]);

    function getScaledSize(bbox: Bbox, ratio: number) {
        return {
            left: bbox.x0 * ratio,
            top: bbox.y0 * ratio,
            width: (bbox.x1 - bbox.x0) * ratio,
            height: (bbox.y1 - bbox.y0) * ratio
        };
    }

    function pointIsInRect(x: number, y: number, rect: Rectangle) {
        return x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height;
    }

    useEffect(() => {
        if (data && canvasRef.current && imageRef.current && wrapperRef.current) {
            const { top, left, width, height, scalingRatio } = getContainedSize(imageRef.current);

            wrapperRef.current.style.top = `${top}px`;
            wrapperRef.current.style.left = `${left}px`;
            wrapperRef.current.style.width = `${width}px`;
            wrapperRef.current.style.height = `${height}px`;

            const canvas = canvasRef.current;
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.lineWidth = HIGHLIGHT_SIZE;
                context.lineJoin = 'round';
                context.lineCap = 'round';
                context.strokeStyle = HIGHLIGHT_COLOR;
            }

            const ocrItems = data.data.lines.map(line => getScaledSize(line.bbox, scalingRatio));
            setOcrItems(ocrItems);
        }
    }, [data, imageRef, canvasRef, wrapperRef]);

    function startDrawing(event: MouseEvent) {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
            const intersectsOcrItem = ocrItems.some(item => pointIsInRect(mouseX, mouseY, item));

            if (intersectsOcrItem) {
                setIsDrawing(true);
                setPrevX(event.clientX - canvasRef.current.getBoundingClientRect().left);
                setPrevY(event.clientY - canvasRef.current.getBoundingClientRect().top);
            }
        }
    };

    function drawLine(event: MouseEvent) {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;

            const intersectsOcrItem = ocrItems.find(item => pointIsInRect(mouseX, mouseY, item));

            if (intersectsOcrItem) {
                canvas.classList.add('cursor-highlight');
                if (context && isDrawing) {
                    context.lineWidth = intersectsOcrItem.height;
                    context.beginPath();
                    context.moveTo(prevX, prevY);
                    context.lineTo(mouseX, mouseY);
                    context.stroke();

                    setPrevX(mouseX);
                    setPrevY(mouseY);
                } else {
                    setIsDrawing(false);
                }
            } else {
                canvas.classList.remove('cursor-highlight');
            }
        }
    };

    function stopDrawing() {
        setIsDrawing(false);
    };

    return (
        <div ref={wrapperRef} className="absolute border border-fuchsia-500">
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={drawLine}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                className="opacity-35"
                style={{}}
            />
        </div>
    );
}