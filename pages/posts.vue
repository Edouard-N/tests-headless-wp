<template>
  <div class="posts">
    <main>
      <h2>Posts</h2>
      <!-- here we loop through the posts -->
      <div class="post" v-for="post in sortedPosts" :key="post.id">
        <h3>
          <!-- for each one of them, we’ll render their title, and link off to their individual page -->
          <a @click="$router.push(`/blog/${post.slug}`)">{{
            post.title.rendered
          }}</a>
        </h3>
        <div v-html="post.excerpt.rendered"></div>
        <a @click="$router.push(`/blog/${post.slug}`)" class="readmore"
          >Read more ⟶</a
        >
      </div>
    </main>
    <aside>
      <h2>Categories</h2>
      <div class="tags-list">
        <ul>
          <li
            @click="updateTag(tag)"
            v-for="tag in tags"
            :key="tag.id"
            :class="[tag.id === selectedTag ? activeClass : '']"
          >
            <a>{{ tag.name }}</a>
            <span v-if="tag.id === selectedTag">✕</span>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTag: null,
      activeClass: "active",
    };
  },
  methods: {
    updateTag(tag) {
      if (!this.selectedTag) {
        this.selectedTag = tag.id;
      } else {
        this.selectedTag = null;
      }
    },
  },
  computed: {
    sortedPosts() {
      if (!this.selectedTag) return this.posts;
      return this.posts.filter((el) => el.tags.includes(this.selectedTag));
    },
    posts() {
      return this.$store.state.posts;
    },
    tags() {
      return this.$store.state.tags;
    },
  },
  created() {
    this.$store.dispatch("getPosts").then(() => {
      this.$store.dispatch("getTags");
    });
  },
};
</script>
