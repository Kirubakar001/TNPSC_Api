export default function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="flex h-60 flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-green-500"></div>
            <p className="mt-3 text-gray-500">{message}</p>
        </div>
    );
}
