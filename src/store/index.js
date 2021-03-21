import { createStore } from 'vuex'
import router from '@/router'
const state = {
  blogs: [
      {title: "test",
        meta_title: "test",
        meta_description: "test",
        img: null,
        content: "fhie zfhiez hfief oizejhfoezj ofjezo fjozejf oezjfoejz foez ofjezfo jezofj ezof",
        date: new Date(),
        author: 'test'
      },
    ],

  users: [{
    email: 'test@gmail.com',
    pseudo: 'test',
    password: 'test'
  }],

  current_user: 'test'
}

const mutations = {
  ADD_BLOG: (state, title, meta_title, meta_description, img, content, author) => {
    if(img === null) img = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg';
    state.blogs.push({
      title: title,
      meta_title: meta_title,
      meta_description: meta_description,
      img: img,
      content: content,
      date: new Date(),
      author: author
    })
  },
  REMOVE_BLOG: (state, blog) => {
    state.blogs = state.blogs.filter(i => i !== blog)
  },
  EDIT_BLOG: (state, blog) => {
    state.blogs[state.blogs.indexOf(blog)] = blog;
  },

  ADD_USER: (state, user) => {
    state.users.push({
      email: user.email,
      pseudo: user.pseudo,
      password: user.password,
    })
  },
  AUTH_USER: (state, user) => {
    state.current_user = user.pseudo;
    router.push({name: 'Blog'})
  },
  DISCONNECT_USER: (state) => {
    state.current_user = null;
    router.push({name: 'Blog'})
  }
}

const getters = {
  blogs: (state) => state.blogs,
  users: (state) => state.users,
  current_user: (state) => state.current_user,
}

const actions = {
  addBlog: (store, blog) => {
    store.commit('ADD_BLOG', blog.title, blog.meta_title, blog.meta_description, blog.img, blog.content, store.current_user);
  },
  deleteBlog: (store, blog) => {
    store.commit('REMOVE_BLOG', blog);
  },
  editBlog: (store, blog) => {
    store.commit('EDIT_BLOG', blog);
  },

  addUser: (store, user) => {
    store.commit('ADD_USER', user);
    store.commit('AUTH_USER', user);
  },

  authUser: (store, user) => {
    store.commit('AUTH_USER', user);
  },

  disconnectUser: (store) => {
    store.commit('DISCONNECT_USER');
  },
}

export default createStore({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  modules: {
  }
})
