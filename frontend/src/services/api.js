const BASE_URL = 'http://localhost:8080/api';

export async function getProductos() {
  const res = await fetch(`${BASE_URL}/productos`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function createProducto(producto) {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
}

export async function updateProducto(id, producto) {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return res.json();
}

export async function deleteProducto(id) {
  const res = await fetch(`${BASE_URL}/productos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar producto');
}

export async function getOrdenes() {
  const res = await fetch(`${BASE_URL}/ordenes`);
  if (!res.ok) throw new Error('Error al obtener órdenes');
  return res.json();
}

export async function confirmarOrden(orden) {
  const res = await fetch(`${BASE_URL}/ordenes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orden),
  });
  if (!res.ok) throw new Error('Error al confirmar orden');
  return res.json();
}
