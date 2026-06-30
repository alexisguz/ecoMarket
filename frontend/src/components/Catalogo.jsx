import { useState } from 'react';
import ProductoCard from './ProductoCard';
import ProductoForm from './ProductoForm';

function Catalogo({ productos, cargando, error, onAgregarAlCarrito, onProductosActualizados }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  function abrirFormNuevo() {
    setProductoEditando(null);
    setModalAbierto(true);
  }

  function abrirFormEdicion(producto) {
    setProductoEditando(producto);
    setModalAbierto(true);
  }

  function cerrarModal() {
    setModalAbierto(false);
    setProductoEditando(null);
  }

  function handleGuardado() {
    cerrarModal();
    onProductosActualizados();
  }

  if (cargando) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error-msg panel">{error}</div>;

  return (
    <div className="catalogo">
      <div className="catalogo-header">
        <h2>Catálogo de Productos</h2>
        <button className="btn btn-primary" onClick={abrirFormNuevo}>
          + Nuevo Producto
        </button>
      </div>

      {productos.length === 0 ? (
        <p className="empty-msg">No hay productos disponibles. ¡Agregá el primero!</p>
      ) : (
        <div className="productos-grid">
          {productos.map(producto => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onAgregarAlCarrito={onAgregarAlCarrito}
              onEditar={abrirFormEdicion}
              onEliminado={onProductosActualizados}
            />
          ))}
        </div>
      )}

      {modalAbierto && (
        <ProductoForm
          producto={productoEditando}
          onGuardado={handleGuardado}
          onCancelar={cerrarModal}
        />
      )}
    </div>
  );
}

export default Catalogo;
