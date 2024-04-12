export function MotivationTab() {
    return (
        <div className="p-6">
            <section className="animate-fadeIn">
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Motivation</h2>
                <p className="text-gray-600 mb-4">
                    I thought it would be cool to implement a new feature and showcase some of my skills!
                </p>
                <p className="text-gray-600 mb-4">
                    Jam already has lots of features built in. During my research, I found that
                    most of the users appear to be quite satisfied already. (that&apos;s a good thing!)
                </p>
                <p className="text-gray-600 mb-4">
                    I did my best to come up with some new ideas, and as a non-paid user I ended up
                    with a few, some of which were mentioned around the internet. I decided to categorize
                    them:
                </p>
                <h2 className="text-md font-semibold text-gray-400 my-4">Too simple / boring</h2>
                <ul className="list-disc text-gray-400 ml-6">
                    <li>Dark mode / theming</li>
                    <li>Font choice for text blocks</li>
                    <li>Adding stickers / images to Jams</li>
                </ul>
                <h2 className="text-md font-semibold text-gray-400 my-4">Difficult when you don&apos;t own the project</h2>
                <ul className="list-disc text-gray-400 ml-6">
                    <li>Firefox version</li>
                    <li>New integrations with existing software</li>
                    <li>Jams are saved as images and cannot be edited after the fact (is this even still true?)</li>
                    <li>The arrow tool cannot draw curved lines</li>
                </ul>
                <h2 className="text-md font-semibold text-green-600 my-4"><em>Just right&trade;</em></h2>
                <ul className="list-disc text-gray-600 ml-6">
                    <li>The marker tool does <span className="bg-yellow-300/70 px-1 py-2 rounded-lg">not</span> perform well as a <span className="bg-yellow-300/70 px-1 py-2 rounded-lg">highlighter</span></li>
                </ul>
                <hr className="my-4" />
                <p className="text-gray-600 mb-4">
                    I thought it would be <strong>fun / interesting to implement this feature</strong>, even if it had already
                    been implemented. The immediate solution that came to mind was a single canvas overlay
                    on top of the image, but then I thought, <em>where&apos;s the fun in that?</em>
                </p>
                <p className="text-gray-600 mb-4">
                    So <strong>I decided to turn it up a notch</strong>, and make it so that only visible text could be highlighted.
                    I have only used <span className="font-mono text-sm bg-gray-200 p-1 rounded border border-gray-400">canvas</span> a few times, so that was a bit of a challenge.
                    My solution uses an <strong>OCR library</strong> to analyze the image first, and then
                    informs the user via a <strong>custom cursor</strong> that text can be highlighted.
                </p>
                <p className="text-gray-600 mb-4">
                    I think overall this was a fair demo of what I can do in a short amount of time, and it showcases
                    some of the skills I have. Checkout the <strong>Implementation tab</strong> for more details.
                </p>
                <p>
                    I hope you enjoy! 😊
                </p>
            </section>
        </div>
    );
}