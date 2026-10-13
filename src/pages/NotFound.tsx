import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="detail">
      <div className="empty">
        <h4>Page not found</h4>
        <p>The page you asked for does not exist.</p>
        <Link className="btn primary" to="/">
          Go to the map
        </Link>
      </div>
    </div>
  );
}
