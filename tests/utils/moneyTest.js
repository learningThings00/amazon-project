import { currencyFormat } from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(currencyFormat(1080)).toEqual('10.80');
  });

  it('works with 0', () => {
    expect(currencyFormat(0)).toEqual('0.00');
  });

  describe('Rounding', () => {
    it('rounds up to nearest cent', () => {
      expect(currencyFormat(1080.5)).toEqual('10.81');
    });

    it('rounds down to nearest cent', () => {
      expect(currencyFormat(1080.4)).toEqual('10.80');
    });
  });
});
