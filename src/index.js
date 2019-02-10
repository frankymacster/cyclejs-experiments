import xs from "xstream";
import { run } from "@cycle/xstream-run";
import { h, div, makeDOMDriver } from "@cycle/dom";
import isolate from "@cycle/isolate";
import Counter from "./counter/counter";
import ValueCalc from "./valueCalc/value-calc";
import ColorPicker from "cycle-color-picker";
import SvgPanAndZoom from "cycle-svg-pan-and-zoom";

const colorPickerView = state =>
  div(".container", { style: { background: state.color } }, [state.vtree]);

function main(sources) {
  const counter1 = isolate(Counter, "counter1")(sources);
  const counter2 = isolate(Counter, "counter2")(sources);
  const valueCalc = ValueCalc(sources);
  const colorPicker = ColorPicker({
    DOM: sources.DOM,
    props$: xs.of({ color: "#C3209F" })
  });
  const svg = SvgPanAndZoom({
    DOM: sources.DOM,
    children$: xs.of([h("text", { attrs: { x: 100, y: 100 } }, "hello world")])
  });

  const view$ = xs
    .combine(
      counter1.DOM,
      counter2.DOM,
      colorPicker.DOM,
      colorPicker.color$,
      svg.DOM,
      valueCalc.DOM
    )
    .map(
      ([
        counter1DOM,
        counter2DOM,
        colorPickerDOM,
        colorPickerColor,
        svgDOM,
        valueCalcDOM
      ]) =>
        div([
          counter1DOM,
          counter2DOM,
          colorPickerView({ vtree: colorPickerDOM, color: colorPickerColor }),
          svgDOM,
          valueCalcDOM
        ])
    );

  return {
    DOM: view$
  };
}

run(main, {
  DOM: makeDOMDriver("#app")
});
