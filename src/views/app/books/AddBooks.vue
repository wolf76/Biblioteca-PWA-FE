<template>
  <div>
    <b-row>
    <b-colxx xxs="12">
      <div class="separator mb-5">Add Books</div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4 main">
        <div class="books-form">
          <div class="books-form-inner">
            <h3 class="mb-5">Please enter the book title</h3>
            <b-form @submit.prevent="submitBook">
              <b-form-group label="Book Title" class="has-float-label mb-4">
                <b-form-input type="text" v-model="bookTitle" />
              </b-form-group>
              <div>
                <b-button variant="primary" type="submit">
                  Submit Book
                </b-button>
              </div>
            </b-form>
          </div>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
  </div>
</template>

<script>
import {
  mapActions
} from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      bookTitle: ""
    };
  },
  methods: {
    ...mapActions(["addNewBooks"]),
    submitBook() {
      this.addNewBooks({
        bookTitle: this.bookTitle,
      });
    }
  },
};
</script>
