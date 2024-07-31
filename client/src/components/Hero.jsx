import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Hero() {
    const isAuthenticated = useSelector(
        (state) => state.userSlice.authenticated
    );

    return (
        <div className="bg-white">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-16">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Welcome to Whisper Wave
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Connect with friends and family like never before.
                            Whisper Wave offers a seamless, secure, and
                            intuitive chatting experience. Dive into meaningful
                            conversations, share moments, and stay connected
                            effortlessly.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to={isAuthenticated ? "/rooms" : "/login"}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
