
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserRole, User } from './types';
import Login from './views/Login';
import DashboardLayout from './components/DashboardLayout';
import SuperAdminDashboard from './views/SuperAdminDashboard';
import AdminDashboard from './views/AdminDashboard';
import AreaOfficerDashboard from './views/AreaOfficerDashboard';
import DirectorDashboard from './views/DirectorDashboard';
import CooperativeManagement from './views/CooperativeManagement';
import CooperativeRegistration from './views/CooperativeRegistration';
import VerificationModule from './views/VerificationModule';
import TrainingModule from './views/TrainingModule';
import EventAttendanceModule from './views/EventAttendanceModule';
import FinancialReportsModule from './views/FinancialReportsModule';
import BroadcastCenter from './views/BroadcastCenter';
import TaxManagement from './views/TaxManagement';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocFromServer } from 'firebase/firestore';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Test connection to Firestore
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
          setError("Database connection error. Please check your configuration.");
        }
      }
    };
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as User);
          } else {
            // New user - assign default role or Super Admin if email matches
            const isSuperAdmin = firebaseUser.email === 'richyebrizy@gmail.com';
            const newUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'New User',
              email: firebaseUser.email || '',
              role: isSuperAdmin ? UserRole.SUPER_ADMIN : UserRole.AREA_OFFICER, // Default to Area Officer
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            setUser(newUser);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user profile.");
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-emerald-50 text-emerald-600">
        <div className="animate-pulse text-2xl font-bold mb-4">Cuupers...</div>
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" replace />} 
        />
        
        <Route element={user ? <DashboardLayout user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}>
          <Route path="/" element={
            user?.role === UserRole.SUPER_ADMIN ? <SuperAdminDashboard /> :
            user?.role === UserRole.DIRECTOR ? <DirectorDashboard user={user!} /> :
            user?.role === UserRole.ADMIN ? <AdminDashboard user={user} /> :
            <AreaOfficerDashboard user={user!} />
          } />
          <Route path="/cooperatives" element={<CooperativeManagement user={user!} />} />
          <Route path="/register-cooperative" element={<CooperativeRegistration user={user!} />} />
          <Route path="/verification" element={<VerificationModule user={user!} />} />
          <Route path="/training" element={<TrainingModule user={user!} />} />
          <Route path="/attendance" element={<EventAttendanceModule user={user!} />} />
          <Route path="/financials" element={<FinancialReportsModule user={user!} />} />
          <Route path="/broadcasts" element={<BroadcastCenter user={user!} />} />
          <Route path="/taxation" element={<TaxManagement user={user!} />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
