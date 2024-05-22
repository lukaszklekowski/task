<template>
  <q-dialog
    :model-value="show"
    @update:model-value="$emit('update:show', false)"
    style=""
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <q-input v-model="article.title" label="Type Title" />

        <q-input v-model="article.content" label="Type Content" />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          flat
          label="Close"
          color="primary"
          v-close-popup
          @click="$emit('update:show', false)"
        />
        <q-btn
          flat
          :label="buttonTitle"
          color="primary"
          v-close-popup
          @click="submit()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, defineComponent, computed, watch } from 'vue';
import { useArticlesStore } from '../stores/layoutStore';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ArticleDialog',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    edit: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const store = useArticlesStore();
    const $q = useQuasar();

    const article = ref(props.data);

    watch(
      () => props.data,
      (s) => {
        article.value = s;
      },
      { deep: true }
    );
    
    const title = computed(() => {
      const prefix = props.edit ? 'Editing' : 'Creating';
      return `${prefix} Article`;
    });
    const buttonTitle = computed(() => {
      return props.edit ? 'Edit' : 'Create';
    });

    return {
      title,
      article,
      buttonTitle,
      async submit() {
        if (props.edit) {
          try {
            await store.editArticle(article.value);
            $q.notify({
              type: 'positive',
              message: 'Article edited successfully',
            });
            await store.loadArticles();
          } catch (error) {
            $q.notify({ type: 'negative', message: 'Failed to edit article' });
          }
        } else {
          try {
            await store.createArticle(article.value);
            $q.notify({
              type: 'positive',
              message: 'Article created successfully',
            });
            await store.loadArticles();
          } catch (error) {
            $q.notify({
              type: 'negative',
              message: 'Failed to create article',
            });
          }
        }
      },
    };
  },
});
</script>
