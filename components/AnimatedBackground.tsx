const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617] overflow-hidden">
      {/* subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)]" />
    </div>
  );
};

export default AnimatedBackground;
