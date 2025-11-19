import HomeDisplay from "@/components/HomeDisplay";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-4xl font-semibold p-4">URL Shortener</h2>
            <p className="text-base text-gray-900">
                Shorten your long URLs into compact, shareable links
            </p>
                <HomeDisplay />
            </div>
    );
}
