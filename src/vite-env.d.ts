/// <reference types="vite/client" />

interface O1 {
  a: number;
  b: string;
  c: boolean;
  d: Array<number>;
}

const o1: O1 = {
  a: 1,
  b: 'str',
  c: true,
  d: [1, 2, 3],
};

const c = false;

const o2: O1 = { c };

console.log(o1);
console.log(o2);
