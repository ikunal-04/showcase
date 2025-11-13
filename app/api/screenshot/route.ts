import { NextRequest, NextResponse } from "next/server";

const token = process.env.SCREENSHOT_API_KEY;

const output = "image"

const file_type = "png";

export async function POST(req: NextRequest) {
    const { url } = await req.json();

    console.log("what the urls", url)

    if(!url) {
        return NextResponse.json({status: 400, message: "No url found"})
    }

    const finalUrl = encodeURIComponent(url);
    console.log(finalUrl)

    const response = await fetch(
        `https://shot.screenshotapi.net/v3/screenshot?token=${token}&url=${finalUrl}&output=${output}&file_type=${file_type}&enable_caching=true`,{
            method: "GET",
            redirect: "follow"
        }
    )

    return NextResponse.json({ status: 200, message: {
        response: JSON.stringify(response.url)
    }})
}