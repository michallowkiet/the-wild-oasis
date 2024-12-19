import { useState } from 'react';
import CabinTables from '../features/cabins/CabinTables';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Heading';
import Row, { RowType } from '../ui/Row';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

const Cabins = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type={RowType.horizontal}>
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row type={RowType.vertical}>
        <CabinTables />

        <Button onClick={() => setShowForm((showForm) => !showForm)}>
          Add new cabin
        </Button>

        {showForm && <CreateCabinForm />}
      </Row>

      {/* <Row>
        <Button>Add new cabin</Button>
        <Button $variation="secondary">Add new cabins</Button>
      </Row> */}
    </>
  );
};

export default Cabins;
