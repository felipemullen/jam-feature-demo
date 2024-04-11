'use client';

import { useEffect, useState } from 'react';
import { Loader } from 'react-feather';
import { RecognizeResult, createWorker, Worker } from 'tesseract.js';
import { HighlighterIcon } from './highlighter-icon.component';

export interface OCRProps {
    imageUrl: string;
}

export function OCR({ imageUrl }: OCRProps) {
    const [worker, setWorker] = useState<Worker>();
    const [output, setOutput] = useState<RecognizeResult>();

    useEffect(() => {
        (async () => {
            const worker = await createWorker('eng');
            setWorker(worker);
            console.log('Worker created');
        })();
        return () => {
            worker?.terminate();
        };
    }, []);

    async function btnHighlightClicked() {
        if (worker) {
            const data = await worker.recognize(imageUrl);
            console.log(data);
        }
    }

    if (!worker) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="bg-white flex items-center py-3 px-5 rounded-full border-2">
                    <p className="text-gray-500 mr-3">
                        Loading...
                    </p>
                    <Loader className="animate-spin text-gray-500" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-600 my-4">1. Analyze the image</h2>
            <p className="text-gray-600 mb-4">
                Click the button below to run OCR on the image.
            </p>
            <button className="bg-white text-gray-800 hover:bg-gray-200 py-1 px-2 rounded-full border-2 flex items-center" onClick={btnHighlightClicked}>
                <HighlighterIcon className="h-8 w-8 fill-red-400" />
                <span className="mx-2 font-medium text-gray-600">Highlight Text</span>
            </button>

            <h2 className="text-xl font-semibold text-gray-600 my-4">2. Highlight sections</h2>
            <h2 className="text-xl font-semibold text-gray-600 my-4">3. View layer data</h2>
            <div className="font-mono">
                <pre>data placeholder</pre>
            </div>
        </div>
    );
}