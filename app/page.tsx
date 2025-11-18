import ShortenForm from "@/components/ShortenForm";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-4xl font-semibold p-4">URL Shortener</h2>
            <p className="text-base text-gray-900">
                Shorten your long URLs into compact, shareable links
            </p>

            <div className="flex flex-col items-center">
                <h3 className="text-4xl font-semibold text-gray-900">Shorten a URL</h3>
                <p className="text-base text-gray-900">
                    Enter a long URL to create a shorter, shareable link
                </p>
                <ShortenForm />
            </div>
        </div>
    );
}
