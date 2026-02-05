export function compose(...funcs) {
    return (arg) => funcs.reduceRight((composed, fn) => fn(composed), arg);
}