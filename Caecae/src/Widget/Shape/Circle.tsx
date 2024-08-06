interface CircleProps {
  color: string;
  radius: number;
}

const Circle = ({ radius, color }: CircleProps) => {
  const circleStyle = {
    width: `${radius}px`,
    height: `${radius}px`,
    backgroundColor: `#${color}`,
  };

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full" style={circleStyle}></div>
    </div>
  );
};

export default Circle;
