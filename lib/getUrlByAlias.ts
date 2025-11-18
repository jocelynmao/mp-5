import getCollection, {URLS_COLLECTION} from "@/db";
import {UrlRecord} from "@/types";

export default async function getUrlByAlias(alias: string): Promise<UrlRecord | null> {

    const urlsCollection = await getCollection(URLS_COLLECTION);
    const data = await urlsCollection.findOne({ alias });

    if (!data) {
        return null;
    }

    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    return {
        id: data._id.toHexString(),
        url: data.url,
        alias: data.alias,
        fullUrl: `${base}/${alias}`,
    };
}