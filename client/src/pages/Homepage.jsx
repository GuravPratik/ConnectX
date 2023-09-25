import MainContent from "../components/MainContent";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

function Homepage() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <MainContent />
        <RightSidebar />
      </div>
    </>
  );
}

export default Homepage;
