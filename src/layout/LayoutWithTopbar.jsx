import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

function LayoutWithTopbar() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <NavBar/>
      {/* Main Content */}
      <main className="flex-grow p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutWithTopbar;
