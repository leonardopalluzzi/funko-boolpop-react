export default function Loader() {
  return (
    <div
      className="w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
