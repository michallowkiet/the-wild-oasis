import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1.2fr 1fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const ErrorMsg = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRowProps = {
  label?: string;
  error?: FieldError;
  children: React.ReactNode;
};

const FormRow = ({ label, error, children }: FormRowProps) => {
  return (
    <StyledFormRow>
      <Label htmlFor="{children.props.id}">{label}</Label>
      {children}
      {error?.message && <ErrorMsg>{error.message}</ErrorMsg>}
    </StyledFormRow>
  );
};

export default FormRow;
