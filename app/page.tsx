import Image from 'next/image';

export default function HomePage() {
    return (
        <main className="flex h-screen flex-col items-center justify-between p-12">
            <h1 className="text-4xl font-extrabold text-gray-600 mb-6">Image Highlighting</h1>
            <div className="h-full w-full flex font-mono text-sm">
                <div className="w-1/2 bg-gray-100 rounded border border-gray-400 p-6 mx-3">
                    <div className="h-full w-full relative">
                        <Image fill className="object-contain" src="/images/screenshot.png" alt="testing screenshot" />
                    </div>
                </div>
                <div className="w-1/2 bg-gray-100 rounded border border-gray-400 p-6 mx-3"></div>
            </div>
        </main>
    );
}
