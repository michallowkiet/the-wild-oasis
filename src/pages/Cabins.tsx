import CabinTables from '../features/cabins/CabinTables';
import { Heading } from '../ui/Heading';
import Row, { RowType } from '../ui/Row';

const Cabins = () => {
  // const [cabins, setCabins] = useState<Cabin[]>([]);
  // const [error, setError] = useState<Error>(null);

  // useEffect(() => {
  //   const fetchCabins = async () => {
  //     try {
  //       const { cabins, error } = await getCabins();
  //       if (error) throw error;
  //       setCabins(cabins);
  //     } catch (error: any) {
  //       setError(error.message);
  //     }
  //   };

  //   fetchCabins();
  // }, []);

  // if (error) return <div>{error.details}</div>;

  return (
    <>
      <Row type={RowType.horizontal}>
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTables />
      </Row>
    </>
  );
};

export default Cabins;
