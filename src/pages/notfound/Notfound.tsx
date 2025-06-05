import { Link } from "react-router-dom";
import "./Notfound.css";

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-content">
      <div className="not-found-icon">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="60" fill="#E6F7FC" />
          <path d="M40 65V55L50 40H60V55H55L45 55V65H40Z" fill="#03AEEE" />
          <path d="M65 65V55L75 40H85V65H80V45L70 60V65H65Z" fill="#03AEEE" />
          <path d="M40 70V80H80V70H40Z" fill="#03AEEE" />
        </svg>
      </div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="button button--primary return-home-btn">
        Return to Home
      </Link>
    </div>
  </div>
);

export default NotFound;