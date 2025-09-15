


// App.jsx
import React, { useState, useEffect } from "react";
import { LoginForm } from "./components/auth/LoginForm.jsx";
import { Sidebar } from "./components/layout/Sidebar.jsx";
import { Header } from "./components/layout/Header.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { Toaster } from './components/ui/toaster';
import { AuthProvider, useAuth } from './context/AuthContext' // ✅ use your central AuthContext


function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <LoginForm />
      ) : (
        <div className="flex h-screen">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            currentView={currentView}
            onViewChange={setCurrentView}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
            <main className="flex-1 overflow-auto p-6">
              <Dashboard currentView={currentView} />
            </main>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>  {/* ✅ Wrap the entire app here */}
      <AppContent />
    </AuthProvider>
  );
}
