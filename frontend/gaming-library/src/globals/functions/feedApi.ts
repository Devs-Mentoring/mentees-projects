import axios from "axios";

export type ParsedFeedType = {
    link: string | undefined;
    title: string | undefined;
    author: string | undefined;
    pubDate: string | undefined;
    description: string | undefined;
    img: string | null | undefined;
}

export async function getRssFeed(url: string) {
    return await axios({
        method: 'get',
        url: url,
        withCredentials: false,
        headers: {
            "Content-Type": 'text/plain',
        }
    }).then((res) => {
        const feed = new window.DOMParser().parseFromString(res.data, "text/xml");
        const items = feed.querySelectorAll("item");
        const linkNext = feed.querySelector("link[rel='next']");
        const nextUrl = linkNext ? linkNext.getAttribute('href') : linkNext;

        const feedItems = [...items as unknown as Element[]].map((el) => ({
            link: el.querySelector("link")?.innerHTML,
            title: el.querySelector("title")?.innerHTML,
            author: el.querySelector("creator")?.innerHTML,
            pubDate: el.querySelector("pubDate")?.innerHTML,
            description: el.querySelector("description")?.innerHTML,
            img: el.querySelector("content")?.getAttribute('url'),
        }));

        return {feedItems, nextUrl};
    })
}