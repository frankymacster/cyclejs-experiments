import { div, span, input } from "@cycle/dom";

const LabeledSlider = sources => {
  const props$ = sources.props;

  // intent
  const newValue$ = sources.DOM.select(".slider")
    .events("input")
    .map(ev => ev.target.value);

  // model
  const state$ = props$
    .map(p =>
      newValue$
        .map(val => ({
          label: p.label,
          unit: p.unit,
          min: p.min,
          value: val,
          max: p.max
        }))
        .startWith(p)
    )
    .flatten()
    .remember();

  // view
  return {
    DOM: state$.map(p =>
      div(".labeled-slider", [
        span(".label", `${p.label} ${p.value}${p.unit}`),
        input(".slider", {
          attrs: {
            type: "range",
            min: p.min,
            max: p.max,
            value: p.value
          }
        })
      ])
    ),
    value: state$.map(p => p.value)
  };
};

export default LabeledSlider;
