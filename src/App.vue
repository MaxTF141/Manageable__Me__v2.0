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
	--tertiary-color: #130d0d;
	--quaternary-color: #efefef;
	--light-box-shadow: 0px 0px 19px -9px rgba(0,0,0,0.75);
	--dark-box-shadow: 0px 0px 38px -6px #000000bf;
}

#app {
	background-image: url('https://i.postimg.cc/dQ8mdqxy/kazuend-2-KXEb-8-G5vo-unsplash.jpg');
	background-attachment: fixed;
	background-repeat: no-repeat;
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

h4 {
	color: var(--secondary-color) !important;
	font-size: 1rem !important;
}


</style>
