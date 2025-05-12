import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Error</h1>
      <p>Page not found</p>
      <Link to="/">Back to main page</Link>
    </div>
  );
};

export default NotFound;
