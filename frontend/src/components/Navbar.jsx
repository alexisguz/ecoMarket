function Navbar({ vista, onCambiarVista, totalItems }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🌿</span>
        <h1>EcoMarket</h1>
      </div>
      <div className="navbar-links">
        <button
          className={`nav-btn ${vista === 'catalogo' ? 'activo' : ''}`}
          onClick={() => onCambiarVista('catalogo')}
        >
          Catálogo
        </button>
        <button
          className={`nav-btn ${vista === 'carrito' ? 'activo' : ''}`}
          onClick={() => onCambiarVista('carrito')}
        >
          Carrito
          {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </button>
        <button
          className={`nav-btn ${vista === 'historial' ? 'activo' : ''}`}
          onClick={() => onCambiarVista('historial')}
        >
          Mis Pedidos
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
