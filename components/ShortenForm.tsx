"use client";

import {useState} from "react";
import createShortUrl from "@/lib/createShortUrl";
import {Button, FormHelperText, TextField} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function ShortenForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortened, setShortened] = useState("");
    const [error, setError] = useState("");

    const handleCopy = () => {
        if (shortened) {
            navigator.clipboard.writeText(shortened);
        }
    };

    return (
        <form
            className="rounded-xl p-4 bg-pink-400"
            onSubmit={async (event) => {
                event.preventDefault();
                setError("");

                try {
                    const result = await createShortUrl(url, alias);
                    setShortened(result.fullUrl);
                    setUrl("");
                    setAlias("");
                } catch (err: any) {
                    console.error(err);
                    setError(err.message || "Something went wrong");
                }
            }}
        >
        <TextField
            variant="filled"
            sx={{backgroundColor: "white", width: "100%"}}
            label="https://example.com/very/long/url"
            //placeholder="https://example.com/very/long/url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
            sx={{
                padding: "0.5rem",
                height: "100%",
                width: "100%",
                borderRadius: 0,
            }}
            label="your-custom-alias"
            variant="filled"
            //placeholder="your-custom-alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
        />
        <div className="w-full flex justify-center">
            <Button
                sx={{width: "auto"}}
                variant="contained"
                type="submit"
                disabled={url === "" || alias === ""}
            >
                Shorten
            </Button>
        </div>
            {shortened && (
                <div className="mt-4 p-3 bg-green-100 rounded flex items-center justify-between">
                    <div>
                        <p className="text-base text-gray-900">Your Shortened URL:</p>
                        <p className="text-base font-semibold text-gray-900">{shortened}</p>
                    </div>
                    <Button onClick={handleCopy} color="primary">
                        Copy
                    </Button>
                </div>
            )}
        </form>
    );
}