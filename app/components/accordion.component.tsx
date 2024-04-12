'use client';

import { PropsWithChildren, useState } from 'react';
import { ChevronDown, ChevronLeft } from 'react-feather';

export interface AccordionProps {
    title: string;
}

export function Accordion({ title, children }: PropsWithChildren<AccordionProps>) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className={`${isOpen ? 'text-gray-900' : 'text-gray-500'} text-base flex items-center justify-between w-full py-5 font-medium border-b border-gray-200 gap-3`} onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                {!isOpen && <ChevronLeft />}
                {isOpen && <ChevronDown />}
            </button>
            {isOpen && <div className="py-5 border-b border-gray-200">{children}</div>}
        </div>
    );
};
