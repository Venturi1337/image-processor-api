# Image Processing API - Architectural Deep Dive

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

### Installation 

1. Clone the repositoy

```bash
git clone https://github.com/yourusername/image-processing-api.git
cd image-processing-api
```

2. Install dependencies

```bash
npm install
```

3. Start the application using Docker Compose
```bash
docker-compose up -d
```

4. Run the application in development mode
```bash
npm run start:dev
```

### 1. Domain Layer Organization

#### Task Domain

- **Core Entities**: `Task`, `TaskStatus`, `ITaskImage`
- **Value Objects**: Price calculation, image metadata
- **Domain Events**: TaskCreated, TaskCompleted, TaskFailed
- **Factory**: TaskFactory handles complex task creation with status and pricing logic

#### Image Domain

- **Core Entities**: `Image`, `ImageVariant`
- **Value Objects**: Resolution, path handling
- **Processing Rules**: Image transformation specifications
- **Factory**: ImageFactory manages variant creation and processing rules

### 2. Module Communication Flow

#### Task Creation Flow

1. `TaskController` receives HTTP request
2. `CreateTaskUseCase` orchestrates creation
3. `TaskFactory` generates new task
4. `TaskCreatedListener` emits event
5. `ImageProcessListener` catches event for processing

#### Image Processing Flow

1. `ImageProcessListener` receives task event
2. `ImageSourceFactory` determines source type (URL/File)
3. `ImageProcessingUseCase` orchestrates processing
4. `ImageProcessor` (Sharp/ImageMagick) processes image
5. `TaskCompletedListener` updates task status

### 3. Design Patterns Implementation

#### Repository Pattern

- **Base Repository**: Generic CRUD operations
- **Specialized Repositories**:
  - TaskMongoRepository
  - ImageMongoRepository
- **Benefits**: Database agnostic domain logic

#### Factory Pattern Usage

- **TaskFactory**: Task creation with business rules
- **ImageFactory**: Image variant generation
- **ImageSourceFactory**: Source type determination
- **Purpose**: Complex object creation encapsulation

#### Strategy Pattern

- **Image Processing**: Switchable processing engines
- **Image Source**: Multiple source handling strategies
- **Benefit**: Runtime algorithm switching

#### Bridge Pattern

- **Image Processing**: Separation of abstraction and implementation
- **Database Operations**: Repository implementations
- **Purpose**: Platform/implementation independence

### 4. Event-Driven Architecture

#### Event Flow

1. Task Creation → TaskCreated
2. Image Processing Start → ImageProcessStart
3. Image Processing Complete → ImageProcessComplete
4. Task Update → TaskCompleted

#### Event Handlers

- TaskCreatedListener
- ImageProcessListener
- TaskCompletedListener

### 5. Dependency Management

#### Injection Hierarchy

- Controllers → UseCases → Repositories
- Services → Factories → Adapters
- Events → Listeners → Processors

#### Port Abstractions

- ImageSourcePort
- ImageProcessorPort
- TaskRepositoryPort
- ImageRepositoryPort

### 6. Infrastructure Layer

#### Database Adapters

- MongoDB implementation
- Generic repository pattern
- Schema definitions

#### External Service Adapters

- URL image fetching
- File system operations
- Image processing libraries

### 7. Application Layer

#### Use Cases

- CreateTaskUseCase
- UpdateTaskUseCase
- GetTaskUseCase
- ImageProcessingUseCase

#### Services

- TaskService
- ImageProcessingService

### 8. Architectural Benefits

#### Modularity

- Independent module testing
- Swappable implementations
- Clear dependency boundaries

#### Maintainability

- Isolated business logic
- Clear module responsibilities
- Standardized error handling

#### Scalability

- Event-driven processing
- Async operations
- Modular growth capability

### 9. Testing Strategy

#### Unit Testing

- Domain logic isolation
- Use case validation
- Event handler testing

#### Integration Testing

- Module interaction verification
- Database operation testing
- Event flow validation

#### E2E Testing

- Complete flow validation
- API endpoint testing
- Image processing verification

### 10. Exception Handling

#### Global Exception Filter

- **Purpose**: Centralizes error handling across the application
- **Implementation**: `HttpExceptionFilter` catches all unhandled exceptions
- **Flow**:
  1. Exception occurs in any layer
  2. NestJS routes to global filter
  3. Filter transforms exception to consistent HTTP response

#### Exception Hierarchy

- **BaseException**: Custom base exception class
- **Domain Exceptions**: Business rule violations

#### Exception Response Format
