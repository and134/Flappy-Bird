function Bird(height, width) {
    let x = height / 6;
    let y = width / 2;
    let size = 20;
    fill(200, 200, 200);
    ellipse(x, y, size, size);
  }

  function pause(gs) {
    if (keyIsDown(UP_ARROW)) {
      gs.running = !gs.running
     // console.log(gs.running);
    }
  }




  if(frameCount % 10 === 0){
    gameState.pipes.push(pipe(gameState));
  }
  for(let i = 0; i < gameState.pipes.length; i++){
    pipes[i].updatePipe(gameState);
  }




  // 30 cadre/secunda
// 1000 ms / 30 = 333ms frame
// 50px / secunda
// 50px * deltaTime / 1000

//   function pipe() {
//     let top = random(height / 2);
//     let bottom = height - (top + 50);
//     let x = width;
//     let speed = 1;
  
//     fill(36, 111, 25);
//     rect(x, 0, 20, top);
//     rect(x, height - bottom, 20, bottom);
//     x = x - speed;
//   }

  // if(pipe.x === height - (height / 5)){
  //   pipes.push[pipe];
  // }
  // pipe();

mmm
  /////////
/*
let a = 1
console.log(a)

{ 
  let a = 2
  console.log(a)
}

function foo() {
  let a = 3
  console.log(a)
}

function foo2() {
  a = 4
  console.log(a)
}

foo2()
console.log(a)
foo()

function moo(obj) {
  console.log(obj.a, obj.b)
  obj.b = 6
  obj = {a:3, b: 5}
  console.log(obj.a, obj.b)
}

let o = {a: 1, b: 2}
moo(o)
console.log(o.a, o.b)


let x = 1
function moo2(n) {
  console.log(n)
  n = 3
}

moo2(x)

function ggg(f) {
  f(2)
}

function mmm(n) {
  console.log(n)
}

ggg(mmm)

/////////////
arr = [1,2,3,4];

function print(arg, index) {
  console.log(arg, index);
}

for(let i = 0; i< arr.length; i++) {
  print(arr[i], i)
}

function each(iterable, fn) {
  for(let i = 0; i< iterable.length; i++) {
    fn(iterable[i], i)
  } 
}

each(arr, print)

[1,2,3,4].forEach(print)

function add2(n) {
  return n + 2
}

function sub2(n) {
  return n - 2
}

function greater2(n) {
  return n > 2
}
function smaller10(n) {
  return n < 10
}

function map(iterable, fn) {
  let result = []
  for(let i = 0; i< iterable.length; i++) {
    result.push(fn(iterable[i], i))
  } 
  return result
}

function filter(iterable, fn) {
  let result = []
  for(let i = 0; i< iterable.length; i++) {
    if (fn(iterable[i], i)) {
      result.push(fn(iterable[i], i))
    }
  } 
  return result
}

map(arr, add2)
map(arr, sub2)

map(filter(filter(arr, smaller10), greater2), sub2)
filter(filter(map(arr, sub2), greater2), smaller10)

function compose(arr, fns) {
  for (let i = 0; i < fns.length; i++) {
    arr = fns(arr, fns[i])
  }
  return arr
}

compose(arr, [greater2, smaller10, sub2])
*/