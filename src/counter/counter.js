import xs from "xstream";
import { div, span, button } from "@cycle/dom";

function Counter(sources) {
  const increment$ = sources.DOM.select(".increment")
    .events("click")
    .mapTo(+1); // On every click on the .increment
  // button emit a 1

  const decrement$ = sources.DOM.select(".decrement")
    .events("click")
    .mapTo(-1); // Same but with -1

  const state$ = xs
    .merge(increment$, decrement$)
    .fold((last, curr) => last + curr, 0); // Starting with 0, add up all
  // numbers on the stream

  const view$ = state$.map(count =>
    div([span(["Count: " + count]), button(".increment"), button(".decrement")])
  );

  return {
    DOM: view$
  };
}

export default Counter;
