/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import Editor from 'simple-code-editor';
import hljs from 'highlight.js';
const props = defineProps({
    id: Number,
    code: String,
    ops: {
        required: false,
        type: String,
        default: '0 ops/s',
    },
    theme: String,
});
const code = defineModel('code', {
    required: true,
    type: String,
});
const emit = defineEmits(['remove']);
const loadingCases = inject('loadingCases');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {};
const __VLS_modelEmit = defineEmits < __VLS_ModelEmit > ();
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({
    ...{ class: "test-case" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "ops test-id" },
});
(__VLS_ctx.id);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ops-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "ops" },
});
(__VLS_ctx.ops);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('remove', __VLS_ctx.id);
        } },
    ...{ class: "remove" },
    disabled: (__VLS_ctx.loadingCases),
});
const __VLS_0 = {}.Editor;
/** @type {[typeof __VLS_components.Editor, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "code" },
    modelValue: (__VLS_ctx.code),
    highlight: (__VLS_ctx.hljs.highlightAuto),
    width: "100%",
    theme: (__VLS_ctx.theme),
}));
const __VLS_2 = __VLS_1({
    ...{ class: "code" },
    modelValue: (__VLS_ctx.code),
    highlight: (__VLS_ctx.hljs.highlightAuto),
    width: "100%",
    theme: (__VLS_ctx.theme),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
() => ({
    'onUpdate:modelValue': (...[$event]) => (__VLS_ctx.code = $event)
});
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['test-case']} */ ;
/** @type {__VLS_StyleScopedClasses['ops']} */ ;
/** @type {__VLS_StyleScopedClasses['test-id']} */ ;
/** @type {__VLS_StyleScopedClasses['ops-container']} */ ;
/** @type {__VLS_StyleScopedClasses['ops']} */ ;
/** @type {__VLS_StyleScopedClasses['remove']} */ ;
/** @type {__VLS_StyleScopedClasses['code']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
            Editor: Editor,
            hljs: hljs,
            code: code,
            emit: emit,
            loadingCases: loadingCases,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
