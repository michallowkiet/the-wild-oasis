import styled from 'styled-components';
import { Tables } from '../../../types/supabase';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FieldErrors, useForm, ValidateResult } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addCabin } from '../../services/apiCabins';
import { Button } from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import Textarea from '../../ui/Textarea';

type CabinFormFields = Tables<'cabins'>;

const FormRow = styled.div`
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

const CreateCabinForm = () => {
  const [errors, setErrors] = useState<FieldErrors<CabinFormFields>>();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<CabinFormFields>();
  const { mutate, isPending } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin successfully created');
      reset();
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.error(err.message);
    },
  });

  const handleOnSubmit = (data: CabinFormFields) => {
    mutate({
      ...data,
    });
  };

  const handleOnError = (errorsForm: FieldErrors<CabinFormFields>) => {
    console.log(errorsForm);
    setErrors(errorsForm);
  };

  if (isPending)
    return (
      <FormRow>
        <Spinner />
      </FormRow>
    );

  return (
    <Form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'This field is required' })}
        />
        {errors?.name && <ErrorMsg>This field is required</ErrorMsg>}
      </FormRow>
      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register('max_capacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
        {errors?.max_capacity && <ErrorMsg>This field is required</ErrorMsg>}
      </FormRow>
      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register('regular_price', {
            required: true,
            min: { value: 1, message: 'Price should be at least 1' },
          })}
        />
        {errors?.regular_price && <ErrorMsg>This field is required</ErrorMsg>}
      </FormRow>
      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: true,
            validate: {
              validateDiscount: (value: number | null): ValidateResult => {
                if (value === null) return [''];
                if (value >= 100) return ['Discount too high'];
                return [''];
              },
            },
          })}
        />
        {errors?.discount && <ErrorMsg>This field is required</ErrorMsg>}
      </FormRow>
      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          id="description"
          defaultValue=""
          {...register('description', { required: true })}
        />
        {errors?.description && <ErrorMsg>This field is required</ErrorMsg>}
      </FormRow>
      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register('image')} />
        {errors?.image && <ErrorMsg>{errors.image.message}</ErrorMsg>}
      </FormRow>
      errorsForm
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Add cabin</Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
