const whiteSpaces = ' \f\n\r\t\v\u00A0\u2028\u2029';

nice.Single.extend({
  title: 'String',

  defaultValue: () => '',

  saveValue: v => v,

  loadValue: v => v,

  set: (...a) => a[0] ? nice.format(...a) : ''
})
  .about('Wrapper for JS string.')
  .ReadOnly(function length(){
    return this.getResult().length;
  });

_each({
  endsWith: (s, p, l) => s.endsWith(p, l),
  startsWith: (s, p, i) => s.startsWith(p, i),
  includes: (s, p, i) => s.includes(p, i),
  match: (s, r) => r && r.test && r.test(s),
}, (f, name) => Check.string(name, f));


const M = Mapping.string;
const sf = {
  trimLeft: (s, a = whiteSpaces) => {
    let i = 0;
    while(a.indexOf(s[i]) >= 0) i++;
    return s.substr(i);
  },

  trimRight: (s, a = whiteSpaces) => {
    let i = s.length - 1;
    while(a.indexOf(s[i]) >= 0) i--;
    return s.substr(0, i + 1);
  },

  trim: (s, a) => sf.trimRight(sf.trimLeft(s, a), a),

  truncate: (s, n, tale) => s.length > n ? s.substr(0, n) + (tale || '') : s,

  capitalize: nice._capitalize,
  deCapitalize: nice._deCapitalize
};

_each(sf, (v, k) => M(k, v));

`toLocaleLowerCase
toLocaleUpperCase
toLowerCase
toUpperCase
charAt
charCodeAt
codePointAt
concat
indexOf
lastIndexOf
normalize
padEnd
padStart
repeat
substr
substring
slice
split
match
search
replace
localeCompare`.split('\n').forEach(k => M(k, (s, ...a) => s[k](...a)));

nice.Mapping.number(String.fromCharCode);
nice.Mapping.number(String.fromCodePoint);


typeof Symbol === 'function' && Func.string(Symbol.iterator, z => {
  let i = 0;
  const l = z.length;
  return { next: () => ({ value: z[i], done: ++i > l }) };
});