<script setup>
import { useTodoNote } from '../stores/todoNote';
const todo_store = useTodoNote()

</script>

<template lang="">
  <div class="container mt-3">
    <div class="row">
      <div class="col-4 mb-3" v-for="note in todo_store.notes">

        <router-link :to="{ name: 'EditNote', params: { id: note.id } }" class="note-card-link">
          <div class="card" >
            <i v-if="note.isPinned" class="fa-solid fa-thumbtack me-2 pinned"></i>
            <!-- 沒有pin狀態icon -->
            <i v-else class="fa-solid fa-thumbtack me-2"></i>

            <div class="card-body">
              <h5 class="card-title">{{note.item}}</h5>
              <p class="card-text">{{note.content}}</p>
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
