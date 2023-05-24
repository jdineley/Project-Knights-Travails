// This problem is represented as an unweighted graph (each edge carries the same value = 1 move)
// Minimum steps would be found with a BFS

function chessBoard() {
    const rows = 7;
    const columns = 7;
    const board = [];
    const relativeConnections = [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]]
    
    for (let i = 0; i <= rows; i++) {
      board[i] = [];
      for (let j = 0; j <= columns; j++) {
        let coordinates = [i,j]
        let node = new Node(coordinates)
        board[i].push(node);
      }
    }
    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= columns; j++) {
        relativeConnections.forEach((el) => {
            let connectedCoord = [i+el[0], j+el[1]]
            
            if(connectedCoord[0] >= 0 && connectedCoord[0] <= 7 && connectedCoord[1] >= 0 && connectedCoord[1] <= 7){
                
                let connectingNode = board[i+el[0]][j+el[1]]
                board[i][j].makeConnections(connectingNode)
            }
        })
      }
    }
    return board
}

class Node {
    constructor(coordinates) {
        this.coordinates = coordinates
        this.connections = []
        this.distance = 0
        this.visited = false 
        this.path = []   
    }

    makeConnections(connectingNode) {
        this.connections.push(connectingNode)
    }
}


function knightsTravails(from, to) {
    const board = chessBoard()
    const root = board[from[0]][from[1]];
    const queue = [root];
    while(queue.length > 0) {
        if(queue[0].coordinates.toString() === to.toString()) {
            console.log(queue[0])
            return processResult(queue[0].distance, queue[0].path)
        }
        let target = queue.shift()
        target.connections.filter(cell => !cell.visited).forEach(cell => {
            cell.distance = target.distance + 1
            cell.visited = true
            cell.path = cell.path.concat(target.path, target.coordinates, cell.coordinates)
            queue.push(cell);
        })
    }
}

function processResult(dist, path) {
    let pathFormatted = []
    for(let i = 0; i < path.length; i+=2) {
        pathFormatted.push([path[i], path[i+1]])
    } 
      console.log(`Shortest route takes: ${dist} steps.  Here's your path:`)
      pathFormatted.forEach(coord => console.log(coord))
}

knightsTravails([0,0],[7,7])



