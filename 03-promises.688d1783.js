var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var i=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,i.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=i);var o=i("iQIUW"),r=i("i37YJ");const u={form:document.querySelector(".form"),inputDelay:document.querySelector('input[name="delay"]'),inputStep:document.querySelector('input[name="step"]'),inputAmount:document.querySelector('input[name="amount"]')};function l(e,t){const n=Math.random()>.3;return new Promise(((i,o)=>{setTimeout((()=>{n?i({position:e,delay:t}):o({position:e,delay:t})}),t)}))}u.form.addEventListener("submit",(e=>{if(e.preventDefault(),!u.inputDelay.value||!u.inputStep.value||!u.inputAmount.value)return void r.Report.warning("All fields must be filled","","OK");const t=Number(u.inputDelay.value),n=Number(u.inputStep.value),i=Number(u.inputAmount.value);if(Number.isNaN(t)||Number.isNaN(n)||Number.isNaN(i))r.Report.warning("Must be all numbers","","OK");else if(t<0)r.Report.warning("First delay cannot be negative","","OK");else if(i<=0)r.Report.warning("The Amount must be greater than 0","","OK");else for(let e=0;e<i;e++)l(e+1,t+n*e).then((({position:e,delay:t})=>{o.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`,{clickToClose:!0})})).catch((({position:e,delay:t})=>{o.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`,{clickToClose:!0})}))}));
//# sourceMappingURL=03-promises.688d1783.js.map
