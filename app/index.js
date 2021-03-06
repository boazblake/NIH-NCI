import m from "mithril"
import { model } from "./Model.js"
import ClinicalTrials from "./ClinicalTrials.js"
import Layout from "./Layout.js"
import { animate } from "./utils"

const root = document.body

function getProfile(w) {
  if (w < 668) return "phone"
  if (w < 920) return "tablet"
  return "desktop"
}

let winW = window.innerWidth
model.state.profile = getProfile(winW)

function checkWidth() {
  const w = window.innerWidth
  if (winW !== w) {
    winW = w
    var lastProfile = model.state.profile
    model.state.profile = getProfile(w)
    if (lastProfile != model.state.profile) m.redraw()
  }
  requestAnimationFrame(checkWidth)
}

checkWidth()

m.mount(root, {
  view: () =>
    m(
      Layout,
      {
        mdl: model
      },
      m(ClinicalTrials, {
        oncreate: animate,
        mdl: model
      })
    )
})
