import { css, RuleSet, styled } from 'styled-components';

type HeadingRules = {
  h1: RuleSet;
  h2: RuleSet;
  h3: RuleSet;
};

type HeadingProps = {
  as: 'h1' | 'h2' | 'h3';
};

const types: HeadingRules = {
  h1: css`
    font-size: 4rem;
    font-weight: 700;
  `,
  h2: css`
    font-size: 2.4rem;
    font-weight: 600;
  `,
  h3: css`
    font-size: 1.8rem;
    font-weight: 500;
  `,
};

const Heading = styled.h1<HeadingProps>`
  ${({ as }) => types[as as keyof HeadingRules]};
  line-height: 1.1;
`;

export { Heading };
