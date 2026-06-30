import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import HistorialOrdenes from './components/HistorialOrdenes';
import { getProductos } from './services/api';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [vista, setVista] = useState('catalogo');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    setCargando(true);
    setError(null);
    try {
      const data = await getProductos();
      setProductos(data);
    } catch {
      setError('No se pudo conectar con el servidor. Verificá que Spring Boot esté corriendo en el puerto 8080.');
    } finally {
      setCargando(false);
    }
  }

  function agregarAlCarrito(producto) {
    setCarrito(prev => {
      const existente = prev.find(item => item.producto.id === producto.id);
      if (existente) {
        return prev.map(item =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
  }

  function actualizarCantidad(productoId, cantidad) {
    if (cantidad <= 0) {
      quitarDelCarrito(productoId);
      return;
    }
    setCarrito(prev =>
      prev.map(item =>
        item.producto.id === productoId ? { ...item, cantidad } : item
      )
    );
  }

  function quitarDelCarrito(productoId) {
    setCarrito(prev => prev.filter(item => item.producto.id !== productoId));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  function handleOrdenConfirmada() {
    vaciarCarrito();
    setVista('historial');
  }

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div className="app">
      <Navbar vista={vista} onCambiarVista={setVista} totalItems={totalItems} />
      <main className="contenido">
        {vista === 'catalogo' && (
          <Catalogo
            productos={productos}
            cargando={cargando}
            error={error}
            onAgregarAlCarrito={agregarAlCarrito}
            onProductosActualizados={cargarProductos}
          />
        )}
        {vista === 'carrito' && (
          <Carrito
            carrito={carrito}
            onActualizarCantidad={actualizarCantidad}
            onQuitarItem={quitarDelCarrito}
            onVaciarCarrito={vaciarCarrito}
            onOrdenConfirmada={handleOrdenConfirmada}
          />
        )}
        {vista === 'historial' && <HistorialOrdenes />}
      </main>
    </div>
  );
}

export default App;
