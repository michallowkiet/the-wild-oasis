import { useEffect, useState } from 'react';
import type { Cabin, Error } from '../services/apiCabins';
import { getCabins } from '../services/apiCabins';
import { Heading } from '../ui/Heading';
import Row, { RowType } from '../ui/Row';

const Cabins = () => {
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        const { cabins, error } = await getCabins();
        if (error) throw error;
        setCabins(cabins);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchCabins();
  }, []);

  if (error) return <div>{error.details}</div>;

  return (
    <Row type={RowType.horizontal}>
      <Heading as="h1">All cabins</Heading>
      {cabins.map((cabin) => (
        <div key={cabin.id}>
          <img src={cabin.image ?? ''} alt={cabin.name ?? ''} />
          <div>
            <Heading as="h3">{cabin.name}</Heading>
            <p>{cabin.description}</p>
          </div>
        </div>
      ))}
    </Row>
  );
};

export default Cabins;
