import Nav from "../components/Nav/Nav";
import Spinner from "../components/Spinner/Spinner";
import { Helmet } from "react-helmet-async";
// import "../layout/layout.css"

const Layout = ({ children, title, loading }) => {
  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>{title || "Home"} | PERN Store </title>
        <meta
          name="description"
          content="E-commerce store built with React, Node, Express and Postgres"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href="https://pern-store.netlify.app/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Shringar" />
        <meta
          property="og:description"
          content="Shringar built with React, Node, Express and Postgres"
        />
      
        <meta property="og:site_name" content="Shringar" />
        <meta property="og:image" content="android-chrome-512x512.png" />
        <meta property="og:image:secure_url" content="android-chrome-512x512.png" />
        <meta
          name="twitter:description"
          content=" Shringar built with React, Node, Express and Postgres"
        />
        <meta name="twitter:title" content="Shringar" />
        <meta name="twitter:image" content="android-chrome-512x512.png" />
        <style type="text/css">{`
        html,body{
          height: 100%;
        }
    `}</style>
      </Helmet> */}
      <div className="min-h-screen flex flex-col">
        <Nav />
        {loading ? (
          <>
            <Spinner size={100} loading />
          </>
        ) : (
          <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full">
            <main className="h-full">{children}</main>
          </div>
        )}

        <footer className="mt-auto flex justify-center py-2">
          <p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
            &copy; {new Date().getFullYear()} Shringar —
            <a
              href="https://github.com/ajay28"
              className="text-gray-500 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Shringar
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
