import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../lib/api';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading'|'success'|'error'>('loading');
  const [message, setMessage] = useState('Verificando...');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Token no proporcionado');
      return;
    }

    const verifyToken = async () => {
      try {
        const data = await verifyEmail(token);
        setStatus('success');
        setMessage(data.message || 'Email verificado correctamente. Ya puedes iniciar sesión.');
        setTimeout(() => navigate('/login'), 3000);
      } catch (error: unknown) {
        setStatus('error');
        // Verificar si es un error de Axios
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response: { data: { message: string } } };
          setMessage(axiosError.response?.data?.message || 'Error de verificación');
        } else {
          setMessage('Error de verificación');
        }
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-semibold mb-2">Verificación de Email</h1>
        <div className={`p-3 rounded ${status==='success' ? 'bg-green-100 text-green-800' : status==='error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
          {message}
        </div>
        {status === 'success' && <p className="text-sm text-gray-500 mt-2">Redirigiendo al login...</p>}
        {status === 'error' && (
          <button onClick={() => navigate('/login')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Ir al Login
          </button>
        )}
      </div>
    </div>
  );
}
