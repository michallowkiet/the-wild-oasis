import styled from 'styled-components';

export enum TagColors {
  brand = 'brand',
  grey = 'grey',
  blue = 'blue',
  green = 'green',
  yellow = 'yellow',
  silver = 'silver',
  indigo = 'indigo',
  red = 'red',
}

type TagProps = {
  color: TagColors;
};

const Tag = styled.span<TagProps>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${({ color }) => color}-700);
  background-color: var(--color-${({ color }) => color}-100);
`;

export default Tag;
