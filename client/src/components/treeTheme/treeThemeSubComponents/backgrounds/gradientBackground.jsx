// This is a server component to enable SEO and SSR
// You can register this in your `backgroundRegistry`

type GradientBackgroundProps = {
  colorStart?: string;
  colorEnd?: string;
  direction?: 'to right' | 'to left' | 'to top' | 'to bottom';
  blur?: number;
};

export const GradientBackground = ({
  colorStart = '#6EE7B7',         // default greenish gradient start
  colorEnd = '#3B82F6',           // default blue gradient end
  direction = 'to right',         // gradient flow direction
  blur = 0                        // optional backdrop blur
}: GradientBackgroundProps) => {
  // Map text direction to Tailwind gradient direction classes
  const directionMap: Record<string, string> = {
    'to right': 'bg-gradient-to-r',
    'to left': 'bg-gradient-to-l',
    'to top': 'bg-gradient-to-t',
    'to bottom': 'bg-gradient-to-b'
  };

  const directionClass = directionMap[direction] || 'bg-gradient-to-r';

  return (
    <div
      className={`absolute inset-0 -z-10 ${directionClass}`}
      style={{
        backgroundImage: `linear-gradient(${direction}, ${colorStart}, ${colorEnd})`,
        filter: blur ? `blur(${blur}px)` : undefined
      }}
    />
  );
};
