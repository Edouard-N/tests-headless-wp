<template>
  <main class="post individual" v-if="post">
    <v-btn text @click="$router.push('/posts')">Retour</v-btn>
    <h1>{{ post.title.rendered }}</h1>
    <section v-html="post.content.rendered"></section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      slug: this.$route.params.slug,
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    post() {
      return this.posts.find((el) => el.slug === this.slug);
    },
  },
  created() {
    this.$store.dispatch("getPosts");
  },
};
</script>
