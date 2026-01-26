# EasyCheckOut

Aplicación web para gestionar pedidos grupales y dividir cuentas en restaurantes de forma simple y en tiempo real.

## El Problema

Dividir la cuenta entre grupos personas grandes al final de una comida es caótico. Nadie recuerda quién pidió qué, el mesero tiene que hacer cálculos manuales, y el proceso toma demasiado tiempo.

## La Solución

Cada mesa tiene un QR único. Los comensales lo escanean, hacen sus pedidos desde el celular, y al final ven automáticamente cuánto debe cada uno. El mesero solo mira la boleta electrónica y cobra con su máquina habitual (GetNet, Mercado Pago, etc).

## Funcionalidades

- **Sesión por mesa**: Escaneo de QR para unirse a la mesa activa
- **Pedidos individuales**: Cada persona agrega sus items desde el menú digital
- **Sincronización en tiempo real**: Todos ven los pedidos actualizándose al instante
- **División automática**: Al finalizar, cada uno ve su subtotal claramente
- **Boleta para mesero**: Vista consolidada de toda la orden para procesar el pago

## Stack Técnico

- **Frontend**: React + TypeScript + Vite (PWA mobile-first)
- **Backend**: NestJS + WebSocket (real-time sync)
- **Database**: PostgreSQL + Redis (sessions)
- **Arquitectura**: Monorepo con npm workspaces

## Estructura del Proyecto

```

EasyCheckOut/
├── restaurant-app/ # Frontend
│ ├── pages/ # MesaView, MenuView, CheckoutView
│ ├── components/ # UserList, PedidoItem
│ ├── hooks/ # useWebSocket
│ └── services/ # API client
│
└── restaurant-backend/ # Backend
├── mesa/ # Gestión de mesas y usuarios
├── pedido/ # Gestión de pedidos
└── prisma/ # Database schema

```

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/JosephJMRG/easyCheckOut.git
cd easyCheckOut

# Instalar dependencias en la raíz del proyecto
npm install

# Instalar dependencias en el frontend (restaurant-app)
cd restaurant-app
npm install
cd ..

# Instalar dependencias en el backend (restaurant-backend)
cd restaurant-backend
npm install
cd ..

# Levantar servicios (PostgreSQL + Redis)
docker-compose -f docker-compose-qdrant.yml up -d

# Ejecutar backend y frontend
npm run dev
```

Backend en `http://localhost:3000` | Frontend en `http://localhost:5173`

## Roadmap

Ver [ROADMAP.md](./ROADMAP.md) para detalles del plan de desarrollo por fases.

**MVP Actual**: Sistema de sesiones, pedidos en tiempo real, y división básica de cuenta.

**Próximamente**: Integración de pagos, panel de administración, y soporte multi-restaurante.

## Licencia

MIT
