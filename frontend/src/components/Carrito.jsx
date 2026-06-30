import { useState } from 'react';
import CarritoItem from './CarritoItem';
import ConfirmarPedido from './ConfirmarPedido';

function Carrito({ carrito, onActualizarCantidad, onQuitarItem, onVaciarCarrito, onOrdenConfirmada }) {
  const [confirmando, setConfirmando] = useState(false);

  const total = carrito.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0
  );

  const totalFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(total);

  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>Carrito</h2>
        <p>Tu carrito está vacío. ¡Agregá productos desde el catálogo!</p>
      </div>
    );
  }

  return (
    <div className="carrito">
      <h2>Carrito de Compras</h2>
      <div className="carrito-items">
        {carrito.map(item => (
          <CarritoItem
            key={item.producto.id}
            item={item}
            onActualizarCantidad={onActualizarCantidad}
            onQuitar={onQuitarItem}
          />
        ))}
      </div>
      <div className="carrito-resumen">
        <div className="total">Total: <strong>{totalFormateado}</strong></div>
        <div className="carrito-acciones">
          <button className="btn btn-secondary" onClick={onVaciarCarrito}>
            Vaciar carrito
          </button>
          <button className="btn btn-primary" onClick={() => setConfirmando(true)}>
            Confirmar pedido
          </button>
        </div>
      </div>

      {confirmando && (
        <ConfirmarPedido
          carrito={carrito}
          total={totalFormateado}
          onConfirmado={onOrdenConfirmada}
          onCancelar={() => setConfirmando(false)}
        />
      )}
    </div>
  );
}

export default Carrito;
