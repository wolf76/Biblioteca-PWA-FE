<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <div class="separator mb-5">All Books</div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4 main">
        <div class="books-list">
          <div class="books-list-inner">
            <div v-for="item in booksList" :key="item.title">
              <b-card class="mb-4">
                <h6> Book: {{ item.id }} </h6>
                <h3 class="mb-5"> {{ item.title }} </h3>
                <b-form @submit.prevent="editBook(item.id)" v-if="item.is_edit !== undefined && item.is_edit">
                  <b-form-group label="New Book Title" class="has-float-label mb-4">
                    <b-form-input type="text" v-model="newBookTitle" />
                  </b-form-group>
                  <div>
                    <b-button variant="light" type="submit">
                      Submit
                    </b-button>
                  </div>
                </b-form>
                <div class="action-buttons">
                  <b-button variant="primary" @click="toggleEditField(item.id)">
                    Edit
                  </b-button>
                  <b-button variant="outline-danger" @click="deleteBook(item.id)">
                    Delete
                  </b-button>
                </div>
              </b-card>
            </div>
          </div>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
  </div>
</template>

<script>
import {
  mapGetters, mapActions
} from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      newBookTitle: ""
    };
  },
  computed: {
    ...mapGetters(['booksList'])
  },
  methods: {
    ...mapActions(['removeBook', 'fetchBooksList']),
    toggleEditField(bookId) {
      let editVal;
      let booksListArr =  Object.values(this.booksList);
      let bookIndex = booksListArr.indexOf(booksListArr.find(book => book.id == bookId));
      if (this.booksList[bookIndex].is_edit === undefined || this.booksList[bookIndex].is_edit === false)
        editVal = {is_edit: true};
      else
        editVal = {is_edit: false};
      this.$set(this.booksList, bookIndex, {...this.booksList[bookIndex], ...editVal});
    },
    editBook(bookId) {
      axios({
        method: 'put',
        url: '/books/' + bookId,
        headers: {'content-type': 'application/json'},
        data: {
          title: this.newBookTitle
        }
      })
      .then((response) => {
        let booksListArr =  Object.values(this.booksList);
        let bookIndex = booksListArr.indexOf(booksListArr.find(book => book.id == bookId));
        this.$set(this.booksList, bookIndex, response.data);
      }, (error) => {
      });
    },
    deleteBook(bookId) {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete this book.', {
        title: 'Delete Book',
        id: 'delete_alert',
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'primary',
        okTitle: 'YES',
        cancelVariant: 'light',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        if(value){
          this.removeBook({
            bookId: bookId
          });
        }
      })
      .catch(err => {
      })
    }
  },
  created() {
    this.fetchBooksList();
  }
}
</script>

<style lang="scss" scoped>
.action-buttons {
  display: flex;
  justify-content: flex-end;
}
.btn {
  line-height: 1;
}
</style>
