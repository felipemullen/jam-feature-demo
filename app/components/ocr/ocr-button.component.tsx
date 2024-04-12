'use client';

import { useEffect, useState } from 'react';
import { RecognizeResult, createWorker, Worker, OutputFormats } from 'tesseract.js';
import { HighlighterIcon } from '../icon/highlighter-icon.component';
import { Loader } from 'react-feather';

const tesseractOutput: Partial<OutputFormats> = {
    text: false,
    pdf: false,
    box: false,
    hocr: false,
    tsv: false,
    osd: false,
    unlv: false
};

export type WorkerState = 'loading' | 'ready' | 'analyzing' | 'active';

export interface OCRProps {
    imageRef: React.RefObject<HTMLImageElement>;
    onImageAnalyzed: (data: RecognizeResult) => void;
}

export function OCRButton({ imageRef, onImageAnalyzed }: OCRProps) {
    const [worker, setWorker] = useState<Worker>();
    const [state, setState] = useState<WorkerState>('loading');

    useEffect(() => {
        if (!worker) {
            (async () => {
                const worker = await createWorker('eng');
                setWorker(worker);
                setState('ready');
            })();
        }
        return () => {
            worker?.terminate();
        };
    }, [worker]);

    async function btnHighlightClicked() {
        if (worker) {
            setState('analyzing');
            const data = await worker.recognize(imageRef.current?.src || '', {}, tesseractOutput);
            if (data) {
                onImageAnalyzed(data);
                setState('active');
            }
        }
    }

    switch (state) {
    case 'loading':
        return (<Button text="Loading..." overrides="bg-gray-200 text-gray-600" disabled isLoader />);
    case 'ready':
        return (<Button text="Analyze Image" overrides="bg-white text-gray-600 hover:text-red-400" onClick={btnHighlightClicked} />);
    case 'analyzing':
        return (<Button text="Analyzing..." overrides="bg-white" disabled isLoader />);
    case 'active':
        return (<Button text="Highlight Text" overrides="bg-gray-200 text-red-400 border-red-300" disabled />);
    }
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    overrides?: string;
    isLoader?: boolean;
    text: string;
}

function Button({ overrides, isLoader, text, ...buttonProps }: ButtonProps) {
    return (
        <button className={`${overrides} py-1 px-2 rounded-full border-2 flex items-center`} {...buttonProps}>
            {!!isLoader && <Loader className="h-8 w-8 p-1 animate-spin text-red-400" />}
            {!isLoader && <HighlighterIcon className="h-8 w-8 fill-red-400" />}
            <span className="mx-2 font-medium">{text}</span>
        </button>
    );
}