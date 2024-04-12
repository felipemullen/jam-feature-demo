'use client';

import { RecognizeResult } from 'tesseract.js';
import { OCRButton } from './ocr-button.component';
import { useRef, useState } from 'react';
import { HighlightOverlay } from './highlight-overlay.component';

export interface HighlightFeatureProps {
    image: string;
}

export function HighlightFeature({ image }: HighlightFeatureProps) {
    const [ocrData, setOcrData] = useState<RecognizeResult>();
    const imageRef = useRef<HTMLImageElement>(null);

    function onDataAvailable(data: RecognizeResult) {
        setOcrData(data);
    }

    return (
        <>
            <div className="w-1/2 bg-gray-100 rounded border border-gray-400 p-6 mx-3">
                <div className="w-full h-full relative">
                    <img ref={imageRef} className="absolute h-full w-full object-contain" src={image} alt="testing screenshot" />
                    <HighlightOverlay data={ocrData} imageRef={imageRef} />
                </div>
            </div>
            <div className="w-1/2 bg-gray-100 rounded border border-gray-400 p-6 mx-3">
                <section>
                    <h2 className="text-xl font-semibold text-gray-600 my-4">1. Analyze the image</h2>
                    <p className="text-gray-600 mb-4">
                        Click the button below to run OCR on the image.
                    </p>
                    <OCRButton imageRef={imageRef} onImageAnalyzed={onDataAvailable} />
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-600 my-4">2. Highlight sections</h2>
                    <p className="text-gray-600 mb-4">
                        Use your mouse to highlight text areas inside the image.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-600 my-4">3. View layer data</h2>
                    <div className="font-mono">
                        <pre>data placeholder</pre>
                    </div>
                </section>
            </div>
        </>
    );
}