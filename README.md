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
├── restaurant-app/                    # Frontend React + TypeScript
│   ├── src/
│   │   ├── pages/
│   │   │   ├── cliente/
│   │   │   │   ├── MesaView.tsx      # Unirse a mesa (escaneo QR)
│   │   │   │   ├── MenuView.tsx       # Ver menú y hacer pedidos
│   │   │   │   └── CheckoutView.tsx   # División de cuenta
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.tsx      # Métricas y overview
│   │   │   │   ├── MesasPanel.tsx     # Gestión de mesas
│   │   │   │   ├── MenuPanel.tsx      # CRUD menú
│   │   │   │   ├── ReportesView.tsx   # Reportes y analytics
│   │   │   │   └── ConfigView.tsx     # Configuración
│   │   │   ├── mesero/
│   │   │   │   ├── BoletaView.tsx     # Boleta electrónica
│   │   │   │   └── MesasStatus.tsx    # Estado de mesas
│   │   │   └── cocina/
│   │   │       └── KitchenDisplay.tsx # Display órdenes cocina
│   │   ├── components/
│   │   │   ├── shared/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Card.tsx
│   │   │   ├── cliente/
│   │   │   │   ├── UserList.tsx       # Lista usuarios en mesa
│   │   │   │   ├── PedidoItem.tsx     # Item de pedido
│   │   │   │   └── MenuCard.tsx       # Tarjeta de item menú
│   │   │   └── admin/
│   │   │       ├── MesaCard.tsx       # Tarjeta de mesa
│   │   │       ├── MenuItemForm.tsx   # Form crear/editar items
│   │   │       └── Chart.tsx          # Gráficos reportes
│   │   ├── hooks/
│   │   │   ├── useWebSocket.ts        # WebSocket client
│   │   │   ├── useAuth.ts             # Autenticación
│   │   │   └── useRealtime.ts         # Real-time updates
│   │   ├── services/
│   │   │   ├── api.ts                 # Axios config base
│   │   │   ├── authService.ts         # Login/logout
│   │   │   ├── mesaService.ts         # API mesas
│   │   │   ├── pedidoService.ts       # API pedidos
│   │   │   └── adminService.ts        # API admin
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx        # Context autenticación
│   │   │   └── MesaContext.tsx        # Context mesa activa
│   │   ├── utils/
│   │   │   ├── formatters.ts          # Formateo precios, fechas
│   │   │   └── validators.ts          # Validaciones
│   │   └── types/
│   │       ├── Mesa.ts
│   │       ├── Pedido.ts
│   │       └── Usuario.ts
│   ├── public/
│   └── package.json
│
└── restaurant-backend/                # Backend NestJS + TypeScript
    ├── src/
    │   ├── auth/
    │   │   ├── auth.module.ts
    │   │   ├── auth.controller.ts
    │   │   ├── auth.service.ts
    │   │   ├── strategies/
    │   │   │   └── jwt.strategy.ts
    │   │   ├── guards/
    │   │   │   ├── jwt.guard.ts
    │   │   │   └── roles.guard.ts
    │   │   └── decorators/
    │   │       └── roles.decorator.ts
    │   ├── usuarios/
    │   │   ├── usuarios.module.ts
    │   │   ├── usuarios.controller.ts
    │   │   └── usuarios.service.ts
    │   ├── mesa/
    │   │   ├── mesa.module.ts
    │   │   ├── mesa.controller.ts       # CRUD mesas
    │   │   ├── mesa.service.ts
    │   │   ├── mesa.gateway.ts          # WebSocket real-time
    │   │   └── dto/
    │   │       ├── create-mesa.dto.ts
    │   │       └── update-mesa.dto.ts
    │   ├── pedido/
    │   │   ├── pedido.module.ts
    │   │   ├── pedido.controller.ts
    │   │   ├── pedido.service.ts
    │   │   ├── cocina.gateway.ts        # WebSocket cocina
    │   │   └── dto/
    │   │       └── create-pedido.dto.ts
    │   ├── menu/
    │   │   ├── menu.module.ts
    │   │   ├── menu.controller.ts
    │   │   ├── menu.service.ts
    │   │   └── dto/
    │   │       └── create-menu-item.dto.ts
    │   ├── admin/
    │   │   ├── admin.module.ts
    │   │   ├── dashboard.controller.ts  # Métricas
    │   │   ├── dashboard.service.ts
    │   │   └── config.controller.ts     # Configuración
    │   ├── reportes/
    │   │   ├── reportes.module.ts
    │   │   ├── reportes.controller.ts
    │   │   └── reportes.service.ts
    │   ├── common/
    │   │   ├── filters/
    │   │   │   └── http-exception.filter.ts
    │   │   ├── interceptors/
    │   │   │   └── logging.interceptor.ts
    │   │   └── pipes/
    │   │       └── validation.pipe.ts
    │   ├── app.module.ts
    │   └── main.ts
    │
    ├── prisma/
    │   ├── schema.prisma                # Database schema
    │   ├── seed.ts                      # Seed data inicial
    │   └── migrations/
    │
    ├── test/
    │   └── e2e/
    │
    └── package.json


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
