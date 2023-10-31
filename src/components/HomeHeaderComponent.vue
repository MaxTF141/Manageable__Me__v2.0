<template>
	<section class="header py-2">
		<div class="container">
			<div class="d-flex justify-content-between align-items-start justify-content-between">
				<div class="">
					<h2 class="heading">Manageable Me</h2>
					<p class="current-date">{{ currentDate() }}</p>
				</div>
				<router-link to="/history">
					<Icon icon="ic:baseline-history" width="28" />
				</router-link>
			</div>
		</div>
	</section>
</template>
<script>
import {Icon} from '@iconify/vue'
export default {
	components: {
		Icon
	},
	methods: {
		currentDate() {
			let today = new Date();
			let day = today.toLocaleString('en-US', { day: 'numeric' });
			let month = today.toLocaleString('en-US', { month: 'short' });
			let year = today.toLocaleString('en-US', { year: 'numeric' });
			return `${day}-${month}-${year}`;
		},
	}
}
</script>
<style>
.header {
	background: linear-gradient(0deg, #343e66bd 20%, #343E66 80%);
	color: #fff;
	padding-bottom: 90px !important;
	/* padding-top: 30px; */
}

.heading {
	/* font-size: 1rem; */
	color: var(--secondary-color);
	font-weight: bold;
	font-size: 2rem;
}

.current-date {
	font-size: 0.8rem;
}

.profile-img {
	width: 2.5rem;
	border-radius: 50%;
}
</style>
