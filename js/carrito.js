// renderizar cards de productos agregados al localStorage
function renderCarrito() {
  const contenedor = document.getElementById("carritoContainer");
  const totalEl = document.getElementById("totalPrecio");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach((item, idx) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const fila = `
      <div class="carrito-item d-flex align-items-center justify-content-between p-2 border rounded mb-2">
        <img src="${item.imagen}" alt="${
      item.nombre
    }" class="img-thumbnail me-3" style="width: 80px; height: 80px; object-fit: cover;" />
        <div class="flex-grow-1">
          <h6 class="mb-1 fw-bold">${item.nombre}</h6>
          <p class="mb-0">Cantidad: <strong>${item.cantidad}</strong></p>
          <p class="mb-0">Subtotal: <strong>$${subtotal.toLocaleString()} COP</strong></p>
        </div>
        <button class="btn btn-danger btn-sm ms-3" onclick="eliminarProducto(${idx})">Eliminar</button>
      </div>
    `;

    contenedor.innerHTML += fila;
  });

  totalEl.textContent = `Total: $${total.toLocaleString()} COP`;
}

// eliminar producto del carrito

function eliminarProducto(idx) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(idx, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}
// y actualizar el localStorage
document.addEventListener("DOMContentLoaded", renderCarrito);

// Al hacer clic en el botón "Proceder al Pago", se verifica si el carrito tiene productos.
// Si está vacío, muestra una alerta al usuario. Si hay productos, se abre el modal con el formulario de pedido.
document
  .getElementById("btnProcederPago")
  .addEventListener("click", function () {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const modal = new bootstrap.Modal(
      document.getElementById("modalFormularioPedido")
    );
    modal.show();
  });

// Al enviar el formulario de pedido, se evita el comportamiento por defecto del formulario.
// Se obtienen los datos del cliente y el contenido del carrito desde el localStorage.
// Luego, se construye un mensaje con el detalle del pedido y se abre WhatsApp con ese mensaje listo para enviar.
// Finalmente, se cierra el modal del formulario.
document.getElementById("formPedido").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const tipoPago = document.getElementById("tipoPago").value;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let mensaje = `Buen día, deseo realizar el siguiente pedido:%0A%0A`;
  let total = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    mensaje += `${index + 1}. ${producto.nombre} x${
      producto.cantidad
    } - $${subtotal.toLocaleString()} COP%0A`;
    total += subtotal;
  });

  mensaje += `%0AValor total: $${total.toLocaleString()} COP%0A%0A`;
  mensaje += `Nombre de quien recibe: ${nombre}%0A`;
  mensaje += `Dirección de entrega: ${direccion}%0A`;
  mensaje += `Teléfono de contacto: ${telefono}%0A`;
  mensaje += `Método de pago: ${tipoPago}`;

  const numeroWhatsApp = "573244164948";
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  window.open(url, "_blank");

  // Cierra el modal después de enviar
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalFormularioPedido")
  );
  modal.hide();
});
