// Mi lista de productos
const productos = {
  dulcesLeche: [
    {
      nombre: "Dulce de coco (Media libra)",
      precio: 15000,
      imagen: "./src/img/coco1.webp",
      descripcion:
        "Sabor tropical suave y aromático, ideal para disfrutar en cualquier ocasión.",
    },
    {
      nombre: "Dulce de coco (1 libra)",
      precio: 28000,
      imagen: "./src/img/coco1.webp",
      descripcion:
        "Sabor tropical suave y aromático, ideal para disfrutar en cualquier ocasión.",
    },
    {
      nombre: "Dulce de guandú (Media libra)",
      precio: 15000,
      imagen: "./src/img/guandu1.jpg",
      descripcion:
        "Un clásico costero, cremoso y lleno de tradición en cada bocado.",
    },
    {
      nombre: "Dulce de guandú (1 libra)",
      precio: 28000,
      imagen: "./src/img/guandu1.jpg",
      descripcion:
        "Un clásico costero, cremoso y lleno de tradición en cada bocado.",
    },
    {
      nombre: "Dulce de Ñame (Media libra)",
      precio: 15000,
      imagen: "./src/img/ñame.webp",
      descripcion:
        "Suave y delicioso, con un toque de canela que te recuerda a la costa.",
    },
    {
      nombre: "Dulce de Ñame (1 libra)",
      precio: 28000,
      imagen: "./src/img/ñame.webp",
      descripcion:
        "Suave y delicioso, con un toque de canela que te recuerda a la costa.",
    },
    {
      nombre: "Dulce de Leche cortada (Media libra)",
      precio: 15000,
      imagen: "./src/img/leche-cortada.jpg",
      descripcion:
        "Cremoso y suave, el dulce de leche es el manjar perfecto para cualquier momento",
    },
    {
      nombre: "Dulce de Leche cortada (1 libra)",
      precio: 28000,
      imagen: "./src/img/leche-cortada.jpg",
      descripcion:
        "Cremoso y suave, el dulce de leche es el manjar perfecto para cualquier momento",
    },
  ],
  dulcesBasicos: [
    {
      nombre: "Dulce de Papaya verde (Media libra)",
      precio: 13000,
      imagen: "./src/img/papaya1.jpg",
      descripcion:
        "Fresco y delicadamente dulce, con la esencia de la papaya verde.",
    },
    {
      nombre: "Dulce de Papaya verde (1 libra)",
      precio: 25000,
      imagen: "./src/img/papaya1.jpg",
      descripcion:
        "Fresco y delicadamente dulce, con la esencia de la papaya verde.",
    },
    {
      nombre: "Dulce de Piña con coco (Media libra)",
      precio: 13000,
      imagen: "./src/img/cocoPiña1.jpg",
      descripcion:
        "Una mezcla irresistible de piña y coco, para un sabor tropical único.",
    },
    {
      nombre: "Dulce de Piña con coco (1 libra)",
      precio: 25000,
      imagen: "./src/img/cocoPiña1.jpg",
      descripcion:
        "Una mezcla irresistible de piña y coco, para un sabor tropical único.",
    },
    {
      nombre: "Dulce de Mango (Media libra)",
      precio: 13000,
      imagen: "./src/img/mango1.jpeg",
      descripcion:
        "El equilibrio perfecto entre dulce y ácido, con un toque refrescante.",
    },
    {
      nombre: "Dulce de Mango (1 libra)",
      precio: 25000,
      imagen: "./src/img/mango1.jpeg",
      descripcion:
        "El equilibrio perfecto entre dulce y ácido, con un toque refrescante.",
    },
  ],
  dulcesExoticos: [
    {
      nombre: "Jalea de Tamarindo (Media libra)",
      precio: 15000,
      imagen: "./src/img/tamarindoFruta.webp",
      descripcion:
        "Un sabor ácido y dulce que refresca el paladar con cada bocado.",
    },
    {
      nombre: "Jalea de Tamarindo (1 libra)",
      precio: 28000,
      imagen: "./src/img/tamarindoFruta.webp",
      descripcion:
        "Un sabor ácido y dulce que refresca el paladar con cada bocado.",
    },
  ],
};

// Agrega producto al carrito
function agregarAlCarrito(categoria, index) {
  const producto = productos[categoria][index];
  const inputCantidad = document.getElementById(
    `cantidad-${categoria}-${index}`
  );
  let cantidad = parseInt(inputCantidad.value);

  if (isNaN(cantidad) || cantidad <= 0) cantidad = 1;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoExistente = carrito.find(
    (item) => item.nombre === producto.nombre
  );

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    const productoConCantidad = { ...producto, cantidad };
    carrito.push(productoConCantidad);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  mostrarModalProductoAgregado({ nombre: producto.nombre });
}

// Actualiza el contador del carrito
function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length > 0) {
    contador.style.display = "inline-block";
    contador.textContent = carrito.reduce(
      (sum, item) => sum + item.cantidad,
      0
    );
  } else {
    contador.style.display = "none";
  }
}

function ajustarCantidad(categoria, index, cambio) {
  const inputCantidad = document.getElementById(
    `cantidad-${categoria}-${index}`
  );
  let cantidad = parseInt(inputCantidad.value, 10);

  if (isNaN(cantidad)) cantidad = 1;
  cantidad = Math.max(1, cantidad + cambio);
  inputCantidad.value = cantidad;
}

// Muestra el modal del producto agregado
function mostrarModalProductoAgregado(producto) {
  const mensaje = `${producto.nombre} agregado al carrito.`;
  document.getElementById("modalMensaje").textContent = mensaje;

  const modal = new bootstrap.Modal(
    document.getElementById("modalProductoAgregado")
  );
  modal.show();
}

// Renderiza productos por categoría
function renderProductos() {
  const renderCategoria = (categoria, contenedorId) => {
    const contenedor = document.getElementById(contenedorId);
    productos[categoria].forEach((item, index) => {
      const card = `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <img src="${item.imagen}" class="card-img-top" alt="${
        item.nombre
      }" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="text-center">
                <h5 class="card-title">${item.nombre}</h5>
                <p class="card-text">${item.descripcion}</p>
                <p class="fw-bold text-primary">$${item.precio.toLocaleString()} COP</p>
              </div>
              <div class="d-flex flex-column align-items-center gap-3 mt-3">
                <label for="cantidad-${categoria}-${index}" class="fw-bold">Cantidad:</label>
                <div class="d-flex justify-content-center align-items-center gap-2 w-100">
                  <button class="btn btn-outline-primary btn-sm" onclick="ajustarCantidad('${categoria}', ${index}, -1)">–</button>
                  <input type="number" min="1" value="1" class="form-control form-control-sm cantidad-input" id="cantidad-${categoria}-${index}" style="width: 80px;">
                  <button class="btn btn-outline-primary btn-sm" onclick="ajustarCantidad('${categoria}', ${index}, 1)">+</button>
                </div>
                <button class="btn btn-primary btn-sm mt-2" onclick="agregarAlCarrito('${categoria}', ${index})">
                  <i class="bi bi-cart-plus"></i> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      contenedor.innerHTML += card;
    });
  };

  renderCategoria("dulcesLeche", "dulcesLeche");
  renderCategoria("dulcesBasicos", "dulcesBasicos");
  renderCategoria("dulcesExoticos", "dulcesExoticos");
}

// Inicializa todo cuando carga el DOM
document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  renderProductos();
});
