import { Heading } from '../ui/Heading';
import Row, { RowType } from '../ui/Row';

const Cabins = () => {
  return (
    <Row type={RowType.horizontal}>
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
};

export default Cabins;
