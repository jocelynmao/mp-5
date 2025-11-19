"use client";

import {useEffect, useState} from "react";
import createShortUrl from "@/lib/createShortUrl";
import {Button, FormHelperText, TextField} from "@mui/material";

export default function HomeDisplay() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortened, setShortened] = useState("");
    const [error, setError] = useState("");
    const [domain, setDomain] = useState("");

    useEffect(() => {
        setDomain(window.location.origin);
    }, []);

    const handleCopy = () => {
        if (shortened) {
            navigator.clipboard.writeText(shortened);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto mt-12 p-6 bg-pink-50 rounded-2xl shadow-xl border border-pink-200">
            <header className="mb-6">
                <h1 className="text-3xl font-extrabold text-pink-700 mb-2">Shorten a URL</h1>
                <p className="text-pink-700 text-sm mb-4">Enter a long URL to create a shareable link</p>
            </header>

        <div className="w-full max-w-3xl">
        <form
            className="space-y-5"
            onSubmit={async (event) => {
                event.preventDefault();
                setError("");
                setShortened("");

                try {
                    const result = await createShortUrl(url, alias);
                    setShortened(`${domain}/${result.alias}`);
                    setUrl("");
                    setAlias("");
                } catch (err: any) {
                    console.error(err);
                    setError(err.message);
                }
            }}
        >
            <div>
                <label className="block text-pink-700 font-semibold mb-1">
                    URL
                </label>
            </div>

            <TextField
                variant="filled"
                sx={{backgroundColor: "white", width: "100%"}}
                label="https://example.com/very/long/url"
                //placeholder="https://example.com/very/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <div>
                <label className="block text-pink-700 font-semibold mb-1">Custom Alias</label>
                <div className="flex items-center gap-2">
                    <span className="text-pink-700">{domain}/</span>
                    <TextField
                        variant="filled"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        placeholder="your-custom-alias"
                        fullWidth
                        sx={{
                            backgroundColor: "white",
                            "& .MuiFilledInput-root": { borderRadius: "0.5rem" },
                        }}
                    />
                </div>
            </div>

            <div className="w-full flex justify-center">
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={url === "" || alias === ""}

                    sx={{
                    backgroundColor: "#ec4899",
                    "&:hover": { backgroundColor: "#f472b6" },
                    color: "white",
                    fontWeight: "bold",
                    py: 1.5,
                    mt: 4,
                    }}
                >
                    Shorten
                </Button>
            </div>
            {shortened && (
                <div className="mt-6 p-3 bg-pink-100 rounded flex items-center justify-between border border-pink-200">
                    <div>
                        <p className="text-sm font-medium text-pink-600">Your Shortened URL:</p>
                        <a
                            href={shortened}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-700 font-bold hover:underline"
                        >
                        {shortened}
                        </a>
                    </div>
                    <Button onClick={handleCopy} color="primary">
                        Copy
                    </Button>
                </div>
            )}
        </form>
        </div>
        </div>
    );
}