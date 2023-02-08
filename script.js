// Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
// Ід має бути введений в інпут(валідація: ід від 1 до 100) Якщо знайдено пост,
// то вивести на сторінку блок з постом і зробити кнопку для отримання комкоментарів до посту.
// Зробити завдання використовуючи проміси, перехопити помилки.

const API = "https://jsonplaceholder.typicode.com";

const form = document.querySelector("form");
const id = document.querySelector("input");
const box = document.createElement("div");
const boxComments = document.createElement("div");

form.addEventListener("submit", e => {
    e.preventDefault();
    box.innerHTML = "";
    boxComments.innerHTML = "";

    fetch(`${API}/posts/${id.value}`)
        .then(data => {
            if (data.status >= 200 && data.status < 400) {
                return Promise.resolve(data.json());
            }
            return Promise.reject(data);
        })
        .then(data => {
            box.classList.add("box");
            const h1 = document.createElement("h1");
            h1.innerText = `${data.title}`;
            box.append(h1);
            const p = document.createElement("p");
            p.innerText = `${data.body}`;
            box.append(p);
            const div = document.createElement("div");
            div.classList.add("click");
            const get = document.createElement("p");
            get.innerText = "Получить комментарии";
            div.append(get);
            box.append(div);
            box.append(boxComments);
            document.body.append(box);

            div.addEventListener("click", e => {
                e.preventDefault();
                fetch(`${API}/posts/${id.value}/comments`)
                    .then(data => data.json())
                    .then(data => {
                        boxComments.innerHTML = "";
                        data.forEach(comment => {
                            const h2 = document.createElement("h2");
                            h2.innerText = `${comment.name}`;
                            boxComments.append(h2);
                            const p = document.createElement("p");
                            p.innerText = `${comment.body}`;
                            boxComments.append(p);
                            const p1 = document.createElement("p");
                            p1.innerText = `${comment.email}`;
                            boxComments.append(p1);
                        })
                    });
            });
        })
        .catch((data) => {
            console.log(`ошибка ${data.status}`);
            alert(`ошибка ${data.status}. Введите от 1 до 100`)
        });
});