import React from 'react'

const BlurCircle = ({children}) => {
  return (
    <div className="h-auto w-full bg-[#030303] relative">
      {/* Emerald Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(244,63,94,0.35), transparent)`,
        }}
      />
      {/* Your Content/Components */}
      {children}
    </div>
  );
}

export default BlurCircle