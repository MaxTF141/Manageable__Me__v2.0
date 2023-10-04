<template>
	<NavBar />
	<router-view />
</template>

<script>
import NavBar from '@/components/NavBarComponent.vue'
export default {
	components: {
		NavBar
	}
}
</script>

<style>
:root {
	--primary-color: #8d42b9;
	--secondary-color: #fff;
	--tertiary-color: #5a5a5a;
	--quaternary-color: #efefef;
	--light-box-shadow: 0px 0px 15px -9px #7d7d7dbf;
	--dark-box-shadow: 0px 0px 38px -6px #000000bf;
}

#app {
	background-color: #efefef;
	min-height: 100vh;
	padding-bottom: 100px;
}

body::-webkit-scrollbar {
	display: none;
}

*,
*::before,
*::after {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}


h2 {
	color: var(--tertiary-color);
}

h4 {
	color: var(--tertiary-color) !important;
	font-size: 1rem !important;
}
</style>
