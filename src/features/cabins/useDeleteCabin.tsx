import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

import { Dispatch, SetStateAction } from 'react';

interface UseDeleteCabinProps {
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
}

export const useDeleteCabin = ({ setIsDeleting }: UseDeleteCabinProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onMutate: () => {
      setIsDeleting(true);
    },
    onSuccess: () => {
      toast.success('Cabin successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteCabin };
};
