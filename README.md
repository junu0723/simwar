# SimWar Project

SimWar is a strategic game project utilizing a Node.js API server and a Python core server, built with Docker Compose for seamless deployment.

---

## Prerequisites

Ensure the following are installed on your machine before starting:

1. **Docker**  
   Install Docker from the [official website](https://www.docker.com/get-started).

2. **Docker Compose**  
   Docker Compose is included in Docker Desktop for macOS and Windows. For Linux, install it separately by following the [official guide](https://docs.docker.com/compose/install/).

3. (Optional for Local Development)
   - **Python (3.8 or higher)**  
     Install Python to run the core server locally.
   - **Node.js (16.x or higher)**  
     Required for the API server and client development.
   - **Make**  
     Typically pre-installed on macOS and Linux. If missing, install using your package manager.

---

## Getting Started

### 1. Initial Setup
Run the following command to set up the project:
```bash
make setup
```

### 2. Build and Run the Project
To build the Docker containers and start all services:
``` bash
make build
make up
```
### 3. Stop the Services

To stop all running services:
``` bash
make down
```
### 4. View Logs

To monitor logs from all services:
``` bash
make logs
```
---
## Local Development

For local development, you can set up the individual services:
- Python Core:
``` bash
make python-install
make python-run
```
- Node.js API:
``` bash
make node-install
make node-run
```
- Client:
``` bash
make client-install
make client-run
```
