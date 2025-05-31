import React from "react";

export function SolidColorBackground({ color = "#000" }) {
  return (
    <div style={{ width: "100%", height: "100%", background: color }}>
      {/* Background content */}
    </div>
  );
}
