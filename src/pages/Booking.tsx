import { Heading } from '../ui/Heading';
import Row, { RowType } from '../ui/Row';

function Bookings() {
  return (
    <Row type={RowType.horizontal}>
      <Heading as="h1">All bookings</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Bookings;
