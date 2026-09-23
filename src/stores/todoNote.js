import { defineStore } from 'pinia'

export const useTodoNote = defineStore('todos', {
  state: () => ({ 
    notes: [
  {
    id: 1,
    item: '整理房間',
    isFinished: true,
    content: '15:00前要完成',
    isPinned: true
  },
  {
    id: 2,
    item: '複習日文',
    isFinished: false,
    content: '複習 N5 文法與單字',
    isPinned: false
  },
  {
    id: 3,
    item: '期末專題進度',
    isFinished: false,
    content: '整理問卷與使用者訪談資料',
    isPinned: false
  },
  {
    id: 4,
    item: '偶像最新消息',
    isFinished: false,
    content: '確認 BOYNEXTDOOR 和 LNGSHOT 的活動公告',
    isPinned: false
  },
  {
    id: 5,
    item: '規劃福岡旅遊',
    isFinished: false,
    content: '確認餐廳訂位與交通路線',
    isPinned: false
  },
    ],
    todos:[
      {
    id: 1,
    item: '買演唱會門票',
    isFinished: false,
  },
    ],
    keyword: '',
    searchResults: []
  }),

  getters: { 
    pinnedNote(){
      return this.notes.filter(note => note.isPinned)
    },
    allNotes(){
      return this.notes.filter(note => !note.isPinned)
    },
    
    //取資料
    completedTodos(state){
      return state.todos.filter(todo => todo.isFinished)
    }
  },
  actions: {
    toggleTodo(id){
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) todo.isFinished = !todo.isFinished
    },
    togglePinned(id){
      const pin_note = this.notes.find(note => note.id === id)
      if (pin_note) pin_note.isPinned = !pin_note.isPinned
    },
    //筆記
    addNote(item, content){
      //item沒有值就直接返回不增加資料
      if (!item) return;
      //新增資料
        const newNote = {
          id: Math.max(0, ...this.notes.map(note => note.id)) + 1,
          item:item,
          isFinished: false,
          content: content,
          isPinned: false
        }
        this.notes.push(newNote)
        return newNote
    },
    editNote(id, item, content){
      const note = this.notes.find(note => note.id === id)
      if (note) {
        note.item = item
        note.content = content
      }
    },
    //待辦
    addTodo(item){
      //item沒有值就直接返回不增加資料
      if (!item) return;
      //新增資料
        this.todos.push({
          id: Math.max(0, ...this.todos.map(todo => todo.id)) + 1,
          item:item,
          isFinished: false,
        })
        return true
    },
    deleteNote(id){
      //找到對應id資料的索引值
      const index = this.notes.findIndex(note => note.id === id)
      if (index !== -1) this.notes.splice(index, 1)
    },
    deleteTodo(id){
      const index = this.todos.findIndex(todo => todo.id === id)
      if (index !== -1) this.todos.splice(index, 1)
    },
  oneNote(id){
    const note = this.notes.find(note => note.id === id)
    return note
  },
  searchNotes(keyword){
    this.keyword = keyword
    this.searchResults = this.notes.filter(note => 
      note.item.includes(this.keyword) || note.content.includes(this.keyword)
    )
  }

  },
})
