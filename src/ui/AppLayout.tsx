import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { Header } from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

const StyledAppLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
