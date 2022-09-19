import { openBlock as s, createElementBlock as r } from "vue";
const a = (t, n) => {
  const o = t.__vccOpts || t;
  for (const [e, c] of n)
    o[e] = c;
  return o;
}, i = {
  name: "g-button",
  components: {},
  mixins: [],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {}
}, m = { class: "g-button" };
function p(t, n, o, e, c, _) {
  return s(), r("div", m, " g-button ");
}
const d = /* @__PURE__ */ a(i, [["render", p]]), u = {
  name: "g-icon",
  components: {},
  mixins: [],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {}
}, l = { class: "g-icon" };
function f(t, n, o, e, c, _) {
  return s(), r("div", l, " g-icon ");
}
const $ = /* @__PURE__ */ a(u, [["render", f]]), g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: d,
  Icon: $
}, Symbol.toStringTag, { value: "Module" })), b = {
  install: (t) => {
    Object.entries({ ...g }).map(([, n]) => t.copmponet(n.name, n));
  }
};
export {
  d as Button,
  $ as Icon,
  b as default
};
