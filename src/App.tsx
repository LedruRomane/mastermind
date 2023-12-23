import { BrowserRouter, Routes } from 'react-router-dom';
import { renderRoutes } from '@app/router/router';
import routes from '@app/routes.ts';
import ErrorBoundary from '@app/components/ErrorBoundary';

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
