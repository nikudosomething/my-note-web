<script setup>
import NoteList from './components/NoteList.vue';
import { useTodoNote } from './stores/todoNote.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const todoStore = useTodoNote()
const { searchNotes } = todoStore

const router = useRouter()
const keyword = ref('')

// 執行搜尋：把關鍵字交給 store 篩選，再切換到搜尋結果頁
function goSearch() {
  searchNotes(keyword.value)
  router.push({ name: 'search' })
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"><img class="logo" src="../imgs/note_logo.png" alt="">MyNote</router-link>
      </div>
    
      <div class="collapse navbar-collapse p-3" id="navbarSupportedContent">
        <form class="d-flex search-form " role="search" @submit.prevent="goSearch">
          <input class="form-control me-3" type="search" placeholder="Search" aria-label="Search" v-model="keyword"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
  
</nav>
  </header>
  <main class="mb-3">
    <div class="container">
      <div class="row">
        <div class="col-3  pt-5">
          <!-- 選單 -->
          <NoteList/>
        </div>
        <div class="col-9  mt-5 border border-2 rounded-4">
          <!-- 內容 -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.fullPath" />
          </transition>
        </router-view>
        </div>
      </div>
    </div>
  </main>
  <footer>&copy; 2026 NikuuuNote.com</footer>
</template>
<style scoped>
.logo{
  width: 80px;
}
.search-form {
  width: 500px;
  max-width: 100%;
}

</style>
