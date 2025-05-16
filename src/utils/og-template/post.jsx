import satori from "satori";
import path from "path";
import fs from "fs";
import { getBackgroundColor } from "@utils/get-background-color";

function safeText(text) {
  const emojiPattern = /[^\x00-\x7F]+/gu;
  return text.replace(emojiPattern, '').trim();
}

export default async (post) => {
  const robotoFontPath = path.resolve("./public/fonts/roboto.ttf");
  const robotoFontBuffer = fs.readFileSync(robotoFontPath);

  const backgroundColor = getBackgroundColor(post.slug);

  const svg = await satori(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          border: "4px solid #0c0a09",
          background: backgroundColor,
          opacity: "0.9",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          margin: "2.5rem",
          width: "91%",
          height: "80%",
        }}
      />

      <div
        style={{
          border: "4px solid #0c0a09",
          background: "#f5f5f4",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          width: "91%",
          height: "80%",
          padding: "20px",
          // backgroundImage: `url("data:image/svg+xml;base64,${Buffer.from(EMOJI_SVG).toString('base64')}")`,
          // backgroundPosition: "100px 100px",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "120px 120px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "20px",
            width: "90%",
            height: "90%",
          }}
        >
          <p
            style={{
              fontSize: 84,
              fontWeight: "bold",
              maxHeight: "100%",
              overflow: "hidden",
              fontFamily: "Roboto",
            }}
          >
            {safeText(post.data.title)}
          </p>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Roboto",
              width: "100%",
              marginBottom: "8px",
              fontSize: 28,
            }}
          >
            <span>
              by{" "}
              <span
                style={{
                  color: "transparent",
                }}
              >
                "
              </span>
              <span style={{ overflow: "hidden", fontWeight: "bold" }}>
                Felix Yildiz
              </span>
            </span>
          </div> */}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: [
        {
          name: "Roboto",
          data: robotoFontBuffer,
          style: "normal",
        },
      ],
    }
  );

  return svg;
};
