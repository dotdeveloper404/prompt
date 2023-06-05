import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

const metadata = {
  title: "Promptopia",
  description: "Discover & share AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            {/* Navigation bar */}
            <Nav />

            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
