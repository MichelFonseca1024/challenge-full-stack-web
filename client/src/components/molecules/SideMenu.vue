<template>
	<v-container class="pa-8" fluid>
		<v-navigation-drawer :width="194" class="text-subtitle-2 text-secondary">
			<v-list-item title="Módulo acadêmico"></v-list-item>
			<v-divider></v-divider>
			<RouterLink to="/dashboard" class="text-decoration-none text-secondary">
        <v-list-item title="Dashboard" />
      </RouterLink>
			<RouterLink to="/students" class="text-decoration-none text-secondary">
        <v-list-item title="Alunos" />
      </RouterLink>
    </v-navigation-drawer>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideMenuComponent'
})
</script>

<style lang="scss" scoped>
$primary: #ff203b;

:deep(.router-link-active .v-list-item-title) {
	color: $primary !important;
}

</style>

