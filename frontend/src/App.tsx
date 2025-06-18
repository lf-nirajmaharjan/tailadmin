import EmployeeTable from "./components/EmployeeTable";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Header />
          <main>
            <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
              <EmployeeTable />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
