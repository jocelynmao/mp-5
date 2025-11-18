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

    const base = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    const record: UrlRecord = {
        id: alias,
        url,
        alias,
        fullUrl: `${base}/${alias}`,
    };

    const res = await urlsCollection.insertOne(record);

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return record;
}