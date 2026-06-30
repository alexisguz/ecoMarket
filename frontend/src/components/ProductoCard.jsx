import { deleteProducto } from '../services/api';

function ProductoCard({ producto, onAgregarAlCarrito, onEditar, onEliminado }) {
  async function handleEliminar() {
    if (!confirm(`¿Eliminar "${producto.nombre}"?`)) return;
    try {
      await deleteProducto(producto.id);
      onEliminado();
    } catch {
      alert('Error al eliminar el producto.');
    }
  }

  const precioFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(producto.precio);

  return (
    <div className="producto-card">
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p className="precio">{precioFormateado}</p>
      </div>
      <div className="producto-acciones">
        <button
          className="btn btn-success btn-sm"
          onClick={() => onAgregarAlCarrito(producto)}
        >
          + Al carrito
        </button>
        <button
          className="btn btn-warning btn-sm"
          onClick={() => onEditar(producto)}
        >
          Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleEliminar}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductoCard;
