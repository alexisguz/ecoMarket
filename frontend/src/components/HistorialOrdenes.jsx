import { useState, useEffect } from 'react';
import { getOrdenes } from '../services/api';

function HistorialOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const data = await getOrdenes();
        setOrdenes(data);
      } catch {
        setError('Error al cargar el historial de pedidos.');
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  const formatARS = valor =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(valor);

  if (cargando) return <div className="loading">Cargando historial...</div>;
  if (error) return <div className="error-msg panel">{error}</div>;

  return (
    <div className="historial">
      <h2>Historial de Pedidos</h2>
      {ordenes.length === 0 ? (
        <p className="empty-msg">No hay pedidos realizados aún.</p>
      ) : (
        <div className="ordenes-lista">
          {ordenes.map(orden => {
            const totalOrden = orden.items.reduce(
              (sum, item) => sum + item.productoPrecio * item.cantidad,
              0
            );
            return (
              <div key={orden.id} className="orden-card">
                <div className="orden-header">
                  <span className="orden-id">Pedido #{orden.id}</span>
                  <span className="orden-fecha">
                    {new Date(orden.fechaConfirmacion).toLocaleString('es-AR')}
                  </span>
                </div>
                {orden.mensajePersonalizado && (
                  <p className="orden-mensaje">"{orden.mensajePersonalizado}"</p>
                )}
                <ul className="orden-items">
                  {orden.items.map(item => (
                    <li key={item.id}>
                      {item.productoNombre} × {item.cantidad} —{' '}
                      {formatARS(item.productoPrecio * item.cantidad)}
                    </li>
                  ))}
                </ul>
                <div className="orden-total">
                  Total: <strong>{formatARS(totalOrden)}</strong>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistorialOrdenes;
