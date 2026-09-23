<script setup>
import { useTodoNote } from '../stores/todoNote';
const todo_store = useTodoNote()

</script>

<template lang="">
  <div class="search-result mt-3">
    <h4><i class="fa-solid fa-magnifying-glass"></i> 搜尋結果：{{todo_store.keyword}}</h4>
    <p v-if="todo_store.searchResults.length === 0" class="empty">查無相關資料</p>
    <div v-else class="row">
  <div
    v-for="note in todo_store.searchResults"
    :key="note.id"
    class="col-4 mb-3"
  >
    <router-link
      :to="{ name: 'EditNote', params: { id: note.id } }"
      class="note-card-link"
    >
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{{ note.item }}</h5>
          <p class="card-text">{{ note.content }}</p>
        </div>
      </div>
    </router-link>
  </div>
</div>
  </div>

</template>

<style scoped>
  .fa-thumbtack{
    color: rgb(120, 20, 167);
    position: relative;
    top: -4px;
  }
  .pinned{
    color: #ffb23d;
    transform: rotate(30deg);
  }
  .card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgb(0 0 0 / 15%);
}
</style>
