import React from 'react'
import Footer from './Footer';
import Header from './Header';
import { HelmetProvider } from 'react-helmet-async'
// import { HelmetProvider } from 'react-helmet-async'; // ✅ THIS IS MISSING


const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <HelmetProvider>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>My Title</title>
            </HelmetProvider>

            <Header />
            <main style={{ minHeight: "70vh" }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
