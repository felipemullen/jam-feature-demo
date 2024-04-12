export function Keyword({ text }: { text: string }) {
    return (<span className="font-mono text-xs bg-gray-200 p-1 rounded border border-gray-400">{text}</span>);
}

export function HighlightText({ text }: { text: string }) {
    return (<span className="bg-yellow-300/70 px-1 py-2 rounded-lg">{text}</span>);
}