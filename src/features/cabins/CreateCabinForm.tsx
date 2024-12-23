import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addCabin } from '../../services/apiCabins';
import { Button } from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import Textarea from '../../ui/Textarea';

export type CabinForm = {
  created_at: string | null;
  description: string | null;
  discount: number | null;
  id: number;
  image: FileList;
  max_capacity: number;
  name: string;
  regular_price: number;
  updated_at: string | null;
};

const CreateCabinForm = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinForm>();

  const { errors } = formState;

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

  const handleOnSubmit = (data: CabinForm) => {
    mutate({ ...data });
  };

  if (isPending) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormRow label="Cabin name" error={errors?.name}>
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.max_capacity}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('max_capacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regular_price}>
        <Input
          type="number"
          id="regularPrice"
          defaultValue={0}
          {...register('regular_price', {
            required: 'This field is required',
            min: { value: 1, message: 'Price should be at least 1' },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: {
              moreThenRegular: (fieldValue) => {
                if (fieldValue === null) return true;
                if (fieldValue >= getValues().regular_price)
                  return 'Discount should be less than regular price';
                return true;
              },
            },
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description}>
        <Textarea
          id="description"
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', { required: 'This field is required' })}
        />
      </FormRow>

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
