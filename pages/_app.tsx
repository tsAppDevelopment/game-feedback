import type {AppProps} from 'next/app'
import {Providers} from '../components/providers'
import {domain, title, description} from '../const'
import {DefaultSeo} from 'next-seo'
import {WithClientAuth} from '../hooks/with_client_auth'
import Head from 'next/head'
import '../styles/global_styles.css'
import {WithTopNav} from '../hooks/with_top_nav'

interface PageProps {
  Component: {
    auth?: boolean
    topNav?: boolean
    title?: string
  }
}

export default function App({Component, pageProps}: AppProps & PageProps) {
  return (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />

      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: `https://${domain}`,
          site_name: title,
          title,
          description,
          images: [
            {
              url: `https://${domain}/og-1200-630.png`,
              height: 630,
              width: 1200,
              alt: `${domain} logo`,
            },
          ],
        }}
      />

      <Head>
        {/* When the page component is exported, check its props for things like title and auth */}
        <title>{Component.title ? Component.title : title}</title>
      </Head>

      <Providers pageProps={pageProps}>
        <WithClientAuth hasAuth={Component.auth}>
          <WithTopNav hasNav={Component.topNav}>
            <Component {...pageProps} />
          </WithTopNav>
        </WithClientAuth>
      </Providers>
    </>
  )
}