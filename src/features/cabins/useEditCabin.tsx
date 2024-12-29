import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { editCabin as editCabinApi } from '../../services/apiCabins';

export const UseEditCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditCabinPending } = useMutation({
    mutationFn: editCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin successfully updated');
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.error(err.message);
    },
  });

  return { editCabin, isEditCabinPending };
};
