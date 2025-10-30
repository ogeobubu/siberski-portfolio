import '../src/app.scss';
import '../src/components/cursor/cursor.scss';
import '../src/components/navbar/navbar.scss';
import '../src/components/hero/hero.scss';
import '../src/components/parallax/parallax.scss';
import '../src/components/services/services.scss';
import '../src/components/portfolio/portfolio.scss';
import '../src/components/about/about.scss';
import '../src/components/contact/contact.scss';
import '../src/components/books/books.scss';
import '../src/components/blog/blog.scss';
import '../src/components/sidebar/sidebar.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}