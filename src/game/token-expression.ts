import { Operation, type Expression, type Mission } from './types';
import { constant, variable } from './math';

const operators: Record<string, Operation> = {
  '+': Operation.Add,
  '-': Operation.Subtract,
  '−': Operation.Subtract,
  '*': Operation.Multiply,
  '×': Operation.Multiply,
  '/': Operation.Divide,
  '÷': Operation.Divide,
};

class TokenParser {
  private index = 0;
  constructor(private tokens: string[]) {}

  parse(): Expression {
    const expression = this.sum();

    if (this.index !== this.tokens.length) throw new Error('Há peças fora de ordem.');
    return expression;
  }

  private sum(): Expression {
    let left = this.product();

    while (['+', '-', '−'].includes(this.tokens[this.index]))
      left = this.combine(left, () => this.product());
    return left;
  }

  private product(): Expression {
    let left = this.atom();

    while (['*', '×', '/', '÷'].includes(this.tokens[this.index]))
      left = this.combine(left, () => this.atom());
    return left;
  }

  private combine(left: Expression, right: () => Expression): Expression {
    const operation = operators[this.tokens[this.index++]];

    return { type: 'operation', operation, left, right: right() };
  }

  private atom(): Expression {
    const token = this.tokens[this.index++];

    return token === '(' ? this.parenthesized() : atomicToken(token);
  }

  private parenthesized() {
    const value = this.sum();

    if (this.tokens[this.index++] !== ')') throw new Error('Feche os parênteses da montagem.');
    return value;
  }
}

function atomicToken(token: string): Expression {
  if (token === 'x') return variable;
  if (/^-?\d+$/.test(token) && Number.isSafeInteger(Number(token))) return constant(Number(token));
  throw new Error('Use peças numéricas, x, operações e parênteses.');
}

type Polynomial = number[];
interface Fraction {
  numerator: Polynomial;
  denominator: Polynomial;
}

function polynomialAdd(left: Polynomial, right: Polynomial, sign = 1): Polynomial {
  return Array.from(
    { length: Math.max(left.length, right.length) },
    (_, index) => (left[index] ?? 0) + sign * (right[index] ?? 0),
  );
}

function polynomialMultiply(left: Polynomial, right: Polynomial): Polynomial {
  const result = Array<number>(left.length + right.length - 1).fill(0);

  left.forEach((a, i) =>
    right.forEach((b, j) => {
      result[i + j] += a * b;
    }),
  );
  if (!result.every(Number.isSafeInteger)) throw new Error('Use números menores na montagem.');
  return result;
}

function fraction(expression: Expression): Fraction {
  if (expression.type === 'constant') return { numerator: [expression.value], denominator: [1] };
  if (expression.type === 'variable') return { numerator: [0, 1], denominator: [1] };
  const a = fraction(expression.left);
  const b = fraction(expression.right);

  return fractionOperations[expression.operation](a, b);
}

const fractionOperations: Record<Operation, (a: Fraction, b: Fraction) => Fraction> = {
  add: (a, b) => fractionSum(a, b, 1),
  subtract: (a, b) => fractionSum(a, b, -1),
  multiply: (a, b) => ({
    numerator: polynomialMultiply(a.numerator, b.numerator),
    denominator: polynomialMultiply(a.denominator, b.denominator),
  }),
  divide: fractionDivide,
};

function fractionDivide(a: Fraction, b: Fraction): Fraction {
  if (b.numerator.every((value) => value === 0))
    throw new Error('A expressão não pode dividir por zero.');
  return {
    numerator: polynomialMultiply(a.numerator, b.denominator),
    denominator: polynomialMultiply(a.denominator, b.numerator),
  };
}

function fractionSum(a: Fraction, b: Fraction, sign: number): Fraction {
  return {
    numerator: polynomialAdd(
      polynomialMultiply(a.numerator, b.denominator),
      polynomialMultiply(b.numerator, a.denominator),
      sign,
    ),
    denominator: polynomialMultiply(a.denominator, b.denominator),
  };
}

function equivalent(left: Expression, right: Expression) {
  const a = fraction(left);
  const b = fraction(right);
  const difference = polynomialAdd(
    polynomialMultiply(a.numerator, b.denominator),
    polynomialMultiply(b.numerator, a.denominator),
    -1,
  );

  return difference.every((coefficient) => coefficient === 0);
}

function validateOrder(tokens: string[], mission: Mission) {
  if (tokens.length > 30) throw new Error('Use até 30 peças por montagem.');
  if (!usesAvailableTokens(tokens, mission.tokens!))
    throw new Error(
      'Cada ordem deve usar somente as peças disponíveis, respeitando as repetições.',
    );
  if (!validEquivalent(tokens, mission))
    throw new Error('A montagem deve ser matematicamente equivalente à expressão.');
}

export function validateBuildMission(mission: Mission) {
  for (const tokens of [mission.expectedTokens!, ...(mission.equivalentTokens ?? [])])
    validateOrder(tokens, mission);
}

function validEquivalent(tokens: string[], mission: Mission) {
  const expression = parseExpressionTokens(tokens);

  return !!mission.expression && equivalent(expression, mission.expression);
}

export function usesAvailableTokens(order: string[], available: string[]): boolean {
  const remaining = [...available];

  return order.every((token) => {
    const index = remaining.indexOf(token);

    if (index < 0) return false;
    remaining.splice(index, 1);
    return true;
  });
}

export function parseExpressionTokens(tokens: string[]): Expression {
  if (tokens.length > 30) throw new Error('Use até 30 peças por montagem.');
  const expression = new TokenParser(tokens).parse();

  validateExpression(expression);
  return expression;
}

export function validateExpression(expression: Expression): void {
  const result = fraction(expression);

  if (result.denominator.every((value) => value === 0))
    throw new Error('A expressão não pode dividir por zero.');
}
