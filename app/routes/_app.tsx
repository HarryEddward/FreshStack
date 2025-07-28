import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>app</title>
        <link rel="stylesheet" href="/styles.css" />
        <meta name="robots" content="noai, noimageai"/>
        <link href="https://fonts.googleapis.com/css2?family=Fleur+De+Leah&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet"></link>
        <script src="/js/qrcode.min.js"></script>
      </head>
      <body className="bg-white">
        <Component />
      </body>
    </html>
  );
}
