import getUrlByAlias from "@/lib/getUrlByAlias";
import {redirect} from "next/navigation";

export default async function AliasRedirectPage({
                                                    params,
                                                }: {params: Promise<{alias: string}>;}) {
    const {alias} = await params;

    console.log("alias", alias);

    const url = await getUrlByAlias(alias);

    if (url) {
        redirect(url.url);
    }
    redirect("/");
}