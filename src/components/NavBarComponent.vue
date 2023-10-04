<template>
	<nav>
		<div class="container d-flex justify-content-center align-items-center gap-5">
			<div class="links">
				<router-link to="/">
					<Icon icon="mdi:checkbox-marked-outline" width="30" height="30" />
				</router-link>
			</div>
			<div class="links">
				<router-link to="/add">
					<Icon icon="carbon:add-filled"  width="50" height="50" />
				</router-link>
			</div>
			<div class="links">
				<router-link to="/notes">
					<Icon icon="fluent:notepad-edit-20-regular" width="30" height="30" />
				</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
	components: {
		Icon
	}
}
</script>
<style scoped>
	nav{
		background-color: #fff;
		border-radius: 40px;
		margin: 20px 10px;
		box-shadow: var(--light-box-shadow);
	}

	nav {
		padding: 10px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}	

	nav a {
		font-weight: bold;
		color: #767676;
	}

	nav a.router-link-exact-active {
		color: #8d42b9;
	}
</style>
