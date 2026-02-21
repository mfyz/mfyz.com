import satori from "satori";
import path from "path";
import fs from "fs";

const EMOJI_CDN =
  "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/img/apple/64";

const graphemeImages = {
  "🪄": `${EMOJI_CDN}/1fa84.png`,
  "❤️": `${EMOJI_CDN}/2764-fe0f.png`,
  "🚀": `${EMOJI_CDN}/1f680.png`,
  "🤔": `${EMOJI_CDN}/1f914.png`,
  "⭐": `${EMOJI_CDN}/2b50.png`,
  "✅": `${EMOJI_CDN}/2705.png`,
  "⏰": `${EMOJI_CDN}/23f0.png`,
  "⏳": `${EMOJI_CDN}/23f3.png`,
  "👍": `${EMOJI_CDN}/1f44d.png`,
  "👎": `${EMOJI_CDN}/1f44e.png`,
  "👌": `${EMOJI_CDN}/1f44c.png`,
};

const emojiPattern = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
const supported = new Set(Object.keys(graphemeImages));

function stripUnsupportedEmoji(text) {
  return text.replace(emojiPattern, m => (supported.has(m) ? m : "")).trim();
}

export default async post => {
  const robotoFontPath = path.resolve("./public/fonts/roboto-bold.ttf");
  const robotoFontBuffer = fs.readFileSync(robotoFontPath);

  // Get the background image as base64
  const bgImagePath = path.resolve("./public/images/og_bg.png");
  const bgImageBuffer = fs.readFileSync(bgImagePath);

  // Create the structure using vanilla JS objects instead of JSX
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `url('data:image/png;base64,${bgImageBuffer.toString("base64")}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        },
        children: [
          {
            type: "p",
            props: {
              style: {
                fontSize: 82,
                fontWeight: "bold",
                color: "#222222",
                textAlign: "center",
                maxWidth: "85%",
                maxHeight: "100%",
                overflow: "hidden",
                fontFamily: "Roboto",
                textShadow: "1px 3px 6px rgba(0,0,0,0.2)",
              },
              children: stripUnsupportedEmoji(post.data.title),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      graphemeImages,
      fonts: [
        {
          name: "Roboto",
          data: robotoFontBuffer,
          style: "bold",
        },
      ],
    }
  );

  return svg;
};
