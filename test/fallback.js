import {describe} from 'fava';

describe('Fallback crypto', it => {
  it('works when crypto.subtle is missing', async t => {
    const original = globalThis.crypto;
    // Remove crypto to simulate absence
    delete globalThis.crypto;
    const Puzzle = (await import('../dist/index.js?no-subtle')).default;
    const puzzle = await Puzzle.generate({duration:100, message:'x'});
    const solution = await Puzzle.solve(puzzle);
    t.is(solution, 'x');
    // Restore
    if (original) globalThis.crypto = original;
  });
});

