import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

// Adjusted speed
const SPEED = 0.05 // Reduced the speed to make it easier
// Increased min and max time to spawn obstacles
const OBSTACLE_INTERVAL_MIN = 1000 // Increased min interval to 1 second
const OBSTACLE_INTERVAL_MAX = 3000 // Increased max interval to 3 seconds
// World element reference
const worldElem = document.querySelector("[data-game]")

let nextObstacleTime

export function setupObstacle() {
  nextObstacleTime = OBSTACLE_INTERVAL_MIN
  document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
    obstacle.remove()
  })
}

export function updateObstacle(delta, speedScale) {
  document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
    incrementCustomProperty(obstacle, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(obstacle, "--left") <= -100) {
      obstacle.remove()
    }
  })

  if (nextObstacleTime <= 0) {
    createObstacle()
    nextObstacleTime =
      randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
  }
  nextObstacleTime -= delta
}

export function getObstacleRects() {
  return [...document.querySelectorAll("[data-obstacle]")].map(obstacle => {
    return obstacle.getBoundingClientRect()
  })
}

function createObstacle() {
  const obstacle = document.createElement("img")
  obstacle.dataset.obstacle = true
  obstacle.src = "imgs/obstacle.png"
  obstacle.classList.add("obstacle")
  setCustomProperty(obstacle, "--left", 100)
  worldElem.append(obstacle)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
