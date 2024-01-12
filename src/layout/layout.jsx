import Nav from "../components/Nav/Nav";
import Spinner from "../components/Spinner/Spinner";
import { Helmet } from "react-helmet-async";
import "./layout.css"

const Layout = ({ children, title, loading }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || "Home"} | Shringar </title>
        <meta
          name="description"
          content="E-commerce store built with React, Node, Express and Postgres"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href="" />
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
      </Helmet>
      <div className="layout-container">
        <header className="header">
          <Nav />
        </header>
        {loading ? (
          <div className="spinner-container">
            <Spinner size={100} loading />
          </div>
        ) : (
          <div className="main-content">
            <main>{children}</main>
          </div>
        )}
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Shringar —
            <a
              href="https://github.com/ajay28"
              className=""
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
