'use client';

import { RecognizeResult, Rectangle } from 'tesseract.js';
import { OCRButton } from '../ocr/ocr-button.component';
import { useRef, useState } from 'react';
import { HighlightOverlay } from './highlight-overlay.component';
import { mergeStrokes } from '@/app/util/image-util';

export interface HighlightFeatureProps {
    image: string;
}

export function HighlightFeature({ image }: HighlightFeatureProps) {
    const [ocrData, setOcrData] = useState<RecognizeResult>();
    const [userStrokes, setUserStrokes] = useState<Rectangle[]>([]);
    const imageRef = useRef<HTMLImageElement>(null);

    function onDataAvailable(data: RecognizeResult) {
        setOcrData(data);
    }

    function onUserDraw(stroke: Rectangle) {
        const mergedStrokes = mergeStrokes([...userStrokes, stroke], 50);
        setUserStrokes(mergedStrokes);
    }

    return (
        <>
            <div className="w-1/2 bg-gray-100 rounded-lg border border-gray-400 p-6 mx-3">
                <div className="w-full h-full relative">
                    {// eslint-disable-next-line @next/next/no-img-element
                    }<img ref={imageRef} className="absolute h-full w-full object-contain" src={image} alt="testing screenshot" />
                    <HighlightOverlay data={ocrData} imageRef={imageRef} onDraw={onUserDraw} />
                </div>
            </div>
            <div className="w-1/2 bg-gray-100 rounded border border-gray-400 p-6 mx-3">
                <section className="animate-fadeIn">
                    <h2 className="text-xl font-semibold text-gray-600 my-4">1. Analyze the image</h2>
                    <p className="text-gray-600 mb-4">
                        Click the button below to run OCR on the image.
                    </p>
                    <OCRButton imageRef={imageRef} onImageAnalyzed={onDataAvailable} />
                </section>

                {ocrData &&
                    <section className="animate-fadeIn">
                        <h2 className="text-xl font-semibold text-gray-600 my-4">2. Highlight sections</h2>
                        <p className="text-gray-600 mb-4">
                            Use your mouse to highlight text areas inside the image.
                        </p>
                    </section>
                }

                {userStrokes.length > 0 &&
                    <section className="animate-fadeIn">
                        <h2 className="text-xl font-semibold text-gray-600 my-4">3. View layer data</h2>
                        <p className="text-gray-600 mb-4">
                            The data below represents the highlighted areas.
                        </p>
                        <pre className="text-wrap bg-gray-200 text-gray-600 border border-gray-300 rounded-lg p-3">{JSON.stringify(userStrokes)}</pre>
                    </section>
                }
            </div>
        </>
    );
}