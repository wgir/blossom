import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { client } from './graphql/client';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';
import './index.css';

// Lazy loading pages later
import CharacterDetail from './pages/CharacterDetail';

function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<CharacterDetail />} />
              <Route path="/character/:id" element={<CharacterDetail />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
