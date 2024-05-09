window.addEventListener(
  "DOMContentLoaded",
  function () {
    fetch("/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((todos) => {
        const data = todos.data;
        const listBelumSelesaiTemplate =
          document.getElementById("listBelumSelesai");
        const listSelesaiTemplate = document.getElementById("listSelesai");
        if (!data || data.length === 0) {
          listBelumSelesaiTemplate.innerHTML = "Tidak ada Todo List";
          listSelesaiTemplate.innerHTML = "Tidak ada Todo List";
        } else {
          const listBelumSelesai = data.filter((todo) => todo.status === false);
          const listSelesai = data.filter((todo) => todo.status === true);
          listBelumSelesaiTemplate.innerHTML = listBelumSelesai
            .map((todo) => {
              return `
                <tr>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td>
                        <i class="fa-solid fa-circle-arrow-right" onclick="updateTodo(${todo.id}, ${todo.status})"></i>
                        <i class="fa-solid fa-trash" onClick="deleteTodo(${todo.id})"></i>
                    </td>
                    </tr>`;
            })
            .join("");
          listSelesaiTemplate.innerHTML = listSelesai
            .map((todo) => {
              return `
                    <tr>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td>
                        <i class="fa-solid fa-circle-arrow-left" onClick="updateTodo(${todo.id}, ${todo.status})"></i>
                        <i class="fa-solid fa-trash" onClick="deleteTodo(${todo.id})"></i>
                    </td>
                </tr>`;
            })
            .join("");
        }
      });
  },
  false
);

const time = 1000;

const updateTodo = (id, status) => {
  fetch(`/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: !status }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        const toastLiveSuccessPatch = document.getElementById(
          "liveToastSuccessPatch"
        );
        const toastSuccessPatch = new bootstrap.Toast(toastLiveSuccessPatch);
        toastSuccessPatch.show();
      } else {
        const toastLiveFailedPatch = document.getElementById(
          "liveToastFailedPatch"
        );
        const toastFailedPatch = new bootstrap.Toast(toastLiveFailedPatch);
        toastFailedPatch.show();
      }
    });
  setTimeout(() => location.reload(), time);
};

const addTodo = () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  if (!title || !description) return alert("Semua data harus diisi");
  fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        const toastLiveSuccessAdd = document.getElementById(
          "liveToastSuccessAdd"
        );
        const toastSuccessAdd = new bootstrap.Toast(toastLiveSuccessAdd);
        toastSuccessAdd.show();
      } else {
        const toastLiveFailedAdd =
          document.getElementById("liveToastFailedAdd");
        const toastFailedAdd = new bootstrap.Toast(toastLiveFailedAdd);
        toastFailedAdd.show();
      }
    });
  document.getElementById("title").innerHTML = "";
  document.getElementById("description").innerHTML = "";
  setTimeout(() => location.reload(), time);
};

const deleteTodo = (id) => {
  fetch(`/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        const toastLiveSuccessDelete = document.getElementById(
          "liveToastSuccessDelete"
        );
        const toastSuccessDelete = new bootstrap.Toast(toastLiveSuccessDelete);
        toastSuccessDelete.show();
      } else {
        const toastLiveFailedDelete = document.getElementById(
          "liveToastSuccessDelete"
        );
        const toastFailedDelete = new bootstrap.Toast(toastLiveFailedDelete);
        toastFailedDelete.show();
      }
    });
  setTimeout(() => location.reload(), time);
};
