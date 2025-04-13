function renderCarrito() {
  const contenedor = document.getElementById("carritoContainer");
  const totalEl = document.getElementById("totalPrecio");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach((item, idx) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${item.imagen}" class="card-img-top" style="height: 200px; object-fit: cover;" />
          <div class="card-body text-center">
            <h5 class="card-title">${item.nombre}</h5>
            <p>Cantidad: ${item.cantidad}</p>
            <p>$${subtotal}</p>
            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${idx})">Eliminar</button>
          </div>
        </div>
      </div>
    `;
  });

  totalEl.textContent = `Total: $${total}`;
}

function eliminarProducto(idx) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(idx, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}

document.addEventListener("DOMContentLoaded", renderCarrito);

/* al presionar btn proceder pago - direccionar a wsap */
document
  .getElementById("btnProcederPago")
  .addEventListener("click", function () {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    let mensaje =
      "¡Hola! Me gustaría hacer un pedido de los siguientes dulces:%0A%0A";

    let total = 0;

    carrito.forEach((producto, index) => {
      mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio}%0A`;
      total += producto.precio;
    });

    mensaje += ` Total: $${total}`;
    mensaje += ` Dirección: _______________________ Teléfono: _______________________`;

    // Número de WhatsApp con código de país (ej: +57 para Colombia)
    const numeroWhatsApp = "573244164948"; // reemplázalo por el número real

    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(url, "_blank");
  });
