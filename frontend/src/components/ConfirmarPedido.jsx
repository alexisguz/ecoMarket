import { useState } from 'react';
import { confirmarOrden } from '../services/api';

function ConfirmarPedido({ carrito, total, onConfirmado, onCancelar }) {
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  async function handleConfirmar() {
    setEnviando(true);
    setError('');
    try {
      const orden = {
        mensajePersonalizado: mensaje.trim() || null,
        items: carrito.map(item => ({
          productoNombre: item.producto.nombre,
          productoPrecio: item.producto.precio,
          cantidad: item.cantidad,
        })),
      };
      await confirmarOrden(orden);
      onConfirmado();
    } catch {
      setError('Error al confirmar el pedido. Verificá la conexión con el servidor.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Confirmar Pedido</h2>
        <p className="confirmar-total">
          Total a pagar: <strong>{total}</strong>
        </p>
        <div className="form-group">
          <label>Mensaje personalizado (opcional)</label>
          <textarea
            value={mensaje}
            onChange={e => setMensaje(e.target.value)}
            placeholder="Instrucciones especiales para tu pedido..."
            rows={3}
          />
        </div>
        {error && <p className="error-msg">{error}</p>}
        <div className="modal-acciones">
          <button
            className="btn btn-secondary"
            onClick={onCancelar}
            disabled={enviando}
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={handleConfirmar}
            disabled={enviando}
          >
            {enviando ? 'Confirmando...' : 'Confirmar pedido'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmarPedido;
