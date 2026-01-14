import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: "220px", padding: "20px", marginTop: "60px" }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
