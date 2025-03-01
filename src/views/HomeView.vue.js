import TestCases from '@/components/TestCases.vue';
import GlobalCase from '@/components/GlobalCase.vue';
import ToggleTheme from '@/components/ToggleTheme.vue';
import Chart from '@/components/Chart.vue';
const results = ref([]);
const globalCode = ref(`const data = [...Array(1000).keys()];`);
const cases = ref([
    {
        id: 1,
        code: `data.find(x => x == 100)`,
        ops: '',
    },
    {
        id: 2,
        code: `data.find(x => x == 200)`,
        ops: '',
    },
    {
        id: 3,
        code: `data.find(x => x == 400)`,
        ops: '',
    },
    {
        id: 4,
        code: `data.find(x => x == 800)`,
        ops: '',
    },
]);
const loadingCases = ref(true);
function removeCase(id) {
    cases.value = cases.value.filter((testCase) => testCase.id !== id);
}
function addCase() {
    cases.value.unshift({
        id: cases.value.reduce((acc, testCase) => Math.max(acc, testCase.id), 0) + 1,
        code: '',
        ops: '',
    });
}
async function runTest({ code, data }) {
    cases.value = cases.value.filter((testCase) => testCase.code !== '');
    const worker = new Worker('worker.js');
    worker.postMessage({ code, data, duration: 1000 });
    return new Promise((resolve) => {
        worker.onmessage = (event) => resolve(event.data);
    });
}
async function runTestCases() {
    const globalCodeValue = globalCode.value;
    cases.value.forEach((testCase) => {
        testCase.ops = 'loading';
    });
    loadingCases.value = true;
    const newResults = await Promise.all(cases.value.map((testCase) => runTest({
        code: testCase.code,
        data: globalCodeValue,
    }).catch(() => 0)));
    results.value = newResults;
    cases.value.forEach((testCase, index) => {
        const ops = newResults[index];
        testCase.ops = ops ? `${ops.toLocaleString()} ops/s` : 'Error';
    });
    loadingCases.value = false;
}
onMounted(() => {
    runTestCases();
});
provide('loadingCases', loadingCases);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
/** @type {__VLS_StyleScopedClasses['case-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({
    ...{ class: "main-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "header" },
});
/** @type {[typeof ToggleTheme, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ToggleTheme, new ToggleTheme({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.runTestCases) },
    disabled: (__VLS_ctx.loadingCases),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "case-container" },
});
/** @type {[typeof GlobalCase, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(GlobalCase, new GlobalCase({
    modelValue: (__VLS_ctx.globalCode),
}));
const __VLS_4 = __VLS_3({
    modelValue: (__VLS_ctx.globalCode),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
() => ({
    'onUpdate:modelValue': (...[$event]) => (__VLS_ctx.globalCode = $event)
});
var __VLS_5;
/** @type {[typeof TestCases, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(TestCases, new TestCases({
    ...{ 'onRemove': {} },
    ...{ 'onAdd': {} },
    cases: (__VLS_ctx.cases),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onRemove': {} },
    ...{ 'onAdd': {} },
    cases: (__VLS_ctx.cases),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
() => ({
    'onUpdate:cases': (...[$event]) => (__VLS_ctx.cases = $event)
});
() => ({
    onRemove: (__VLS_ctx.removeCase)
});
() => ({
    onAdd: (__VLS_ctx.addCase)
});
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
    ...{ class: "chart-container" },
});
/** @type {[typeof Chart, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(Chart, new Chart({
    results: (__VLS_ctx.results),
}));
const __VLS_16 = __VLS_15({
    results: (__VLS_ctx.results),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['main-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['case-container']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TestCases: TestCases,
            GlobalCase: GlobalCase,
            ToggleTheme: ToggleTheme,
            Chart: Chart,
            results: results,
            globalCode: globalCode,
            cases: cases,
            loadingCases: loadingCases,
            removeCase: removeCase,
            addCase: addCase,
            runTestCases: runTestCases,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
