/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useDark } from "@vueuse/core";
import Editor from "simple-code-editor";
import hljs from "highlight.js";
const global = defineModel();
const isDark = useDark();
const highlightCode = (global) => hljs.highlightAuto(global).value;
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {};
const __VLS_modelEmit = defineEmits < __VLS_ModelEmit > ();
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
const __VLS_0 = {}.Editor;
/** @type {[typeof __VLS_components.Editor, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.global),
    highlight: (__VLS_ctx.highlightCode),
    theme: (__VLS_ctx.isDark ? 'a11y-dark' : 'a11y-light'),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.global),
    highlight: (__VLS_ctx.highlightCode),
    theme: (__VLS_ctx.isDark ? 'a11y-dark' : 'a11y-light'),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
() => ({
    'onUpdate:modelValue': (...[$event]) => (__VLS_ctx.global = $event)
});
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Editor: Editor,
            global: global,
            isDark: isDark,
            highlightCode: highlightCode,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
