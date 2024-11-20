import { Outlet } from 'react-router-dom';

function LayoutWithoutTopbar() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Child Components */}
      <Outlet />
    </div>
  );
}

export default LayoutWithoutTopbar;
