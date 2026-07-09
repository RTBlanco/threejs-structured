# Three.js Structured

A learning project for experimenting with [Three.js](https://threejs.org/) while exploring a clean, reusable way to organize a browser-based 3D project.

The structure is currently game-development oriented: a central manager owns the renderer, scene, camera, and update loop, while individual scene objects are kept in separate classes. The main goal is to learn Three.js and refine the architecture as the project grows—not to provide a finished game engine or production-ready template.

## Current demo

The scene currently includes:

- A perspective camera with orbit controls
- A directional light
- A checkerboard plane
- A movable sphere
- Responsive renderer sizing with a maximum pixel budget

Use the mouse to orbit the camera and the arrow keys to move the sphere.

## Project structure

```text
.
├── public/             # Static files served by Vite
├── src/
│   ├── main.js         # Application entry point and animation loop
│   ├── Manager.js      # Renderer, scene, camera, objects, and updates
│   ├── Camera.js       # Perspective camera setup
│   ├── Light.js        # Scene lighting
│   ├── Plane.js        # Checkerboard ground plane
│   ├── Sphere.js       # Sphere object and movement controls
│   └── style.css       # Full-screen canvas styles
├── index.html
└── package.json
```

Each scene object exposes an `update()` method so behavior can be run from the central animation loop. This keeps object-specific setup and logic separate from rendering and scene management.

## Getting started

### Requirements

- [Node.js](https://nodejs.org/)
- npm

### Installation

```bash
git clone https://github.com/RTBlanco/threejs-structured.git
cd threejs-structured
npm install
npm run dev
```

Open the local URL printed by Vite.

## Available scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

## Learning goals

- Become comfortable with Three.js scenes, cameras, lights, geometry, materials, and rendering
- Build a maintainable project structure instead of keeping the entire scene in one file
- Explore a game-style update loop and object lifecycle
- Learn how input, animation, and scene management fit together
- Evolve the structure through experimentation

## Inspiration

The organization is influenced by:

- My [`py_pong`](https://github.com/RTBlanco/py_pong) project
- Pierfrancesco Soffritti's [`14_ThreejsTemplate`](https://github.com/PierfrancescoSoffritti/doodles/tree/master/14_ThreejsTemplate)

This repository is intentionally a work in progress and will change as I learn more about Three.js and game-oriented architecture.

## My Notes

- I noticed that its better sepreate concerns and only have things worry about its immediate 
