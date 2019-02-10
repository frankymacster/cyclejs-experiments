import { div } from "@cycle/dom";

const Disc = state$ => {
  return {
    DOM: state$.map(s =>
      div({
        style: {
          backgroundColor: "#58D3D8",
          width: `${s}px`,
          height: `${s}px`,
          borderRadius: `${s * 0.5}px`
        }
      })
    )
  };
};

export default Disc;
