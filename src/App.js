import './App.css';
import { Toaster } from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";
import { RouterProvider } from 'react-router-dom';
import { routers } from './routes/Routes';

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <RouterProvider router={routers}>
      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
