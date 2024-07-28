import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './contexts/AuthProvider';

function App() {
  return (
		<AuthProvider>
			<Router>
				<div className="App">
					<AppRoutes />
				</div>
			</Router>
		</AuthProvider>
  );
}

export default App;
