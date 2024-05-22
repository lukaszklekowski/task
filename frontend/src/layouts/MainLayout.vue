<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Lokey Task </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <ArticleDialog v-model:show="show" v-model:edit="edit" :data="data" />
    <q-page-container>
      <q-btn @click="addArt" label="Add Article"/>

      <q-table
        title="Articles"
        :rows="rows"
        :columns="columns"
        row-key="name"
        no-data-label="I didn't find anything for you"
      >
        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props">
            <q-btn icon="edit" @click="editArticle(props.row)" />
            <q-btn
              icon="delete"
              color="negative"
              @click="deleteArticle(props.row.articleId)"
            />
          </q-td>
        </template>
      </q-table>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import ArticleDialog from 'components/ArticleDialog.vue';
import { useArticlesStore } from '../stores/layoutStore';
import { Article } from 'src/api/article';
import { useQuasar } from 'quasar';

const linksList = [
  {
    title: 'Articles',
    icon: 'school',
    link: '#/main',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    ArticleDialog,
  },

  setup() {
    const $q = useQuasar();
    const store = useArticlesStore();
    store.loadArticles();

    const edit = ref(false);
    const show = ref(false);
    const leftDrawerOpen = ref(false);
    const emptyArticle = {
      title: '',
      content: '',
    };
    const data = ref({ ...emptyArticle });
    const columns = [
      { name: 'title', required: 'true', label: 'Title', field: 'title' },
      {
        name: 'content',
        required: 'true',
        label: 'Content',
        field: 'content',
      },
      { name: 'actions', label: 'Actions' },
    ];
    
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      rows: computed(() => store.articles),
      columns,
      show,
      edit,
      data,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      addArt() {
        show.value = true;
        edit.value = false;
        data.value = { ...emptyArticle };
      },
      editArticle(dataa: Article) {
        data.value = { ...dataa };
        show.value = true;
        edit.value = true;
      },
      async deleteArticle(articleId: number) {
        try {
          await store.deleteArticle(articleId);
          $q.notify({
            type: 'positive',
            message: 'Article deleted successfully',
          });
          await store.loadArticles();
        } catch (error) {
          $q.notify({ type: 'negative', message: 'Failed to delete article' });
        }
      },
    };
  },
});
</script>
