import * as React from 'react';
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { ColorModeScript } from '@chakra-ui/core';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Open+Sans:wght@300;400;600;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript defaultColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
