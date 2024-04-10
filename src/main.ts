const numberWithSpaces = (x: number, fullValue?: boolean) => {
  try {
    if (fullValue) {
      let parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    } else {
      const secondNumber = x.toString()[2] === '0' ? '' : x.toString()[2]
      const needDot = secondNumber ? '.' : ''
      const thirdNumber = x.toString()[3] === '0' ? '' : x.toString()[3]
      const needDot3 = thirdNumber ? '.' : ''
      if (x.toString().length > 12) {
        return '999B+'
      } else if (x.toString().length === 12) {
        return x.toString()[0] + x.toString()[1] + x.toString()[2] + needDot3 + thirdNumber + 'B'
      } else if (x.toString().length === 11) {
        if (thirdNumber) {
          return x.toString()[0] + x.toString()[1] + '.' + x.toString()[2] + x.toString()[3] + 'B'
        } else {
          return x.toString()[0] + x.toString()[1] + needDot + secondNumber + 'B'
        }
      } else if (x.toString().length === 10) {
        return x.toString()[0] + '.' + x.toString()[1] + secondNumber + 'B'
      } else if (x.toString().length === 9) {
        return x.toString()[0] + x.toString()[1] + x.toString()[2] + needDot3 + thirdNumber + 'M'
      } else if (x.toString().length === 8) {
        if (thirdNumber) {
          return x.toString()[0] + x.toString()[1] + '.' + x.toString()[2] + x.toString()[3] + 'M'
        } else {
          return x.toString()[0] + x.toString()[1] + needDot + secondNumber + 'M'
        }
      } else if (x.toString().length === 7) {
        return x.toString()[0] + '.' + x.toString()[1] + secondNumber + 'M'
      } else {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
      }
    }
  } catch (e) {
    console.log(`[numberWithSpaces] error with ${e}`);
  }
};

const newFunc = (x: number, fullValue?: boolean): string => {
  const numberToString = (x: number, partValue: number, letter: string): string => {
    const locale = x.toLocaleString('ru-RU');
    const firstPart = locale.split(' ')[0];
    const secondPart = locale.replace(firstPart, '').replace(' ', '').slice(0, partValue);
    return `${firstPart}.${secondPart}${letter}`;
  };
  try {
    if (fullValue) {
      let parts = x.toString().split(".");
      parts[0] = (+parts[0]).toLocaleString('ru-RU');
      return parts.join(".") || '';
    } else {
      if (x.toString().length > 12) {
        return '999B+'
      } else if (x.toString().length > 11) {
        return numberToString(x, 1, 'B');
      } else if (x.toString().length > 9) {
        return numberToString(x, 2, 'B');
      } else if (x.toString().length > 6) {
        return numberToString(x, 2, 'M')
      } else {
        return x.toLocaleString('ru-RU');
      }
    }
  } catch (e) {
    console.log(`[newFunc] error with ${e}`);
    return '';
  }
}


(() => {
  const tests = [
    123, 10001, 153056, 5132.51321, -1, -5561321313, 99999, 12345678, 912321561321, 912301561321, 51231411.31313131, 0
  ]

  tests.forEach((number, index) => {
    const old = numberWithSpaces(number, false);
    const old1 = numberWithSpaces(number, true);
    const newN = newFunc(number, false)?.replace(/\xa0/g, ' ')?.replace(/\u202f/g, ' ');
    const newN1 = newFunc(number, true)?.replace(/\xa0/g, ' ')?.replace(/\u202f/g, ' ');
    const status = (old == newN && old1 == newN1);
    console.log(`#${index + 1}`, status ? "OK" : "FAILED", !status ? `${old} == ${newN} | ${old1} == ${newN1}` : '');
  });
})();
