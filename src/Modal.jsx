export default function Modal({children}) {
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          padding: 20,
          minWidth: 180,
          border: "1px solid #666",
          backgroundColor: "#fff",
          borderRadius: 8,
          zIndex: 10000,
        }}
      >
        <div>
         {children}
        </div>
      </div>
    </div>
  );
}
