const { Engine, Render, Runner, World, Bodies } = Matter;

const cells  = 3;
const width  = 600;
const height = 600;

const engine    = Engine.create();
const { world } = engine;
const render    = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width,
    height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls  (units over, units down, units wide, units tall)
// (top, bottom, lside, rside)
const walls = [
  Bodies.rectangle(width/2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width/2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height/2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height/2, 40, height, { isStatic: true }),
];
World.add(world, walls);

// Maze Generation

const shuffle = (arr) => {
  let counter = arr.length;
  while(counter > 0){
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};


const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));

const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false))
const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false))

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const platTrajectory = (row, column) => {
  //If visited the cell at [row, column] return
  if(grid[row][column]){
    return
  }
  // Mark this cell as being visited
  grid[row][column] = true;
  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row-1, column, 'up'],
    [row, column+1, 'right'],
    [row+1, column, 'down'],
    [row, column-1, 'left']
  ]);
  // For each neighbor ... See if neighbor is out of bounds
  for(let neighbor of neighbors){
    const [nextRow, nextColumn, direction] = neighbor;
    if(nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells){
      continue;
    }
    // If this neighbor visited, continue to the next
    if(grid[nextRow][nextColumn]){
      continue;
    }
    // Remove a wall from either horizontals or verticals
    if (direction === 'left'){
      verticals[row][column-1] = true;
    } else if (direction === 'right'){
      verticals[row][column] = true;
    } else if (direction === 'up'){
      horizontals[row-1][column] = true;
    } else if (direction === 'down'){
      horizontals[row][column] = true;
    }
    platTrajectory(nextRow, nextColumn);
  }
};

platTrajectory(startRow, startColumn);

console.log(grid);
