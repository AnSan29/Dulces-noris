const productos = {
  dulcesLeche: [
    {
      nombre: "Dulce de coco (Media libra)",
      precio: 12000,
      imagen: "./src/img/coco1.webp",
      descripcion:
        "Sabor tropical suave y aromático, ideal para disfrutar en cualquier ocasión.",
    },
    {
      nombre: "Dulce de coco (1 libra)",
      precio: 22000,
      imagen: "./src/img/coco1.webp",
      descripcion:
        "Sabor tropical suave y aromático, ideal para disfrutar en cualquier ocasión.",
    },
    {
      nombre: "Dulce de guandú (Media libra)",
      precio: 12000,
      imagen: "./src/img/guandu1.jpg",
      descripcion:
        "Un clásico costero, cremoso y lleno de tradición en cada bocado.",
    },
    {
      nombre: "Dulce de guandú (1 libra)",
      precio: 22000,
      imagen: "./src/img/guandu1.jpg",
      descripcion:
        "Un clásico costero, cremoso y lleno de tradición en cada bocado.",
    },
    {
      nombre: "Dulce de Ñame (Media libra)",
      precio: 12000,
      imagen: "./src/img/ñame.webp",
      descripcion:
        "Suave y delicioso, con un toque de canela que te recuerda a la costa.",
    },
    {
      nombre: "Dulce de Ñame (1 libra)",
      precio: 22000,
      imagen: "./src/img/ñame.webp",
      descripcion:
        "Suave y delicioso, con un toque de canela que te recuerda a la costa.",
    },
    {
      nombre: "Dulce de Leche cortada (Media libra)",
      precio: 14000,
      imagen: "./src/img/leche-cortada.jpg",
      descripcion:
        "Cremoso y suave, el dulce de leche es el manjar perfecto para cualquier momento",
    },
    {
      nombre: "Dulce de Leche cortada (1 libra)",
      precio: 25000,
      imagen: "./src/img/leche-cortada.jpg",
      descripcion:
        "Cremoso y suave, el dulce de leche es el manjar perfecto para cualquier momento",
    },
  ],
  dulcesBasicos: [
    {
      nombre: "Dulce de Papaya verde (Media libra)",
      precio: 10000,
      imagen: "./src/img/papaya1.jpg",
      descripcion:
        "Fresco y delicadamente dulce, con la esencia de la papaya verde.",
    },
    {
      nombre: "Dulce de Papaya verde (1 libra)",
      precio: 20000,
      imagen: "./src/img/papaya1.jpg",
      descripcion:
        "Fresco y delicadamente dulce, con la esencia de la papaya verde.",
    },
    {
      nombre: "Dulce de Piña con coco (Media libra)",
      precio: 10000,
      imagen: "./src/img/cocoPiña1.jpg",
      descripcion:
        "Una mezcla irresistible de piña y coco, para un sabor tropical único.",
    },
    {
      nombre: "Dulce de Piña con coco (1 libra)",
      precio: 20000,
      imagen: "./src/img/cocoPiña1.jpg",
      descripcion:
        "Una mezcla irresistible de piña y coco, para un sabor tropical único.",
    },
    {
      nombre: "Dulce de Mango (Media libra)",
      precio: 10000,
      imagen: "./src/img/mango1.jpeg",
      descripcion:
        "El equilibrio perfecto entre dulce y ácido, con un toque refrescante.",
    },
    {
      nombre: "Dulce de Mango (1 libra)",
      precio: 20000,
      imagen: "./src/img/mango1.jpeg",
      descripcion:
        "El equilibrio perfecto entre dulce y ácido, con un toque refrescante.",
    },
  ],
  dulcesExoticos: [
    {
      nombre: "Jalea de Tamarindo (Media libra)",
      precio: 10000,
      imagen: "./src/img/tamarindoFruta.webp",
      descripcion:
        "Un sabor ácido y dulce que refresca el paladar con cada bocado.",
    },
    {
      nombre: "Jalea de Tamarindo (1 libra)",
      precio: 20000,
      imagen: "./src/img/tamarindoFruta.webp",
      descripcion:
        "Un sabor ácido y dulce que refresca el paladar con cada bocado.",
    },
  ],
};

function agregarAlCarrito(categoria, index) {
  const producto = productos[categoria][index];
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoExistente = carrito.find(
    (item) => item.nombre === producto.nombre
  );

  if (productoExistente) {
    // Si el producto ya existe, incrementa la cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si el producto no existe, lo agrega con cantidad 1
    producto.cantidad = 1;
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} agregado al carrito.`);
}

function renderProductos() {
  // Función para renderizar los productos de cada categoría
  const renderCategoria = (categoria, contenedorId) => {
    const contenedor = document.getElementById(contenedorId);
    productos[categoria].forEach((item, index) => {
      const card = `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow">
            <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}" style="height: 200px; object-fit: cover;">
            <div class="card-body text-center">
              <h5 class="card-title">${item.nombre}</h5>
              <p class="card-text">${item.descripcion}</p>
              <p class="fw-bold text-primary">$${item.precio}</p>
              <button class="btn btn-outline-primary" onclick="agregarAlCarrito('${categoria}', ${index})">Agregar al Carrito</button>
            </div>
          </div>
        </div>
      `;
      contenedor.innerHTML += card;
    });
  };

  // Renderiza cada categoría de productos
  renderCategoria("dulcesLeche", "dulcesLeche");
  renderCategoria("dulcesBasicos", "dulcesBasicos");
  renderCategoria("dulcesExoticos", "dulcesExoticos");
}

document.addEventListener("DOMContentLoaded", renderProductos);
