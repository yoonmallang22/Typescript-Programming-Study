// 집합의 관점에서 생각하자

// union (합집합)
const stringOrNumber: string | number = 1;
const stringOrNumber2: string | number = '1';
stringOrNumber.toString();
stringOrNumber2.toUpperCase();

// intersection (교집합)
let guess: string & number; // string이면서 number인것
