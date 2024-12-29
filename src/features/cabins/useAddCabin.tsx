import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addCabin as addCabinApi } from '../../services/apiCabins';

const queryClient = useQueryClient();
export const UseAddCabin = () => {
  const { mutate: addCabin, isPending: isAddCabinPending } = useMutation({
    mutationFn: addCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin successfully created');
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.error(err.message);
    },
  });

  return { addCabin, isAddCabinPending };
};
