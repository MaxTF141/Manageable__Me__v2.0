<template>
	<section class="header">
		<div class="container">
			<div class="row d-flex align-items-start">
				<div class="col-10">
					<h2 class="heading">Manageable Me</h2>
					<p class="current-date">{{ currentDate() }}</p>
				</div>
				<div class="col-2">
					<img class="profile-img"
						src="https://i.postimg.cc/zvh1fcf4/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
						alt="">
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
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
	background: linear-gradient(90deg, #4a0174 0%, #aa03e2 100%);
	color: #fff;
	padding: 90px 10px;
	padding-top: 30px;
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
