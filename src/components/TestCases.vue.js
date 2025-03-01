/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useDark } from '@vueuse/core';
const isDark = useDark();
const cases = defineModel('cases', {
    required: true,
    type: Array,
});
const emit = defineEmits(['remove', 'add']);
function getIndexCase(id) {
    return cases.value.findIndex((testCase) => testCase.id === id) + 1;
}
const loadingCases = inject('loadingCases');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {};
const __VLS_modelEmit = defineEmits < __VLS_ModelEmit > ();
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-test-cases" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('add');
        } },
    disabled: (__VLS_ctx.cases.length === 10 || __VLS_ctx.loadingCases),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "test-cases" },
});
__VLS_asFunctionalDirective(__VLS_directives.vAutoAnimate)(null, { ...__VLS_directiveBindingRestFields, }, null, null);
if (__VLS_ctx.cases.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
for (const [testCase] of __VLS_getVForSourceType((__VLS_ctx.cases))) {
    const __VLS_0 = {}.Case;
    /** @type {[typeof __VLS_components.Case, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onRemove': {} },
        key: (testCase.id),
        id: (__VLS_ctx.getIndexCase(testCase.id)),
        code: (testCase.code),
        ops: (testCase.ops),
        lineNums: (true),
        wrap: (true),
        theme: (__VLS_ctx.isDark ? 'a11y-dark' : 'a11y-light'),
        code: (testCase.code),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onRemove': {} },
        key: (testCase.id),
        id: (__VLS_ctx.getIndexCase(testCase.id)),
        code: (testCase.code),
        ops: (testCase.ops),
        lineNums: (true),
        wrap: (true),
        theme: (__VLS_ctx.isDark ? 'a11y-dark' : 'a11y-light'),
        code: (testCase.code),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    () => ({
        'onUpdate:code': (...[$event]) => (testCase.code = $event)
    });
    () => ({
        onRemove: (...[$event]) => {
            __VLS_ctx.emit('remove', testCase.id);
        }
    });
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['header-test-cases']} */ ;
/** @type {__VLS_StyleScopedClasses['test-cases']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $emit: emit,
            isDark: isDark,
            cases: cases,
            emit: emit,
            getIndexCase: getIndexCase,
            loadingCases: loadingCases,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $emit: emit,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
