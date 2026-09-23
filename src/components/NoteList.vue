<script setup>
import { ref } from 'vue'
import { useTodoNote } from '../stores/todoNote';
const todo_store = useTodoNote()
const { pinnedNote , deleteNote } = todo_store

// 存放「準備要刪除的筆記」，有值就顯示確認彈窗，null 就不顯示
const noteToDelete = ref(null)
function askDelete(note) {
  noteToDelete.value = note
}
function cancelDelete() {
  noteToDelete.value = null
}
function confirmDelete() {
  deleteNote(noteToDelete.value.id)
  noteToDelete.value = null
}
</script>

<template lang="">
  <router-link to="/addNote" class="btn btn-warning mb-3 "><i class="fa-solid fa-plus"></i> 新增筆記
  </router-link>
  <h3>重要筆記</h3>
  <ul class="list-group mb-4">
    <li v-for="note in todo_store.pinnedNote " :key="note.id" class="list-group-item d-flex justify-content-between align-items-center" :class="{ 'pinned': note.isPinned }" > <router-link :to="{ name: 'EditNote', params: { id: note.id } }" >{{note.item}}</router-link>
      <div class="btn-group ">
        <i class="fa-solid fa-thumbtack me-2" @click="todo_store.togglePinned(note.id)"></i>
        <i class="fa-solid fa-trash-can" @click="askDelete(note)"></i>
      </div>
    </li>
  </ul>
  <h3>所有筆記</h3>
  <ul class="list-group mb-4">
    <li v-for="note in todo_store.allNotes " :key="note.id" class="list-group-item d-flex justify-content-between align-items-center" > <router-link :to="{ name: 'EditNote', params: { id: note.id } }" >{{note.item}}</router-link>
      <div class="btn-group ">
        <i class="fa-solid fa-thumbtack me-2" @click="todo_store.togglePinned(note.id)"></i>
        <i class="fa-solid fa-trash-can" @click="askDelete(note)"></i>
      </div>
    </li>
  </ul>
  <!-- 刪除彈出視窗 -->
  <div class="modal d-block" tabindex="-1" v-if="noteToDelete">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">刪除筆記</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cancelDelete()"></button>
        </div>
        <div class="modal-body">
          <p>是否刪除【{{ noteToDelete.item }}】的筆記內容?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancelDelete()">取消</button>
          <button type="button" class="btn btn-primary" @click="confirmDelete()">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .pinned .fa-thumbtack {
    color: #ffb23d;
    transform: rotate(30deg);
  }
  .fa-thumbtack:hover{
  color: #ff650c;
  }
  .fa-trash-can:hover{
  color: #ff0000;
  }
  .note-link {
  text-decoration: none; /* 移除底線 */
  color: #555; /* 文字顏色 */
}

.note-link:hover {
  color: #ff650c; /* 滑鼠移上去的顏色 */
}
</style>
