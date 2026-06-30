function CarritoItem({ item, onActualizarCantidad, onQuitar }) {
  const { producto, cantidad } = item;

  const formatARS = valor =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(valor);

  return (
    <div className="carrito-item">
      <div className="item-info">
        <span className="item-nombre">{producto.nombre}</span>
        <span className="item-precio">{formatARS(producto.precio)} c/u</span>
      </div>
      <div className="item-controles">
        <button
          className="btn-cantidad"
          onClick={() => onActualizarCantidad(producto.id, cantidad - 1)}
        >
          −
        </button>
        <span className="cantidad">{cantidad}</span>
        <button
          className="btn-cantidad"
          onClick={() => onActualizarCantidad(producto.id, cantidad + 1)}
        >
          +
        </button>
      </div>
      <div className="item-subtotal">{formatARS(producto.precio * cantidad)}</div>
      <button className="btn btn-danger btn-sm" onClick={() => onQuitar(producto.id)}>
        Quitar
      </button>
    </div>
  );
}

export default CarritoItem;
