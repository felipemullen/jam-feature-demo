import { Loader } from 'react-feather';

export function Loading() {
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