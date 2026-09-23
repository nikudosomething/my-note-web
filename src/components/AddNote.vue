<script setup>
import { ref, watch } from 'vue'
import { useTodoNote } from '../stores/todoNote'

const todoStore = useTodoNote()
const newItem = ref('')

function addItem() {
  const text = newItem.value.trim()
  if (!text) return
  if (todoStore.addTodo(text)) newItem.value = ''
}

// 新增筆記標題與內容
const title = ref('')
const content = ref('')
const noteId = ref(null)

function addNote(){
  if(title.value !='' && content.value != '')
  todoStore.addNote(title.value , content.value)
}


</script>

<template>
  <form @submit.prevent>
    <div class="mb-3">
      <input type="text" class="form-control mt-3" placeholder="請輸入標題..." v-model="title">
    </div>

    <div class="mb-3">
      <textarea class="form-control" rows="10" placeholder="請輸入內容..." v-model="content" @keydown.enter="addNote()"></textarea>
    </div>

    <div class="mb-3">
      <hr>
      <h5><i class="fa-solid fa-book"></i>待辦清單</h5>
      <input v-model="newItem" type="text" placeholder="新增項目，按Enter加入..." class="form-control mb-2" @keydown.enter.prevent="addItem">
      <div v-for="todo in todoStore.todos" :key="todo.id" class="d-flex align-items-center gap-2 mb-1">
        <input type="checkbox" class="form-check-input mt-0" :checked="todo.isFinished" @change="todoStore.toggleTodo(todo.id)">
        <span class="flex-grow-1" :class="{ 'text-decoration-line-through': todo.isFinished }">{{ todo.item }}</span>
        <button type="button" class="btn btn-sm" aria-label="刪除待辦項目" @click="todoStore.deleteTodo(todo.id)"><i class="fa-solid fa-x"></i></button>
      </div>
    </div>
  </form>
</template>
