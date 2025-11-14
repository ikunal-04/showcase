"use server"
import { createClient } from "@/lib/db/server";
import type { Portfolio } from "@/types/portfolios";

export const getPortfolio = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase
    .from("portfolios")
    .select("*")

    if(error) {
        throw new Error("Error fetching portfolios.")
    }

    return data;
}

export const uploadPortfolio = async ({name, url, screenshotUrl, twitter, linkedin}: Portfolio) => {
    const supabase = await createClient();

    const { error } = await supabase
    .from("portfolios")
    .insert({
        name,
        url,
        screenshotUrl,
        twitter,
        linkedin
    })

    if(error) {
        throw new Error("Error uploading portfolio.")
    }

    return { success: true };
}