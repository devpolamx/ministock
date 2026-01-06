# MiniStock API

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.44-red.svg" alt="Laravel 12.44">
  <img src="https://img.shields.io/badge/PHP-8.2+-blue.svg" alt="PHP 8.2+">
  <img src="https://img.shields.io/badge/SQLite-3.0+-orange.svg" alt="SQLite 3.0+">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License">
</p>

## 📋 Descripción

MiniStock API es el backend RESTful desarrollado con Laravel 12.44 que proporciona servicios para el sistema de gestión de inventario MiniStock. Ofrece endpoints completos para la gestión de usuarios, categorías, productos y autenticación.

## 🚀 Tecnologías Utilizadas

- **Laravel 12.44** - Framework PHP moderno y robusto
- **PHP 8.2+** - Lenguaje de programación con últimas características
- **SQLite 3.0+** - Base de datos embebida ligera y rápida
- **Composer** - Gestor de dependencias PHP
- **PHPUnit** - Framework de testing
- **Laravel Sanctum** - Autenticación API
- **Laravel Pint** - Formateador de código PHP
- **Laravel Sail** - Entorno de desarrollo Docker

## 🏗️ Arquitectura del Backend

### Patrón Arquitectónico

La API sigue el patrón **MVC (Model-View-Controller)** de Laravel con las siguientes capas adicionales:

- **Routes** - Definición de endpoints RESTful
- **Controllers** - Lógica de presentación y validación
- **Models** - Lógica de negocio y acceso a datos
- **Services** - Lógica de negocio reutilizable
- **Requests** - Validación de datos de entrada
- **Resources** - Transformación de respuestas API
- **Policies** - Autorización y permisos

### Estructura de Carpetas

```
app/
├── Http/
│   ├── Controllers/          # Controladores de API
│   │   ├── Api/
│   │   │   ├── V1/          # Versión 1 de la API
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── CategoryController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   └── UserController.php
│   │   └── Controller.php
│   ├── Middleware/           # Middlewares personalizados
│   ├── Requests/             # Validación de requests
│   │   ├── Api/
│   │   │   └── V1/
│   │   │       ├── StoreCategoryRequest.php
│   │   │       ├── UpdateCategoryRequest.php
│   │   │       ├── StoreProductRequest.php
│   │   │       └── UpdateProductRequest.php
│   └── Resources/            # Transformadores de API
│       ├── Api/
│       │   └── V1/
│       │       ├── CategoryResource.php
│       │       ├── ProductResource.php
│       │       └── UserResource.php
├── Models/                   # Modelos Eloquent
│   ├── User.php
│   ├── Category.php
│   └── Product.php
├── Policies/                 # Políticas de autorización
│   ├── CategoryPolicy.php
│   ├── ProductPolicy.php
│   └── UserPolicy.php
├── Services/                 # Servicios de negocio
│   ├── AuthService.php
│   ├── CategoryService.php
│   ├── ProductService.php
│   └── UserService.php
├── Providers/
│   └── AppServiceProvider.php
└── Console/Commands/         # Comandos Artisan personalizados

config/                       # Configuraciones
database/                     # Migraciones, seeders, factories
routes/
├── api.php                   # Rutas de API
└── web.php                   # Rutas web (opcional)

tests/
├── Feature/                  # Tests de integración
│   ├── Api/
│   │   └── V1/
│   │       ├── AuthTest.php
│   │       ├── CategoryTest.php
│   │       ├── ProductTest.php
│   │       └── UserTest.php
└── Unit/                     # Tests unitarios
```

## 📊 Modelos y Base de Datos

### Modelos Principales

#### User Model
```php
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // 'admin' | 'user'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relaciones
    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
```

#### Category Model
```php
class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'user_id',
    ];

    // Relaciones
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
```

#### Product Model
```php
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category_id',
        'user_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    // Relaciones
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
```

### Migraciones

```php
// database/migrations/0001_01_01_000000_create_users_table.php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->enum('role', ['admin', 'user'])->default('user');
    $table->rememberToken();
    $table->timestamps();
});

// database/migrations/0001_01_01_000001_create_categories_table.php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->timestamps();
});

// database/migrations/0001_01_01_000002_create_products_table.php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->decimal('price', 10, 2);
    $table->integer('stock')->default(0);
    $table->foreignId('category_id')->constrained()->onDelete('cascade');
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->timestamps();
});
```

## 🔐 Autenticación y Autorización

### Laravel Sanctum

La API utiliza **Laravel Sanctum** para autenticación stateless:

```php
// config/sanctum.php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,127.0.0.1')),
'expiration' => null, // Tokens sin expiración
```

### Endpoints de Autenticación

```php
// routes/api.php
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
```

### Políticas de Autorización

```php
// app/Policies/CategoryPolicy.php
class CategoryPolicy
{
    public function view(User $user, Category $category): bool
    {
        return $user->id === $category->user_id;
    }

    public function update(User $user, Category $category): bool
    {
        return $user->id === $category->user_id;
    }

    public function delete(User $user, Category $category): bool
    {
        return $user->id === $category->user_id;
    }
}
```

## 🌐 API Endpoints

### Base URL
```
http://localhost:8000/api/v1
```

### Autenticación
```
POST   /login          - Iniciar sesión
POST   /register       - Registrar usuario
POST   /logout         - Cerrar sesión
GET    /user           - Obtener usuario autenticado
```

### Categorías
```
GET    /categories     - Listar categorías (con paginación)
POST   /categories     - Crear categoría
GET    /categories/{id} - Obtener categoría específica
PUT    /categories/{id} - Actualizar categoría
DELETE /categories/{id} - Eliminar categoría
```

