type Transform = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
};

export const applyTransform = (
  transform: Transform | null,
): { transform?: string } => {
  if (!transform) return {};

  const { scaleX, scaleY, x: originX, y: originY } = transform;

  const x = originX ? Math.round(originX) : 0;
  const y = originY ? Math.round(originY) : 0;

  return {
    transform: `translate3d(${x}px, ${y}px) scaleX(${scaleX}) scaleY(${scaleY})`,
  };
};
