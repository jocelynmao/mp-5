"use server";

import getCollection, {URLS_COLLECTION} from "@/db";
import {UrlRecord} from "@/types";

export default async function createShortUrl(
    url: string,
    alias: string,
): Promise<UrlRecord> {
    console.log("creating new short URL");

    if (!url || !alias) {
        throw new Error("URL and alias are required");
    }

    try {
        new URL(url);
    } catch {
        throw new Error("Invalid URL");
    }

    // disallow none-UTF-16 characters
    if (encodeURIComponent(alias) !== alias) {
        throw new Error("Invalid alias: You may only use valid URL characters");
    }

    const urlsCollection = await getCollection(URLS_COLLECTION);

    const existing = await urlsCollection.findOne({alias});
    if (existing) {
        throw new Error("Invalid alias: This alias already exists");
    }

    const record = {
        url,
        alias,
    };

    const res = await urlsCollection.insertOne(record);

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    const base = "https://cs391-url-shortener.vercel.app/";

    return {
        id: res.insertedId.toHexString(),
        url,
        alias,
        fullUrl: `${base}${alias}`,
    };
}