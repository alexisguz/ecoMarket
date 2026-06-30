import { useState } from 'react';
import { createProducto, updateProducto } from '../services/api';

function ProductoForm({ producto, onGuardado, onCancelar }) {
  const [nombre, setNombre] = useState(producto?.nombre || '');
  const [precio, setPrecio] = useState(producto?.precio || '');
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nombre.trim()) {
      setError('El nombre es requerido.');
      return;
    }
    if (!precio || isNaN(precio) || Number(precio) <= 0) {
      setError('El precio debe ser un número positivo.');
      return;
    }

    setGuardando(true);
    setError('');
    try {
      const datos = { nombre: nombre.trim(), precio: Number(precio) };
      if (producto) {
        await updateProducto(producto.id, datos);
      } else {
        await createProducto(datos);
      }
      onGuardado();
    } catch {
      setError('Error al guardar el producto. Verificá la conexión con el servidor.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{producto ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Nombre del producto"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Precio (ARS)</label>
            <input
              type="number"
              value={precio}
              onChange={e => setPrecio(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <div className="modal-acciones">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={guardando}>
              {guardando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductoForm;
