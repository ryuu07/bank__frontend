import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token'); // Check for token in sessionStorage
  return token ? children : <Navigate to="/login" replace />;
};

// Add PropTypes validation for the 'children' prop
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // Ensures 'children' is required and can be any renderable content
  };

export default ProtectedRoute;