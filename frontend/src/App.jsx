import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TaskProvider>
      <div className="bg-mesh" />

      <div className="min-h-screen flex text-slate-200 selection:bg-brand-500/30 selection:text-white">
        <Sidebar />

        <div className="flex-1 flex flex-col lg:pl-64 min-w-0 transition-all duration-300">
          <Navbar />

          <main className="flex-1 flex flex-col min-w-0 relative">
            <Dashboard />
          </main>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </TaskProvider>
  );
}

export default App;
