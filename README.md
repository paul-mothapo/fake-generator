## Getting Started

1. **Clone the Repository**  
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Create a New Branch**  
   Use a descriptive branch name for your feature or fix, e.g.,  
   ```bash
   git checkout -b feat/button
   ```

3. **Start the Development Server**  
   Run one of the following commands:  
   ```bash
   npm run dev    # Using npm  
   yarn dev       # Using Yarn  
   pnpm dev       # Using pnpm  
   bun dev        # Using Bun  
   ```

4. **Open in Your Browser**  
   Visit [http://localhost:3000](http://localhost:3000) to see the application in action.

5. **Submitting a Pull Request**  
   Only submit pull requests to the **pre-prod** branch.

## Docker Deployment

### Using Docker

1. **Build the Docker Image**
   ```bash
   docker build -t fake-generator .
   ```

2. **Run the Container**
   ```bash
   docker run -p 3000:3000 fake-generator
   ```

3. **Access the Application**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Using Docker Compose

1. **Start the Application**
   ```bash
   docker-compose up -d
   ```

2. **Stop the Application**
   ```bash
   docker-compose down
   ```

### Development with Docker

For development with hot-reloading:

```bash
docker-compose -f docker-compose.dev.yml up
```
