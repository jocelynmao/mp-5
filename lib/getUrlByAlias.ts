import getCollection, {URLS_COLLECTION} from "@/db";
import {UrlRecord} from "@/types";

export default async function getUrlByAlias(alias: string): Promise<UrlRecord | null> {

    const urlsCollection = await getCollection(URLS_COLLECTION);

    const data = await urlsCollection.findOne({ alias });

    if (!data) {
        return null;
    }

    return {
        id: data._id.toString(),
        alias: data.alias,
        url: data.url,
    };
}