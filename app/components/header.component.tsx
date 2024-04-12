import { GitHub } from 'react-feather';

export function Header() {
    return (
        <div className="p-3">
            <div className="w-full flex items-center justify-center">
                <h1 className="text-4xl font-extrabold text-gray-600 me-3">Feature Demo: OCR + Text Highlighting</h1>
                <a href="https://github.com/felipemullen/jam-feature-demo" target="_blank" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 rounded-lg text-xs px-3 py-2 text-center inline-flex items-center">
                    <GitHub className="w-4 h-4 me-2" />GitHub
                </a>
            </div>
            <p className="text-center text-sm text-gray-500">(this page was not made with mobile devices in mind)</p>
        </div>
    );
}