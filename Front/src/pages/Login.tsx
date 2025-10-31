import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../lib/api';

export default function Login() {
  const navigate = useNavigate();
  
  // Estados para pestañas
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Estados para Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Estados para Registro
  const [regNombre1, setRegNombre1] = useState('');
  const [regApellido1, setRegApellido1] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regTelefono, setRegTelefono] = useState('');
  const [regFechaNac, setRegFechaNac] = useState('');
  const [regSexo, setRegSexo] = useState<'M'|'F'>('M');
  const [regOcupacion, setRegOcupacion] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  // Estados para UI
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState(false);

  // Handler de Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    try {
      const response = await loginUser(loginEmail, loginPassword);
      localStorage.setItem('auth_token', response.token);
      setMessage('¡Login exitoso!');
      setIsError(false);
      
      setTimeout(() => {
        navigate('/'); // Redirigir al home o dashboard
      }, 1500);
    } catch (error: unknown) {
      setMessage('Credenciales inválidas o email no verificado.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handler de Registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    try {
      await registerUser({
        nombre1: regNombre1,
        apellido1: regApellido1,
        email: regEmail,
        telefono: regTelefono,
        fechaNac: regFechaNac,
        sexo: regSexo,
        ocupacion: regOcupacion,
        password: regPassword
      });
      
      setMessage('Usuario creado. Revisa tu email para verificar tu cuenta.');
      setIsError(false);
      
      // Cambiar a pestaña de login después de registro exitoso
      setTimeout(() => {
        setActiveTab('login');
        setMessage('');
      }, 3000);
      
    } catch (error: unknown) {
      setMessage('Error al registrar usuario. Verifica los datos.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">○</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TUSO</h1>
          <p className="text-gray-600">Inicia sesión para comenzar tu aventura</p>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Acceso</h2>
            <p className="text-gray-600 text-sm">Ingresa o crea tu cuenta para explorar</p>
          </div>

          {/* Pestañas */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'login'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => {
                setActiveTab('login');
                setMessage('');
              }}
            >
              Ingresar
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'register'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => {
                setActiveTab('register');
                setMessage('');
              }}
            >
              Registrarse
            </button>
          </div>

          {/* Mensajes */}
          {message && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              isError 
                ? 'bg-red-100 border border-red-200 text-red-800' 
                : 'bg-green-100 border border-green-200 text-green-800'
            }`}>
              {message}
            </div>
          )}

          {/* Formulario de Login */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="tu@email.com"
                    required
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white py-3 px-4 rounded-md font-medium hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>
          )}

          {/* Formulario de Registro */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primer Nombre
                  </label>
                  <input
                    type="text"
                    value={regNombre1}
                    onChange={(e) => setRegNombre1(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primer Apellido
                  </label>
                  <input
                    type="text"
                    value={regApellido1}
                    onChange={(e) => setRegApellido1(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={regTelefono}
                  onChange={(e) => setRegTelefono(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={regFechaNac}
                    onChange={(e) => setRegFechaNac(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sexo
                  </label>
                  <select
                    value={regSexo}
                    onChange={(e) => setRegSexo(e.target.value as 'M'|'F')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ocupación
                </label>
                <input
                  type="text"
                  value={regOcupacion}
                  onChange={(e) => setRegOcupacion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  minLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white py-3 px-4 rounded-md font-medium hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
