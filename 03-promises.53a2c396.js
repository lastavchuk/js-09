var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in i){var n=i[e];delete i[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){i[e]=t},e.parcelRequired7c6=n);var r=n("iQIUW"),o=n("i37YJ");function l(e,t){const i=Math.random()>.3;return new Promise(((n,r)=>{setTimeout((()=>{i?n({position:e,delay:t}):r({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(e=>{e.preventDefault();let t=e.target.elements.delay.value,i=e.target.elements.step.value,n=e.target.elements.amount.value;if(t&&i&&n)if(t=Number(t),i=Number(i),n=Number(n),Number.isNaN(t)||Number.isNaN(i)||Number.isNaN(n))o.Report.warning("Must be all numbers","","OK");else if(t<0)o.Report.warning("First delay cannot be negative","","OK");else if(n<=0)o.Report.warning("The Amount must be greater than 0","","OK");else for(let e=0;e<n;e++)l(e+1,t+i*e).then((({position:e,delay:t})=>{r.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`,{clickToClose:!0})})).catch((({position:e,delay:t})=>{r.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`,{clickToClose:!0})}));else o.Report.warning("All fields must be filled","","OK")}));
//# sourceMappingURL=03-promises.53a2c396.js.map