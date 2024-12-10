import { Heading } from '../ui/Heading';
import Row, { RowType } from '../ui/Row';

const Dashboard = () => {
  return (
    <Row type={RowType.horizontal}>
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
    </Row>
  );
};

export default Dashboard;
