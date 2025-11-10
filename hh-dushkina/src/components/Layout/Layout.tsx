import { Outlet } from 'react-router-dom';
import { PageContainer } from '../../shared/containerPage/PageContainer';

export function Layout() {
  return (
      <PageContainer>
        <Outlet />
      </PageContainer>
  );
}