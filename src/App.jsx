import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard/Dashboard';
import SpotifyCallback from './pages/SpotifyCallback';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Playlist from './pages/Playlist';
import Library from './pages/Library';

function App({ spotifyApi }) {
	return (
		<Box className="App" sx={{ width: '100%', height: '100%' }}>
			<Routes>
				{/* Public routes */}
				<Route path="/login" element={<Login />} />
				<Route path="/callback" element={<SpotifyCallback />} />

				{/* Protected dashboard with nested routes */}
				<Route
					path="/dashboard/*"
					element={
						<ProtectedRoute>
							<Dashboard spotifyApi={spotifyApi} />
						</ProtectedRoute>
					}
				>
					<Route index element={<Home/>} />
					<Route path="playlist/:id" element={<Playlist spotifyApi={spotifyApi} />} />
					 <Route path="library" element={<Library spotifyApi={spotifyApi} />} /> 
				</Route>

				{/* Fallback for unknown routes */}
				<Route path="*" element={<Navigate to="/dashboard" replace />} />
			</Routes>
		</Box>
	);
}

export default App;
