const block = document.querySelector('.block')
const buttonAuth = document.querySelector('.auth')

let token = window.location.hash
const arr = []

function createCard(first, last, photo) {

  const elem = document.createElement('div');
  elem.classList.add('card', 'w-100', 'mb-1')

  elem.innerHTML = `
          <div class="row g-0">
            <div class="col-md-3">
              <img src=${photo} class="h-100 img-fluid rounded-start" alt=${last}>
            </div>
            <div class="col-md-8"
              <div class="card-body">
                <h5 class="card-title">${first}</br> ${last}</h5>
              </div>
            </div>
          </div>
`;

  block.append(elem);
}


function showResult(result) {

  const { items } = result.response;
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    createCard(items[i].first_name, items[i].last_name, items[i].photo_50)
  }

  if (result) {
    buttonAuth.style.display = 'none'
  }

}

const getUser = async (token) => {
  let script = document.createElement('script');
  script.src = `https://api.vk.com/method/friends.search?${token}&fields=nickname,photo_50&callback=showResult&v=5.131`;
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