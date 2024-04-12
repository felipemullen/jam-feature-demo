export function ImplementationTab() {
    return (
        <div className="p-6">
            <section className="animate-fadeIn">
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Implementation</h2>
                <p className="text-gray-600 mb-4">
                </p>
            </section>
            <section className="animate-fadeIn">
                <h2 className="text-xl font-semibold text-gray-600 mb-4">Challenges</h2>
                <p className="text-gray-600 mb-4">
                </p>
                <ul className="list-disc text-gray-600 ml-6">
                    <li>The lines produced in OCR aren't perfect. Could be tweaked with some real word detection</li>
                    <li>I did not implement any recalculations during window resize. It shouldn&apos;t be very difficult</li>
                    <li>There is no dark mode. Seems to be an app killer these days.</li>
                </ul>
            </section>
            <section className="animate-fadeIn">
                <h2 className="text-xl font-semibold text-gray-600 mb-4">Improvements</h2>
                <p className="text-gray-600 mb-4">
                    Of course, there are things that could be improved. I didn&apos;t want to spend too much time on this project,
                    but here is a list of some obvious improvements:
                </p>
                <ul className="list-disc text-gray-600 ml-6">
                    <li>The lines produced in OCR aren't perfect. Could be tweaked with some real word detection</li>
                    <li>I did not implement any recalculations during window resize. It shouldn&apos;t be very difficult</li>
                    <li>There is no dark mode. Seems to be an app killer these days.</li>
                </ul>
            </section>
        </div>
    );
}