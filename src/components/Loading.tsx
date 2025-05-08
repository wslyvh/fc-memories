interface Props {
  className?: string;
}

export function Loading(props: Props) {
  const className = props.className ?? "flex justify-center items-center";

  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        width="32"
        height="32"
        className="block"
      >
        <circle
          fill="none"
          stroke="#8660cc"
          strokeOpacity="1"
          strokeWidth="1"
          cx="20"
          cy="20"
          r="0"
        >
          <animate
            attributeName="r"
            calcMode="spline"
            dur="1.2s"
            values="2;16"
            keyTimes="0;1"
            keySplines="0 .2 .5 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            calcMode="spline"
            dur="1.2s"
            values="2;6"
            keyTimes="0;1"
            keySplines="0 .2 .5 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            calcMode="spline"
            dur="1.2s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0 .2 .5 1"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
