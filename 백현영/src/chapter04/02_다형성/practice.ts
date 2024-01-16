// answer
const is = <T>(a: T, ...args: [T, ...T[]]): boolean => {
  return args.every((_) => _ === a);
};

is('string', 'otherString');
is(true, false);
is(42, 42);
// is(10, 'foo'); // Error가 발생해야함
is([1], [1, 2], [1, 2, 3]);