### Productos
```
GET    /products       - Listar productos (con paginación y filtros)
POST   /products       - Crear producto
GET    /products/{id}  - Obtener producto específico
PUT    /products/{id}  - Actualizar producto
DELETE /products/{id}  - Eliminar producto
```

### Usuarios (Solo Admin)
```
GET    /users          - Listar usuarios
GET    /users/{id}     - Obtener usuario específico
PUT    /users/{id}     - Actualizar usuario
DELETE /users/{id}     - Eliminar usuario
```

## 📝 Validación de Datos

### Request Classes

```php
// app/Http/Requests/Api/V1/StoreCategoryRequest.php
class StoreCategoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la categoría es obligatorio.',
            'name.max' => 'El nombre no puede exceder los 255 caracteres.',
        ];
    }
}
```

## 🔄 Servicios de Lógica de Negocio

### Patrón Service Layer

```php
// app/Services/CategoryService.php
class CategoryService
{
    public function create(array $data, User $user): Category
    {
        return $user->categories()->create($data);
    }

    public function update(Category $category, array $data): Category
    {
        $category->update($data);
        return $category->fresh();
    }

    public function delete(Category $category): bool
    {
        return $category->delete();
    }
}
```

## 🧪 Testing

### Tests de Feature (Integración)

```php
// tests/Feature/Api/V1/CategoryTest.php
class CategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_category()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/categories', [
                'name' => 'Electrónicos',
                'description' => 'Productos electrónicos',
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'description',
                    'created_at',
                ],
            ]);
    }
}
```

### Tests Unitarios

```php
// tests/Unit/Services/CategoryServiceTest.php
class CategoryServiceTest extends TestCase
{
    public function test_can_create_category()
    {
        $user = User::factory()->create();
        $service = new CategoryService();

        $category = $service->create([
            'name' => 'Test Category',
            'description' => 'Test Description',
        ], $user);

        $this->assertInstanceOf(Category::class, $category);
        $this->assertEquals('Test Category', $category->name);
        $this->assertEquals($user->id, $category->user_id);
    }
}
```

## ⚙️ Configuración y Variables de Entorno

### Archivo .env

```env
APP_NAME=MiniStock
APP_ENV=local
APP_KEY=base64:your-app-key
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database/database.sqlite

SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1
```

## 🔧 Scripts y Comandos

### Comandos Artisan Disponibles

```bash
# Servidor de desarrollo
php artisan serve

# Migraciones
php artisan migrate
php artisan migrate:fresh
php artisan migrate:rollback

# Seeders
php artisan db:seed
php artisan db:seed --class=DatabaseSeeder

# Testing
php artisan test
php artisan test --filter=CategoryTest

# Caché
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Limpieza
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Formateo de código
./vendor/bin/pint

# Generar documentación de rutas
php artisan route:list --path=api
```

### Laravel Sail (Docker)

```bash
# Iniciar servicios
./vendor/bin/sail up

# Ejecutar comandos en contenedor
./vendor/bin/sail artisan migrate
./vendor/bin/sail composer install
./vendor/bin/sail test
```

## 📦 Dependencias

### Composer Dependencies

```json
{
    "require": {
        "php": "^8.2",
        "laravel/framework": "^12.44",
        "laravel/sanctum": "^4.0",
        "laravel/tinker": "^2.9"
    },
    "require-dev": {
        "fakerphp/faker": "^1.23",
        "laravel/pint": "^1.13",
        "laravel/sail": "^1.26",
        "mockery/mockery": "^1.6",
        "nunomaduro/collision": "^8.0",
        "phpunit/phpunit": "^11.0.1"
    }
}
```

## 🚀 Despliegue

### Requisitos del Servidor

- **PHP 8.2+**
- **Composer**
- **SQLite 3.0+** (viene incluido con PHP)
- **Node.js** (para assets, opcional)
- **Redis** (para cache y sesiones, opcional)

### Pasos de Despliegue

```bash
# 1. Instalar dependencias
composer install --optimize-autoloader --no-dev

# 2. Configurar entorno
cp .env.example .env
php artisan key:generate

# 3. Configurar base de datos
# SQLite: El archivo database.sqlite se crea automáticamente
touch database/database.sqlite
php artisan migrate --seed
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 4. Configurar permisos
chmod -R 755 storage
chmod -R 755 bootstrap/cache

# 5. Reiniciar servicios
php artisan queue:restart
```

## 🔒 Seguridad

### Medidas Implementadas

- **Autenticación JWT-like** con Laravel Sanctum
- **Validación de datos** en todas las entradas
- **Autorización basada en políticas** (Policy-based)
- **Rate limiting** en rutas de API
- **CORS configurado** para frontend
- **Protección CSRF** en rutas web
- **Encriptación de contraseñas** con bcrypt

### Configuración CORS

```php
// config/cors.php
'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1:3000'],
'allowed_headers' => ['*'],
'allowed_methods' => ['*'],
'supports_credentials' => true,
```

## 📊 Monitoreo y Logs

### Configuración de Logs

```php
// config/logging.php
'channels' => [
    'single' => [
        'driver' => 'single',
        'path' => storage_path('logs/laravel.log'),
        'level' => env('LOG_LEVEL', 'debug'),
    ],
    'daily' => [
        'driver' => 'daily',
        'path' => storage_path('logs/laravel.log'),
        'level' => env('LOG_LEVEL', 'debug'),
        'days' => 14,
    ],
],
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Usa **Laravel Pint** para formateo: `./vendor/bin/pint`
- Ejecuta tests antes de push: `php artisan test`
- Sigue **PSR-12** para estilo de código
- Documenta métodos públicos con PHPDoc

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](../LICENSE) para más detalles.
