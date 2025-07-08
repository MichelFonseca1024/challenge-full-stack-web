<template>
	<v-container class="pa-8" fluid>
		<v-navigation-drawer :width="194" class="text-subtitle-2 text-secondary">
			<v-list-item title="Módulo acadêmico"></v-list-item>
			<v-divider></v-divider>
			<v-list-item :to="{ name: 'Students' }" title="Alunos"></v-list-item>
			<v-list-item @click="handleClick"  title="Professores"></v-list-item>
		</v-navigation-drawer>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideMenuComponent',
  setup() {
    const handleClick = () => {
      window.toast.fire({
        icon: 'error',
        title: 'Em desenvolvimento'
      })
    }
    return {
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
$primary: #ff203b;

:deep(.router-link-exact-active .v-list-item-title) {
	color: $primary !important;
}

:deep(.v-list-item--active) {
	color: $primary !important;
}

:deep(.v-list-item--active .v-list-item-title) {
	color: $primary !important;
}
</style>

