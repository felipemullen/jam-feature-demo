'use client';

import { RecognizeResult, Rectangle } from 'tesseract.js';
import { OCRButton } from '../ocr/ocr-button.component';
import { useRef, useState } from 'react';
import { HighlightOverlay } from './highlight-overlay.component';
import { mergeStrokes } from '@/app/util/image-util';
import { MotivationTab } from '../tabs/motivation-tab.component';
import { TabBar, TabTypes } from '../tabs/tab-bar.component';
import { ImplementationTab } from '../tabs/implementation-tab.component';

export interface HighlightFeatureProps {
    image: string;
}

export function HighlightFeature({ image }: HighlightFeatureProps) {
    const [ocrData, setOcrData] = useState<RecognizeResult>();
    const [userStrokes, setUserStrokes] = useState<Rectangle[]>([]);
    const imageRef = useRef<HTMLImageElement>(null);
    const [currentTab, setCurrentTab] = useState<TabTypes>('demo');

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
            <div className="w-1/2 relative bg-gray-100 rounded-lg border border-gray-400 mx-3">
                <div className="absolute top-0 left-0 bottom-0 w-full flex flex-col">
                    <TabBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
                    <div className="flex-grow min-h-0 overflow-auto">
                        {currentTab === 'demo' &&
                            <div className="p-6">
                                <section className="animate-fadeIn">
                                    <h2 className="text-xl font-semibold text-gray-600 mb-4">1. Analyze the image</h2>
                                    <p className="text-gray-600 mb-4">
                                        Click the button below to run OCR on the "screenshot" on the left.
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
                                            The data below represents the highlighted areas:
                                        </p>
                                        <pre className="text-wrap bg-gray-200 text-gray-600 border border-gray-300 rounded-lg p-3 overflow-auto">{JSON.stringify(userStrokes)}</pre>
                                        <p className="text-gray-600 mt-4">
                                            This data could be used to export the highlighted areas separately from the image itself.
                                            The image could then be reconstructed as layers, which would allow future edits.
                                        </p>
                                    </section>
                                }
                            </div>
                        }

                        {currentTab === 'motivation' && <MotivationTab />}
                        {currentTab === 'implementation' && <ImplementationTab />}
                    </div>
                </div>
            </div>
        </>
    );
}