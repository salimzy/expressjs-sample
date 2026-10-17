<script setup>
import { ref, onMounted } from "vue";
import api from "./api";

const email = ref("");
const password = ref("");
const name = ref("");
const items = ref([]);
const loggedIn = ref(!!localStorage.getItem("token"));

async function auth(path) {
  const { data } = await api.post(`/auth/${path}`, {
    email: email.value,
    password: password.value,
  });
  localStorage.setItem("token", data.token);
  loggedIn.value = true;
  loadItems();
}

async function loadItems() {
  items.value = (await api.get("/items")).data;
}

async function addItem() {
  const { data } = await api.post("/items", { name: name.value });
  items.value.push(data);
  name.value = "";
}

async function removeItem(id) {
  await api.delete(`/items/${id}`);
  items.value = items.value.filter((i) => i._id !== id);
}

function logout() {
  localStorage.removeItem("token");
  loggedIn.value = false;
  items.value = [];
}

onMounted(() => loggedIn.value && loadItems());
</script>

<template>
  <div v-if="!loggedIn">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="auth('login')">Login</button>
    <button @click="auth('register')">Register</button>
  </div>

  <div v-else>
    <button @click="logout">Logout</button>
    <input v-model="name" placeholder="New item" @keyup.enter="addItem" />
    <button @click="addItem">Add</button>
    <ul>
      <li v-for="i in items" :key="i._id">
        {{ i.name }} <button @click="removeItem(i._id)">x</button>
      </li>
    </ul>
  </div>
</template>