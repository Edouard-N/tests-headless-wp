export const state = () => ({
  posts: [],
  tags: []
})

export const getters = {
  getterPosts: state => {
    return state.posts
  }
}

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts
  },
  updateTags: (state, tags) => {
    state.tags = tags
  }
}

export const actions = {
  async getPosts({
    state,
    commit
  }) {
    if (state.posts.length) return
    try {
      let posts = await fetch(`https://www.foyer-charite-courset.fr/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1`).then(res => res.json())
      posts = posts
        .filter(el => el.status === "publish")
        .map(({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content
        }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content
        }))
      commit("updatePosts", posts)
    } catch (err) {
      console.log(err)
    }
  },
  async getTags({
    state,
    commit
  }, posts) {
    console.log(state.posts)
    if (state.tags.length) return
    let allTags = state.posts.reduce((acc, item) => {
      return acc.concat(item.tags);
    }, [])
    allTags = allTags.join()
    console.log(allTags)
    try {
      let tags = await fetch(
        `https://www.foyer-charite-courset.fr/wp-json/wp/v2/tags?page=1&per_page=40&include=${allTags}`
      ).then(res => res.json())
      tags = tags.map(({
        id,
        name
      }) => ({
        id,
        name
      }))
      commit("updateTags", tags)
    } catch (err) {
      console.log(err)
    }
  }
}
