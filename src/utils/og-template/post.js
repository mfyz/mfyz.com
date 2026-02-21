import satori from "satori";
import path from "path";
import fs from "fs";

function safeText(text) {
  const emojiPattern = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  return text.replace(emojiPattern, "").trim();
}

export default async post => {
  const robotoFontPath = path.resolve("./public/fonts/roboto-bold.ttf");
  const robotoFontBuffer = fs.readFileSync(robotoFontPath);

  // Get the background image as base64
  const bgImagePath = path.resolve("./public/images/og_bg.png");
  const bgImageBuffer = fs.readFileSync(bgImagePath);
  const bgImageBase64 = `data:image/png;base64,${bgImageBuffer.toString("base64")}`;

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
              children: safeText(post.data.title),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
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
