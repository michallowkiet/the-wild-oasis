import styled, { css, RuleSet } from 'styled-components';

export enum RowType {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

type RowProps = {
  type?: RowType;
};

type RowVariations = {
  [key in RowType]: RuleSet;
};

const RowVariations: RowVariations = {
  [RowType.horizontal]: css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2.4rem;
  `,
  [RowType.vertical]: css`
    flex-direction: column;
    gap: 1.6rem;
  `,
};

const Row = styled.div<RowProps>`
  display: flex;

  ${({ type = RowType.horizontal }) =>
    type === RowType.horizontal && RowVariations.horizontal}
  ${({ type }) => type === RowType.vertical && RowVariations.vertical}
`;

export default Row;
