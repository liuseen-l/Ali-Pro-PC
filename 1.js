let a = 10

function test() {
  console.log(a);
  a--
  if (a === 0)
    clearInterval(timer)
}

let timer = setInterval(() => {
  console.log(a);
  a--
  if (a === 0)
    clearInterval(timer)
}, 200)