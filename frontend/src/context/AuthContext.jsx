
// // context/AuthContext.jsx - Updated with role-based routing
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// // API Base URL for port 5001
// const API_BASE_URL = 'http://localhost:5001/api/auth';

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Role-based navigation function
//   const navigateBasedOnRole = (userRole) => {
//     console.log('🎯 Navigating based on role:', userRole);
    
//     switch (userRole) {
//       case 'admin':
//         navigate('/admin');
//         break;
//       case 'doctor':
//         navigate('/doctor');
//         break;
//       case 'nurse':
//         navigate('/nurse');
//         break;
//       case 'staff':
//         navigate('/staff');
//         break;
//       case 'patient':
//         navigate('/patient');
//         break;
//       default:
//         console.log('⚠️ Unknown role, redirecting to success page');
//         navigate('/success');
//         break;
//     }
//   };

//   // Login function with role-based redirection
//   const login = async (email, password) => {
//     console.log('🔐 AuthContext: Starting login process...');
    
//     try {
//       console.log('📤 Sending login request to:', `${API_BASE_URL}/signin`);
      
//       const response = await fetch(`${API_BASE_URL}/signin`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       console.log('📥 Response status:', response.status);

//       const data = await response.json();
//       console.log('📥 Response data:', { ...data, token: data.token ? '[TOKEN_RECEIVED]' : '[NO_TOKEN]' });

//       if (!response.ok) {
//         console.error('❌ Login failed - Server error:', data.error);
//         return { success: false, error: data.error || 'Login failed' };
//       }

//       if (!data.token) {
//         console.error('❌ Login failed - No token received');
//         return { success: false, error: 'No authentication token received' };
//       }

//       // Store token and user data
//       localStorage.setItem('token', data.token);
//       setUser(data.user);
      
//       console.log('✅ Login successful! User role:', data.user.role);
      
//       // Navigate based on user role
//       navigateBasedOnRole(data.user.role);
      
//       return { success: true, user: data.user };

//     } catch (error) {
//       console.error('❌ Login fetch error:', error);
      
//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         return { 
//           success: false, 
//           error: 'Cannot connect to server. Please check if the backend is running on port 5001.' 
//         };
//       }
      
//       return { success: false, error: error.message || 'Login failed' };
//     }
//   };

//   // Register function
//   const register = async (userData) => {
//     console.log('📝 AuthContext: Starting registration process...');
    
//     try {
//       console.log('📤 Sending registration request to:', `${API_BASE_URL}/register`);
      
//       const response = await fetch(`${API_BASE_URL}/register`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(userData),
//       });

//       console.log('📥 Registration response status:', response.status);

//       const data = await response.json();
//       console.log('📥 Registration response data:', data);

//       if (!response.ok) {
//         console.error('❌ Registration failed:', data.error);
//         return { success: false, error: data.error || 'Registration failed' };
//       }

//       console.log('✅ Registration successful!');
//       return { success: true, message: data.message };

//     } catch (error) {
//       console.error('❌ Registration fetch error:', error);
      
//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         return { 
//           success: false, 
//           error: 'Cannot connect to server. Please check if the backend is running on port 5001.' 
//         };
//       }
      
//       return { success: false, error: error.message || 'Registration failed' };
//     }
//   };

