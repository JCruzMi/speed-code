/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
const props = defineProps({
    results: Array,
});
const bars = ref(new Array(props.results.length).fill({ height: 0 }));
const percentages = ref(new Array(props.results.length).fill('0%'));
const loading = ref(true);
const COLORS = [
    'green',
    'yellow',
    'orange',
    'red',
    'blue',
    'purple',
    'pink',
    'brown',
    'lime',
    'black',
];
watch(() => props.results, async (newResults) => {
    if (!newResults || newResults.length === 0) {
        bars.value = [{ height: 0 }, { height: 0 }, { height: 0 }, { height: 0 }];
    }
    else {
        const maxOps = Math.max(...newResults);
        const sortedIndices = newResults
            .map((value, index) => ({ value, index }))
            .sort((a, b) => b.value - a.value)
            .map((item) => item.index);
        bars.value = await newResults.map((result, index) => ({
            height: (result / maxOps) * 260,
            fill: COLORS[sortedIndices.indexOf(index)],
        }));
        percentages.value = newResults.map((result) => `${Math.round((result / maxOps) * 100)}%`);
    }
    loading.value = false;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "charts-container" },
});
if (!__VLS_ctx.loading && __VLS_ctx.results.length > 0) {
    for (const [bar, index] of __VLS_getVForSourceType((__VLS_ctx.bars))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "chart" },
            key: (index),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "bar" },
            ...{ style: ({
                    height: `${bar.height}px`,
                    background: bar.fill,
                }) },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vAutoAnimate)(null, { ...__VLS_directiveBindingRestFields, }, null, null);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "number" },
        });
        (index + 1);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "percentage" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vAutoAnimate)(null, { ...__VLS_directiveBindingRestFields, }, null, null);
        (__VLS_ctx.percentages[index]);
    }
}
else {
    for (const [index] of __VLS_getVForSourceType((4))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (index),
            ...{ class: "chart" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vAutoAnimate)(null, { ...__VLS_directiveBindingRestFields, }, null, null);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "bar" },
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "number" },
        });
    }
}
/** @type {__VLS_StyleScopedClasses['charts-container']} */ ;
/** @type {__VLS_StyleScopedClasses['chart']} */ ;
/** @type {__VLS_StyleScopedClasses['bar']} */ ;
/** @type {__VLS_StyleScopedClasses['number']} */ ;
/** @type {__VLS_StyleScopedClasses['percentage']} */ ;
/** @type {__VLS_StyleScopedClasses['chart']} */ ;
/** @type {__VLS_StyleScopedClasses['bar']} */ ;
/** @type {__VLS_StyleScopedClasses['number']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            bars: bars,
            percentages: percentages,
            loading: loading,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
