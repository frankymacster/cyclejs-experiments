import xs from "xstream";
import { div } from "@cycle/dom";
import Disc from "./disc.js";
import LabeledSlider from "./labeled-slider.js";

const ValueCalc = sources => {
  const initState$ = xs.of({
    angle: "Radius",
    unit: "",
    min: 20,
    value: 50,
    max: 80
  });

  const labeledSliderSources = { DOM: sources.DOM, props: initState$ };
  const labeledSlider$ = LabeledSlider(labeledSliderSources);
  const labeledSliderVDom$ = labeledSlider$.DOM;
  // child -value-> parent
  const labeledSliderValue$ = labeledSlider$.value;

  // parent -value-> child
  const disc = Disc(labeledSliderValue$);
  const discVDom$ = disc.DOM;

  return {
    DOM: xs
      .combine(labeledSliderValue$, labeledSliderVDom$, discVDom$)
      .map(([labeledSliderValue, labeledSliderVDom, discVDom]) =>
        div([labeledSliderVDom, discVDom])
      )
  };
};

export default ValueCalc;
