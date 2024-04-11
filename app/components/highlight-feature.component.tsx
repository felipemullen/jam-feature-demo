'use client';

import { RecognizeResult } from 'tesseract.js';
import { OCRButton } from './ocr-button.component';
import Image from 'next/image';

export interface HighlightFeatureProps {
    image: string;
}

export function HighlightFeature({ image }: HighlightFeatureProps) {

    function onDataAvailable(data: RecognizeResult) {
        console.log('Data available: ', data);
    }

    return (
        <>
            <div className="w-1/2 bg-gray-100 rounded border border-gray-400 p-6 mx-3">
                <div className="h-full w-full relative">
                    <Image fill className="object-contain" src={image} alt="testing screenshot" />
                </div>
            </div>
            <div className="w-1/2 bg-gray-100 rounded border border-gray-400 p-6 mx-3">
                <section>
                    <h2 className="text-xl font-semibold text-gray-600 my-4">1. Analyze the image</h2>
                    <p className="text-gray-600 mb-4">
                        Click the button below to run OCR on the image.
                    </p>
                    <OCRButton imageUrl={image} onImageAnalyzed={onDataAvailable} />
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-600 my-4">2. Highlight sections</h2>
                    {/* TODO */}
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