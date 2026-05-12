import Spinner from "react-bootstrap/Spinner";

export default function FullScreenLoader({ show, text = "Đang xử lý..." }) {
  if (!show) return null;

  return (
    <div className="fullscreen-loader">
      <div className="loader-box">
        <Spinner animation="border" />
        <div className="mt-3">{text}</div>
      </div>
    </div>
  );
}
