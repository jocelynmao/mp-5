import getUrlByAlias from "@/lib/getUrlByAlias";
import {redirect} from "next/navigation";

export default async function AliasRedirectPage({
                                                    params,
                                                }: {params: {alias: string};
}){
    const {alias} = params;

    let urlRecord=null;

    try {
        urlRecord = await getUrlByAlias(alias);
    } catch (err) {
        console.log("This error occured", err);
        redirect("/");
    }

    if (!urlRecord) {
        redirect("/");
    } else {
        redirect(urlRecord.url);
    }
}