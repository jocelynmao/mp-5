"use server";
import getCollection, {URLS_COLLECTION} from "@/db";
import getUrlByAlias from "./getUrlByAlias";
import {UrlRecord} from "@/types";

export default async function createShortUrl(
    url: string,
    alias: string,
): Promise<UrlRecord> {
    console.log("creating new short URL");

    if (!url || !alias) {
        throw new Error ("URL and alias are required");
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

    const existing = await getUrlByAlias(alias);
    if (existing) {
        throw new Error ("Invalid alias: This alias already exists");
    }

    const newShortUrl = {
        alias,
        url,
    };

    const urlsCollection = await getCollection(URLS_COLLECTION);

    const res = await urlsCollection.insertOne({...newShortUrl});

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return {...newShortUrl, id: res.insertedId.toHexString()};
}