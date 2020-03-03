import m from "mithril"
import Button from "../components/Button.js"
console.log(Icons)
const Paginate = {
  view: ({ attrs: { state, http, paginateFn, limit, mdl } }) =>
    m(".pagination", [
      m(Button, {
        action: () => {
          state.from = state.from - mdl.state.limit
          state.size = mdl.state.limit
          paginateFn(http)
        },
        isDisabled: state.from - mdl.state.limit <= 0,
        label: [m(Icons.ArrowLeft, { height: "15px" }), limit]
      }),
      m(Button, {
        action: () => {
          state.from = state.from + state.data.length++
          state.size = mdl.state.limit
          paginateFn(http)
        },
        label: [limit, m(Icons.ArrowRight, { height: "15px" })],
        isDisabled: state.from + mdl.state.limit > state.total
      }),
      m(
        ".",
        m("code.code", `${state.from} - ${state.from + state.size} `),
        m("code.code.row", ` of ${state.total} `)
      )
    ])
}

export default Paginate
