const buttonAuth = document.querySelector('.auth')
const list = document.querySelector('.list')
const listDrop = document.querySelector('.list-drop')
const dropZone = document.querySelector('.drop-zone')
const buttonShowConsole = document.querySelector('.console');

let token = window.location.hash
const arr = [];


function createCard(first, last, photo, index) {

  const elem = document.createElement('li');
  elem.classList.add('card-wrapper', 'card', 'w-100', 'mb-1')

  elem.innerHTML = `
          <div class="row g-0">
            <div class="col-md-3">
              <img src=${photo} class="h-100 img-fluid rounded-start" alt=${first}>
            </div>
            <div class="col-md-8"
              <div class="card-body">
                <h5 class="card-title">${first} ${last}</h5>
              </div>
            </div>
          </div>
`;
  elem.setAttribute('draggable', 'true')
  elem.setAttribute('data-item', `${index}`)

  list.append(elem);
}


function showResult(result) {

  const { items } = result.response;

  for (let i = 0; i < items.length; i++) {
    createCard(items[i].first_name, items[i].last_name, items[i].photo_50, i)
  }

  drag();

  if (result) {
    buttonAuth.style.display = 'none'
  }

}

const getUser = async (token) => {
  let script = document.createElement('script');
  script.src = `https://api.vk.com/method/friends.get?${token}&fields=nickname,photo_50&callback=showResult&v=5.131`;
  document.getElementsByTagName("head")[0].appendChild(script);
}

buttonAuth.addEventListener('click', () => {
  window.location.href = "https://oauth.vk.com/authorize?client_id=8135091&display=popup&redirect_uri=http://xn--d1abbk1anim.xn--p1ai/test-vk/&scope=friends&response_type=token&v=5.131";

})

if (token.length !== 0) {

  for (let i = 1; i < token.length; i++) {
    if (token[i] != '&') {
      arr.push(token[i])
    } else {
      getUser(arr.join(''));
      break
    }
  }
}


let dragItems;
let itemDrag = null;

function drag() {

  dragItems = document.querySelectorAll('.card-wrapper')

  dragItems.forEach(el => {
    el.addEventListener('dragstart', handlerDragStart);
    el.addEventListener('dragend', handlerDragEnd)
  })

  dropZone.addEventListener('dragenter', handlerDragEnter)
  dropZone.addEventListener('dragover', handlerDragOver)
  dropZone.addEventListener('drop', handlerdrop)

}

function handlerDragEnter(e) {
  e.preventDefault();
}

function handlerDragStart() {
  itemDrag = this;
}

function handlerDragEnd() {
  itemDrag = null;
}

function handlerDragOver(e) {
  e.preventDefault()
}

function handlerdrop() {
  itemDrag.setAttribute('draggable', 'false')
  listDrop.append(itemDrag)
}

buttonShowConsole.addEventListener('click', () => {
  const arr = [];

  for (let i = 0; i < listDrop.children.length; i++) {
    arr.push(listDrop.children[i].innerText)
  }

  console.log(arr.length > 0 ? arr : 'Вы никого не добавили');

})