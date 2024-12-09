import { GlobalStyles } from './styles/GlobalStyles';
import { Button } from './ui/Button';
import { Heading } from './ui/Heading';
import Input from './ui/Input';
import Row, { RowType } from './ui/Row';
import StyledApp from './ui/StyledApp';

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <header>
          <Row type={RowType.vertical}>
            <Row>
              <Heading as="h1">The Wild Oasis</Heading>
              <div>
                <Heading as="h2">Check-in and Check-out</Heading>

                <Button size="medium" variation="primary">
                  Sing In
                </Button>

                <Button size="medium" variation="primary">
                  Sing Up
                </Button>
              </div>
            </Row>

            <Row type={RowType.vertical}>
              <Heading as="h3">Coming soon</Heading>

              <form>
                <Input placeholder="Search cabins" />
                <Input placeholder="Number of Guests" />
              </form>
            </Row>
          </Row>
        </header>
      </StyledApp>
    </>
  );
}

export default App;