//   // Initialize demo users function
//   const initializeDemoUsers = async () => {
//     console.log('👥 Initializing demo users...');
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/init-demo-users`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to initialize demo users');
//       }

//       console.log('✅ Demo users initialized:', data);
//       return { success: true, message: data.message };
//     } catch (error) {
//       console.error('❌ Demo users initialization error:', error);
//       return { success: false, error: error.message || 'Failed to initialize demo users' };
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     console.log('🚪 Logging out user...');
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/login');
//   };

//   // Check authentication on app load
//   useEffect(() => {
//     console.log('🔍 Checking existing authentication...');
    
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.log('ℹ️ No token found, user not authenticated');
//       setLoading(false);
//       return;
//     }

//     console.log('🎫 Token found, verifying with server...');
    
//     fetch(`${API_BASE_URL}/me`, {
//       headers: { 
//         Authorization: `Bearer ${token}`,
//         'Accept': 'application/json'
//       },
//     })
//       .then((res) => {
//         console.log('📥 Auth check response status:', res.status);
//         return res.json();
//       })
//       .then((data) => {
//         console.log('📥 Auth check response data:', data);
//         if (data.user) {
//           setUser(data.user);
//           console.log('✅ User authenticated from existing token, role:', data.user.role);
//         } else {
//           console.log('❌ Invalid token, clearing storage');
//           localStorage.removeItem('token');
//         }
//       })
//       .catch((error) => {
//         console.error('❌ Auth check error:', error);
//         console.log('🧹 Clearing invalid token');
//         localStorage.removeItem('token');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const contextValue = {
//     user,
//     login,
//     register,
//     logout,
//     loading,
//     initializeDemoUsers,
//     isAuthenticated: !!user
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
















// context/AuthContext.jsx - Updated with role-based routing and registration requests
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// API Base URL for port 5001
const API_BASE_URL = 'http://localhost:5001/api/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Role-based navigation function
  const navigateBasedOnRole = (userRole) => {
    console.log('🎯 Navigating based on role:', userRole);
    
    switch (userRole) {
      case 'admin':
        navigate('/admin');
        break;
      case 'doctor':
        navigate('/doctor');
        break;
      case 'nurse':
        navigate('/nurse');
        break;
      case 'staff':
        navigate('/staff');
        break;
      case 'patient':
        navigate('/patient');
        break;
      default:
        console.log('⚠️ Unknown role, redirecting to success page');
        navigate('/success');
        break;
    }
  };

  // Login function with role-based redirection
  const login = async (email, password) => {
    console.log('🔐 AuthContext: Starting login process...');
    
    try {
      console.log('📤 Sending login request to:', `${API_BASE_URL}/signin`);
      
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('📥 Response status:', response.status);

      const data = await response.json();
      console.log('📥 Response data:', { ...data, token: data.token ? '[TOKEN_RECEIVED]' : '[NO_TOKEN]' });

      if (!response.ok) {
        console.error('❌ Login failed - Server error:', data.error);
        return { success: false, error: data.error || 'Login failed' };
      }

      if (!data.token) {
        console.error('❌ Login failed - No token received');
        return { success: false, error: 'No authentication token received' };
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      setUser(data.user);
      
      console.log('✅ Login successful! User role:', data.user.role);
      
      // Navigate based on user role
      navigateBasedOnRole(data.user.role);
      
      return { success: true, user: data.user };

    } catch (error) {
      console.error('❌ Login fetch error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to server. Please check if the backend is running on port 5001.' 
        };
      }
      
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  // Register function -> send request to registration_requests table (approval needed)
  const register = async (userData) => {
    console.log('📝 AuthContext: Starting registration process...');
    
    try {
      console.log('📤 Sending registration request to:', `${API_BASE_URL}/register-request`);
      
      const response = await fetch(`${API_BASE_URL}/register-request`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      console.log('📥 Registration response status:', response.status);

      const data = await response.json();
      console.log('📥 Registration response data:', data);

      if (!response.ok) {
        console.error('❌ Registration failed:', data.error);
        return { success: false, error: data.error || 'Registration failed' };
      }

      console.log('✅ Registration request submitted! Awaiting admin approval.');
      return { success: true, message: data.message || 'Registration request submitted for approval' };

    } catch (error) {
      console.error('❌ Registration fetch error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to server. Please check if the backend is running on port 5001.' 
        };
      }
      
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  // Initialize demo users function
  const initializeDemoUsers = async () => {
    console.log('👥 Initializing demo users...');
    
    try {
      const response = await fetch(`${API_BASE_URL}/init-demo-users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize demo users');
      }

      console.log('✅ Demo users initialized:', data);
      return { success: true, message: data.message };
    } catch (error) {
      console.error('❌ Demo users initialization error:', error);
      return { success: false, error: error.message || 'Failed to initialize demo users' };
    }
  };

  // Logout function
  const logout = async () => {
    console.log('🚪 Logging out user...');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Check authentication on app load
  useEffect(() => {
    console.log('🔍 Checking existing authentication...');
    
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('ℹ️ No token found, user not authenticated');
      setLoading(false);
      return;
    }

    console.log('🎫 Token found, verifying with server...');
    
    fetch(`${API_BASE_URL}/me`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      },
    })
      .then((res) => {
        console.log('📥 Auth check response status:', res.status);
        return res.json();
      })
      .then((data) => {
        console.log('📥 Auth check response data:', data);
        if (data.user) {
          setUser(data.user);
          console.log('✅ User authenticated from existing token, role:', data.user.role);
        } else {
          console.log('❌ Invalid token, clearing storage');
          localStorage.removeItem('token');
        }
      })
      .catch((error) => {
        console.error('❌ Auth check error:', error);
        console.log('🧹 Clearing invalid token');
        localStorage.removeItem('token');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const contextValue = {
    user,
    login,
    register,
    logout,
    loading,
    initializeDemoUsers,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}






















// // context/AuthContext.jsx - Updated with admin approval system
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// // API Base URL for port 5001
// const API_BASE_URL = 'http://localhost:5001/api/auth';

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Role-based navigation function
//   const navigateBasedOnRole = (userRole) => {
//     console.log('🎯 Navigating based on role:', userRole);
    
//     switch (userRole) {
//       case 'admin':
//         navigate('/admin');
//         break;
//       case 'doctor':
//         navigate('/doctor');
//         break;
//       case 'nurse':
//         navigate('/nurse');
//         break;
//       case 'staff':
//         navigate('/staff');
//         break;
//       case 'patient':
//         navigate('/patient');
//         break;
//       default:
//         console.log('⚠️ Unknown role, redirecting to success page');
//         navigate('/success');
//         break;
//     }
//   };

//   // Login function with role-based redirection
//   const login = async (email, password) => {
//     console.log('🔐 AuthContext: Starting login process...');
    
//     try {
//       console.log('📤 Sending login request to:', `${API_BASE_URL}/signin`);
      
//       const response = await fetch(`${API_BASE_URL}/signin`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       console.log('📥 Response status:', response.status);

//       const data = await response.json();
//       console.log('📥 Response data:', { ...data, token: data.token ? '[TOKEN_RECEIVED]' : '[NO_TOKEN]' });

//       if (!response.ok) {
//         console.error('❌ Login failed - Server error:', data.error);
//         return { success: false, error: data.error || 'Login failed' };
//       }

//       if (!data.token) {
//         console.error('❌ Login failed - No token received');
//         return { success: false, error: 'No authentication token received' };
//       }

//       // Store token and user data
//       localStorage.setItem('token', data.token);
//       setUser(data.user);
      
//       console.log('✅ Login successful! User role:', data.user.role);
      
//       // Navigate based on user role
//       navigateBasedOnRole(data.user.role);
      
//       return { success: true, user: data.user };

//     } catch (error) {
//       console.error('❌ Login fetch error:', error);
      
//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         return { 
//           success: false, 
//           error: 'Cannot connect to server. Please check if the backend is running on port 5001.' 
//         };
//       }
      
//       return { success: false, error: error.message || 'Login failed' };
//     }
//   };

//   // Register function - now submits to pending_registrations
//   const register = async (userData) => {
//     console.log('📝 AuthContext: Starting registration process...');
    
//     try {
//       console.log('📤 Sending registration request to:', `${API_BASE_URL}/register`);
      
//       const response = await fetch(`${API_BASE_URL}/register`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(userData),
//       });

//       console.log('📥 Registration response status:', response.status);

//       const data = await response.json();
//       console.log('📥 Registration response data:', data);

//       if (!response.ok) {
//         console.error('❌ Registration failed:', data.error);
//         return { success: false, error: data.error || 'Registration failed' };
//       }

//       console.log('✅ Registration submitted for approval!');
//       return { success: true, message: data.message || 'Registration submitted for admin approval' };

//     } catch (error) {
//       console.error('❌ Registration fetch error:', error);
      
//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         return { 
//           success: false, 
//           error: 'Cannot connect to server. Please check if the backend is running on port 5001.' 
//         };
//       }
      
//       return { success: false, error: error.message || 'Registration failed' };
//     }
//   };

//   // Admin functions for managing registrations
//   const getPendingRegistrations = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/admin/pending-registrations`, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json'
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to fetch pending registrations');
//       }

//       return { success: true, data: data.requests || [] };
//     } catch (error) {
//       console.error('❌ Fetch pending registrations error:', error);
//       return { success: false, error: error.message || 'Failed to fetch pending registrations' };
//     }
//   };

//   const approveRegistration = async (registrationId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/admin/approve/${registrationId}`, {
//         method: 'POST',
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to approve registration');
//       }

//       return { success: true, message: data.message || 'Registration approved successfully' };
//     } catch (error) {
//       console.error('❌ Approve registration error:', error);
//       return { success: false, error: error.message || 'Failed to approve registration' };
//     }
//   };

//   const rejectRegistration = async (registrationId, reason) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/admin/reject/${registrationId}`, {
//         method: 'POST',
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ reason }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to reject registration');
//       }

//       return { success: true, message: data.message || 'Registration rejected successfully' };
//     } catch (error) {
//       console.error('❌ Reject registration error:', error);
//       return { success: false, error: error.message || 'Failed to reject registration' };
//     }
//   };

//   // Initialize demo users function
//   const initializeDemoUsers = async () => {
//     console.log('👥 Initializing demo users...');
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/init-demo-users`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to initialize demo users');
//       }

//       console.log('✅ Demo users initialized:', data);
//       return { success: true, message: data.message };
//     } catch (error) {
//       console.error('❌ Demo users initialization error:', error);
//       return { success: false, error: error.message || 'Failed to initialize demo users' };
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     console.log('🚪 Logging out user...');
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/login');
//   };

//   // Check authentication on app load
//   useEffect(() => {
//     console.log('🔍 Checking existing authentication...');
    
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.log('ℹ️ No token found, user not authenticated');
//       setLoading(false);
//       return;
//     }

//     console.log('🎫 Token found, verifying with server...');
    
//     fetch(`${API_BASE_URL}/me`, {
//       headers: { 
//         Authorization: `Bearer ${token}`,
//         'Accept': 'application/json'
//       },
//     })
//       .then((res) => {
//         console.log('📥 Auth check response status:', res.status);
//         return res.json();
//       })
//       .then((data) => {
//         console.log('📥 Auth check response data:', data);
//         if (data.user) {
//           setUser(data.user);
//           console.log('✅ User authenticated from existing token, role:', data.user.role);
//         } else {
//           console.log('❌ Invalid token, clearing storage');
//           localStorage.removeItem('token');
//         }
//       })
//       .catch((error) => {
//         console.error('❌ Auth check error:', error);
//         console.log('🧹 Clearing invalid token');
//         localStorage.removeItem('token');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const contextValue = {
//     user,
//     login,
//     register,
//     logout,
//     loading,
//     initializeDemoUsers,
//     isAuthenticated: !!user,
//     // Admin functions
//     getPendingRegistrations,
//     approveRegistration,
//     rejectRegistration
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
